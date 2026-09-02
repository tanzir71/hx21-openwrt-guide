# Beginner walkthrough review — 3 September 2026

The original checklist assumed familiarity with network aliases, SSH, command windows and helper scripts. Each of the eight steps now includes expandable practical instructions in English and Bengali, selected by the existing macOS/Windows route. Network and SSH help starts expanded.

## Evidence and decisions

- [Apple: manually enter network settings](https://support.apple.com/guide/mac-help/mchlp2718/mac): verified the System Settings → Network → wired connection → Details → TCP/IP path. Record previous settings and restore them afterward. The pinned kit uses computer IP 192.168.1.254; the additional stock-access address is 192.168.10.2, mask 255.255.255.0.
- Local macOS `ifconfig(8)` and `networksetup(8)` manuals: checked alias addition/removal and hardware-port/device mapping. Never assume `en0` or the example `en7` is the user's Ethernet adapter. The existing kit's validated alias helper is the primary path; manual commands are explicitly substitution-required examples, not copy buttons.
- [OpenSSH manual](https://man.openbsd.org/ssh): computer-side remote login, host fingerprint/known-host checks, password prompts and returning from the router session with `exit`. First-use trust is not independent identity verification. No global host-key bypass or broad deletion is suggested.
- [Microsoft: OpenSSH first use](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse): install the client only when missing. Windows-specific network setup uses the classic IPv4 Properties/Advanced address list. No physical Windows UI verification was performed.
- [Community configuration author](https://github.com/byjahidul/Imou-HX21): the reported empty SSH password and web password `12345678` apply **after that specific configuration restore**, not to untouched stock firmware. Existing Factory/MAC risk warnings remain. Neither repeated connection failures nor a timeout justifies uploading the configuration automatically.
- Public macOS kit helpers were read from the already-published archive: exact Desktop location required by SSH config; numbered launcher names; ADD/BACKUP/START/STOP confirmations; six-partition readback checks; TFTP startup success text; private host-key and backup locations; cleanup behavior. No helper was executed against the computer's network or a router.
- Windows helper sources and the existing [Windows reference review](WINDOWS-REFERENCE-REVIEW.md): PowerShell 7.4+ requirement, private new destination, exact backup confirmation, byte-preserving transfer, before/after hashes and final validation. Second-copy hash inspection uses read-only PowerShell commands.
- [OpenWrt signature verification](https://openwrt.org/docs/guide-user/security/signatures): preserve the distinction between matching a SHA-256 and authenticating a trusted publisher signature. The kit's detached signatures remain unverified; do not claim otherwise.
- [Official HX21 instructions](https://openwrt.org/toh/imou/hx21): retained as the authoritative gate for model-specific writes. The wiki returned an anti-bot page during this review, so its current full contents were not revalidated. No new bootloader/Factory write commands or guessed UART pinout were added. Users are explicitly told to stop if the official procedure is unavailable or not understood.

## Scope and limits

The new panels explain preparation, SSH outcomes, private backups, integrity checks, TFTP, command locations, recovery identification and cleanup. They are not an automatic installer or a fully verified replacement for the model-specific flash procedure. The firmware archives and their hashes are unchanged.

Validation is source, TypeScript/build and HTTP/static-output checking. It does not prove physical router compatibility, successful flashing, Windows GUI behavior, actual firewall reachability or an authenticated firmware signature. No router was contacted, no passwords were tried, no firmware was written and no computer networking was changed.
