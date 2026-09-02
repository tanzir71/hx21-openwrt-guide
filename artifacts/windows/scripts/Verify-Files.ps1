#Requires -Version 7.4
[CmdletBinding()]
param()
$ErrorActionPreference = 'Stop'
$kitRoot = Split-Path -Parent $PSScriptRoot
$records = Get-Content -LiteralPath (Join-Path $kitRoot 'firmware/SHA256SUMS-HX21.txt')
$required = @(
    'openwrt-25.12.5-mediatek-filogic-imou_hx21-bl31-uboot.fip',
    'openwrt-25.12.5-mediatek-filogic-imou_hx21-initramfs-recovery.itb',
    'openwrt-25.12.5-mediatek-filogic-imou_hx21-preloader.bin',
    'openwrt-25.12.5-mediatek-filogic-imou_hx21-squashfs-sysupgrade.itb'
)
$seen = @()
foreach ($line in $records) {
    if ([string]::IsNullOrWhiteSpace($line)) { continue }
    if ($line -notmatch '^([a-fA-F0-9]{64})\s+\*?([a-zA-Z0-9_.-]+)$') {
        throw 'Unexpected checksum-file format; stop and review the kit.'
    }
    $expected = $Matches[1].ToLowerInvariant()
    $name = $Matches[2]
    if ($name -cnotin $required -or $name -cin $seen) {
        throw "Unexpected or duplicate firmware record: $name"
    }
    $seen += $name
    $file = Join-Path $kitRoot ('firmware/' + $name)
    if ((Get-FileHash -LiteralPath $file -Algorithm SHA256).Hash.ToLowerInvariant() -ne $expected) {
        throw "SHA-256 mismatch: $name"
    }
    Write-Host "OK $name"
}
if ($seen.Count -ne $required.Count) { throw 'Expected exactly four HX21 firmware records.' }
$recovery = Join-Path $kitRoot 'tftp/openwrt-mediatek-filogic-imou_hx21-initramfs-recovery.itb'
$source = Join-Path $kitRoot 'firmware/openwrt-25.12.5-mediatek-filogic-imou_hx21-initramfs-recovery.itb'
if ((Get-FileHash -LiteralPath $recovery).Hash -ne (Get-FileHash -LiteralPath $source).Hash) {
    throw 'The renamed TFTP recovery copy does not match the verified firmware.'
}
Write-Host 'Checksums passed. This does NOT verify publisher signatures or hardware compatibility.'
