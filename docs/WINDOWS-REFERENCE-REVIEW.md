# Windows adaptation — 3 September 2026

The PC operating system changes preparation tools, not the HX21 images or the verified router-side workflow. Windows pages retain the original source-linked router guidance and conditional MAC precautions; no additional flash-write or Factory-patch command was introduced.

## Primary sources checked

- [Microsoft OpenSSH installation](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse): Windows needs OpenSSH Client for outbound SSH/SCP. An OpenSSH Server on the PC is not required.
- [Microsoft PowerShell installation](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows): PowerShell 7 is separate from legacy Windows PowerShell; Windows Terminal is not a guarantee of which shell is running.
- [Microsoft redirection semantics](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_redirection): native stdout redirection preserves byte streams starting with PowerShell 7.4. Combining stderr and stdout defeats this guarantee. Both helpers require 7.4; the backup helper uses native SSH stdout redirection without `Out-File`, pipelines or `2>&1`.
- [Tftpd64 official repository](https://github.com/PJO2/tftpd64): supplies the Windows TFTP server/client. The guide does not send readers to similarly named third-party download sites. Only TFTP is needed; DHCP/DNS servers remain disabled.
- [Official HX21 device page](https://openwrt.org/toh/imou/hx21), the pinned upstream source already recorded in the kit, and the existing stock-map validator remain authoritative for model-specific data. The Windows read-only backup checks the exact six-entry stock partition map and refuses to guess different indices.

## Implementation boundaries

- Windows preparation uses the wired adapter's two IPv4 addresses, 192.168.1.254/24 and 192.168.10.2/24, with no gateway/DNS on the isolated link. Previous settings must be recorded and restored. It does not run network-changing commands automatically.
- Tftpd64 serves only the public recovery folder on the selected Ethernet address. Keep Windows Firewall enabled and scope any temporary application rule narrowly. A local transfer is not proof of router reachability.
- The backup helper reads the router only. It stops on an unexpected map, read error, byte-count mismatch or disagreement between local and before/after remote hashes. Live UBI/full flash can change; a stop is not permission to relax validation. Unverified `.part` files are not restore-ready backups.
- Destination folders must be new and private. Record original MACs before SSH unlock; a post-unlock backup cannot establish the pre-unlock Factory state. Raw MTD reads omit separate NAND OOB/bad-block data.
- The Windows ZIP reuses only 15 allowlisted shared public artifacts and adds five Windows/blank-reference files. No Mac helper, private backup, credential or local path is included.

## Verification and limitations

Both PowerShell scripts parsed using the official PowerShell 7.6.5 macOS ARM64 runtime. Its release asset SHA-256 was checked before execution. The file verifier passed against the four real firmware images and rejected deliberately corrupted firmware, an empty checksum file, duplicate checksum records and a mismatched TFTP copy. The backup helper correctly refused a non-Windows host. No router was contacted by these tests.

These tests do **not** establish behavior on an actual Windows PC, OpenSSH/TFTP interoperability, firewall reachability, hardware compatibility or a successful flash. The archive and website explicitly retain that limitation. Detached OpenWrt GPG signatures were not authenticated during preparation; users must verify current publisher signatures independently.

Windows ZIP: 20 files, 29,623,269 bytes; SHA-256 `33016c62d8166f796122dbe33bb1b559736af5c84e7ccb387057589cd6acb1df`.
