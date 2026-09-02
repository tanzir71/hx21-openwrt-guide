# HX21 OpenWrt — Windows preparation kit

Prepared 3 September 2026. Independent research, not official firmware advice or a tested hardware guarantee. Check https://openwrt.org/toh/imou/hx21 before every flash. This kit contains no one-click flash or Factory-repair script.

## What is different on Windows?

The router images and router-side procedure are the SAME as on macOS. Windows needs OpenSSH Client, Microsoft PowerShell 7.4 or newer (`pwsh`), and a TFTP server such as the official https://github.com/PJO2/tftpd64. Download those tools from their official sources; installers are not bundled here. You do not need an SSH server on the PC. The Windows TFTP Client optional feature is not a server.

1. Photograph the router label and privately record hardware, stock version, all original MAC addresses and ISP settings. Review the community SSH-configuration warning before using the optional file. A post-unlock backup cannot prove Factory was untouched.
2. Extract this ZIP in a local folder. Open PowerShell 7 (not legacy Windows PowerShell 5.1). Check `$PSVersionTable.PSVersion`. If downloaded scripts are blocked, read them first; unblock only the files you reviewed with `Unblock-File`. Do not change a managed execution policy or disable system protections to run this kit.
3. Run `pwsh -File .\scripts\Verify-Files.ps1`. Firmware SHA-256 values matched the archived official records, but detached GPG signatures have NOT been authenticated. Follow https://openwrt.org/docs/guide-user/security/release_signatures to verify current publisher signatures independently.
4. Connect PC Ethernet to an HX21 LAN port, disconnect router WAN and turn off Wi-Fi/VPN/Internet Connection Sharing. Record current IP, DNS and DHCP settings. Open `ncpa.cpl` → correct Ethernet adapter → Properties → Internet Protocol Version 4 → Properties → Advanced. Set 192.168.1.254 with mask 255.255.255.0 and add 192.168.10.2 with the same mask. Leave gateway/DNS blank for this isolated link. Do NOT assign 192.168.1.1 or 192.168.10.1 to the PC.
5. Confirm access to stock 192.168.10.1. Start `ssh root@192.168.10.1` and verify the SSH host key through a trusted check. Never suppress host-key verification. Exit the shell before running local helpers. If keys change after flashing, identify the new device/environment before removing only that host's stale entry.
6. From the kit folder run `pwsh -File .\scripts\Backup-Stock.ps1 -Destination 'D:\HX21-private-backup-NEW'`, replacing the example with a NEW private folder. It verifies the six-entry stock map, reads binary data directly to the PC, and checks size and before/after remote SHA-256. It never writes to the router. Do not use older PowerShell redirection, `Out-File`, or `2>&1` for binary backups. Any read, map or hash error is a STOP; live UBI can change between reads. Keep partial files for diagnosis, not restoration.
7. Keep a second verified PRIVATE backup. Check whether OneDrive synchronizes the folder. Raw MTD reads do not include separate NAND OOB/bad-block metadata and are not a universal restore image.
8. Start Tftpd64 with only its TFTP server enabled (DHCP/DNS services OFF). Set Current Directory to this kit's `tftp` folder and Server interfaces to 192.168.1.254. The recovery name is exactly `openwrt-mediatek-filogic-imou_hx21-initramfs-recovery.itb`. Keep Windows Firewall on; if necessary add a temporary rule restricted to the Tftpd64 executable, wired adapter and the router's recovery address. Test a binary TFTP GET locally using the application's client tab and compare the downloaded file hash. This tests the server, not router reachability; verify the physical link and monitor the TFTP log.
9. Only after identity, backups, firmware/signature checks and recovery readiness: follow CURRENT official device commands for uploads, FIP/BL2, UBI and sysupgrade. Use `scp -O` only when the router lacks SFTP. A BL2 I/O/partial-write failure is not the documented clean write-protection refusal. Never add `sysupgrade -F`. The kit does not execute these destructive steps for you.
10. Check the installed board/version, root password, LAN/DNS/WAN and both radios, original MACs and normal boot without TFTP. Close Tftpd64, remove any temporary firewall rule, restore previous Ethernet/DNS settings and turn Wi-Fi/VPN back on as needed. Store OpenWrt configuration backups separately from stock flash backups.

## Limits

These helpers are reviewed preparation tools, not physical-device validation. They have not been executed on a Windows PC or an HX21. Firmware is a dated 25.12.5 snapshot, not a claim about the latest recommended release. The optional community SSH configuration carries a reported MAC/Factory-data risk. Do not share unique device backups or substitute another router's Factory data.

## Primary references

- https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse
- https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows
- https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_redirection
- https://github.com/PJO2/tftpd64
- https://openwrt.org/toh/imou/hx21

Guide curated by Tanzir Rahman — https://tanziro.com/
