#Requires -Version 7.4
[CmdletBinding()]
param(
    [ValidateSet('192.168.10.1')][string]$Router = '192.168.10.1',
    [Parameter(Mandatory)][string]$Destination
)
$ErrorActionPreference = 'Stop'
# Native command failures are checked immediately, separately from stderr.
$PSNativeCommandUseErrorActionPreference = $false
if (-not $IsWindows) { throw 'This helper is intended for Windows PowerShell 7.4+ (pwsh), not macOS.' }
$null = Get-Command ssh.exe -ErrorAction Stop
$sshArgs = @('-T', '-o', 'ConnectTimeout=10', '-o', 'ServerAliveInterval=10', '-o', 'ServerAliveCountMax=3', "root@$Router")
if (Test-Path -LiteralPath $Destination) { throw 'Choose a NEW private destination folder. Existing files are never overwritten.' }

Write-Host 'READ-ONLY ROUTER BACKUP. Confirm hardware, SSH host key, and whether SSH unlock already changed Factory data.'
$map = (& ssh.exe @sshArgs 'cat /proc/mtd') -join "`n"
if ($LASTEXITCODE -ne 0) { throw 'Could not read /proc/mtd.' }
Write-Host $map
$expected = @(
    @{ Device = 'mtd0'; Size = '08000000'; Label = 'spi0.0' },
    @{ Device = 'mtd1'; Size = '00100000'; Label = 'BL2' },
    @{ Device = 'mtd2'; Size = '00080000'; Label = 'u-boot-env' },
    @{ Device = 'mtd3'; Size = '00200000'; Label = 'Factory' },
    @{ Device = 'mtd4'; Size = '00200000'; Label = 'FIP' },
    @{ Device = 'mtd5'; Size = '07280000'; Label = 'ubi' }
)
$lines = @($map -split "`n" | Where-Object { $_.Trim() })
if ($lines.Count -ne 7 -or $lines[0] -notmatch '^dev:') { throw 'Unexpected stock partition map.' }
for ($i = 0; $i -lt $expected.Count; $i++) {
    $part = $expected[$i]
    $pattern = '^' + $part.Device + ':\s+' + $part.Size + '\s+[0-9a-fA-F]+\s+"' + [regex]::Escape($part.Label) + '"\s*$'
    if ($lines[$i + 1] -notmatch $pattern) { throw "Unexpected map at $($part.Device); do not adapt indices by guesswork." }
}
if ((Read-Host 'Type HX21 STOCK BACKUP after checking this is your supported router on STOCK firmware') -cne 'HX21 STOCK BACKUP') { throw 'Cancelled.' }
$null = New-Item -ItemType Directory -Path $Destination
$map | Set-Content -LiteralPath (Join-Path $Destination 'stock-proc-mtd.txt') -Encoding utf8

function Read-RemoteHash([string]$Device) {
    $result = (& ssh.exe @sshArgs "sha256sum /dev/$Device") -join "`n"
    if ($LASTEXITCODE -ne 0 -or $result -notmatch ('^([a-fA-F0-9]{64})\s+/dev/' + $Device + '\s*$')) {
        throw "Cannot verify router SHA-256 for $Device. Stop; do not bypass the check."
    }
    return $Matches[1].ToLowerInvariant()
}
foreach ($part in $expected) {
    $device = $part.Device
    $name = "$device-$($part.Label).bin"
    $partial = Join-Path $Destination ($name + '.part')
    $final = Join-Path $Destination $name
    $before = Read-RemoteHash $device
    # PowerShell >=7.4 preserves native stdout bytes. Never add 2>&1 here.
    & ssh.exe @sshArgs "dd if=/dev/$device bs=65536" > $partial
    if ($LASTEXITCODE -ne 0) { throw "Read failed for $device; unverified .part retained." }
    if ((Get-Item -LiteralPath $partial).Length -ne [Convert]::ToInt64($part.Size, 16)) {
        throw "Size mismatch for $device; unverified .part retained."
    }
    $localHash = (Get-FileHash -LiteralPath $partial -Algorithm SHA256).Hash.ToLowerInvariant()
    $after = Read-RemoteHash $device
    if ($before -ne $localHash -or $after -ne $localHash) {
        throw "Hash/readback mismatch for $device. Live flash may have changed. Stop and investigate; .part retained."
    }
    Move-Item -LiteralPath $partial -Destination $final
    "$localHash  $name" | Add-Content -LiteralPath (Join-Path $Destination 'SHA256SUMS.txt') -Encoding ascii
    Write-Host "Verified $name"
}
Write-Host 'Full set verified. Make a second PRIVATE copy. Raw MTD dumps do not include separate NAND OOB/bad-block metadata.'
