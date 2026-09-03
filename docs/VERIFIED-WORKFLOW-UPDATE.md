# Verified workflow and LLM prompt update

Reviewed 3 September 2026. This update generalizes practical findings for users of either operating system. It does not publish the underlying private device records or assume a particular upstream router brand, subnet, ISP, country or wireless credentials.

## What changed

- An **LLM Prompt** view is available at `/en/prompt`, `/bn/prompt`, `/en/windows/prompt` and `/bn/windows/prompt`. OS and language switches retain the view. The full prompt is server-rendered, selectable without JavaScript and copyable with the existing clipboard control. It is written in English with an explicit English/Bengali response preference, and contains both OS branches so the assistant verifies the actual environment.
- Prerequisite discovery distinguishes the running shell, user-facing installation and an assistant's bundled runtime. Windows requires OpenSSH **Client** and PowerShell **7.4+** for native binary redirection. macOS uses its verified local tools and adapter/service names.
- Connection preparation supports an offline workflow or independent internet alongside direct Ethernet. It no longer blindly disconnects the Wi-Fi connection carrying online help. The isolated management link does not need a default gateway or DNS.
- Backups distinguish the original web export from post-unlock raw images, require map-derived sizes and before/local/after hashes, and verify independent private storage.
- The walkthrough covers separate file approval, TFTP-path testing, irreversible-action boundaries, permanent-boot verification, primary-router versus wired-AP configuration, regulatory/channel checks, client tests and computer/TFTP cleanup.
- The prompt includes a private journal and an offline resume record, with completed-write tracking to prevent accidental replay after a disconnect.

The page does not call an LLM API, collect credentials or execute router commands. A suitably equipped assistant can carry out authorized work; the user still handles physical wiring, OS consent and explicit destructive checkpoints. A prompt cannot guarantee compatibility or recovery.

## Evidence and limits

One physical Windows workflow on an HX21 starting from stock V1.0.7 completed SSH enablement without UART, raw-backup verification, a reviewed FIP write, TFTP recovery and permanent OpenWrt 25.12.5 installation. Image-length readbacks and protected-partition checks supported those stages. The original BL2 was retained. A wired AP configuration, router-originated internet tests and one 5 GHz client browsing/authorization test subsequently passed.

This is not a claim that every hardware revision, every downloadable helper, macOS hardware execution, a separate 2.4 GHz client, throughput or roaming has been tested. There was no pre-unlock raw Factory image, so preservation of every byte through the community restore cannot be established. Website success reported by a user and observations from the router remain different evidence types. An owner-confirmed upstream reservation is not independent inspection of its settings or proof of persistence across renewal.

The two dated offline firmware/helper ZIPs are unchanged. Their original build saved detached signatures without authenticating them; a later verification authenticated the same 25.12.5 manifest using the official release key. Users must authenticate their own selected files and key provenance. Community unlock files are outside that signature. The online continuity workflow and later verified findings supersede older preparation notes where they differ; the archives remain historical offline references.

## Failures translated into reusable guidance

| Failure or limitation | Guide correction |
|---|---|
| A bundled shell existed but the normal terminal was not ready | Verify actual runtime, version and executable paths after installation. |
| A local SSH config failed parsing before authentication | Use an explicit task-local config without weakening host-key checks. |
| Key access appeared successful while root was still passwordless | Verify key-only login after setting a nonempty root password. |
| Telnet/API acknowledgements did not establish root access | Do not present them as a verified SSH unlock route. |
| Stock and recovery partition names/numbers differed | Rediscover the live map at each firmware stage. |
| A flash/upgrade connection closed ambiguously | Inspect boot, storage and output before considering another write. |
| LuCI returned an unauthenticated HTTP 403 | Verify the login form/header rather than assuming success or failure from the code alone. |
| Proposed static management IP availability was unknown | Use a discovered DHCP lease and reservation, or prove a static address is free. |
| A default wireless channel was rejected for the selected country | Inspect installed regulatory rules and hostapd; select a permitted channel. |
| A rollback utility was absent | Test available tools and session-independent execution before applying network changes. |
| Windows returned adapter GUIDs as brace-wrapped strings | Normalize GUID types before matching adapter identity. |
| A temporary default-route cost survived automatic interface metrics | Inspect both metrics and verify the source of ordinary internet traffic. |

## Sources

- [OpenWrt HX21 device procedure](https://openwrt.org/toh/imou/hx21): current device sequence, recovery address and optional BL2 handling. Direct wiki fetches were blocked by the site's protection during this update; the indexed primary-source content was available. The prompt requires inspecting an authoritative procedure before actual writes.
- [OpenWrt HX21 release source](https://github.com/openwrt/openwrt/tree/v25.12.5/target/linux/mediatek): release-specific support; [official image directory](https://downloads.openwrt.org/releases/25.12.5/targets/mediatek/filogic/).
- [OpenWrt release-signature guidance](https://openwrt.org/docs/guide-user/security/release_signatures): manifest/key authentication. Historical archive provenance is retained separately from the later verification.
- [OpenWrt bridged AP](https://openwrt.org/docs/guide-user/network/wifi/wifiextenders/bridgedap): wired AP clients use the existing network's DHCP/router; settings must be discovered per network.
- [Microsoft binary redirection](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_redirection), [OpenSSH installation](https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse) and [route metrics](https://learn.microsoft.com/en-us/powershell/module/nettcpip/set-netroute).
- [Apple manual/DHCP addressing](https://support.apple.com/guide/mac-help/use-dhcp-or-a-manual-ip-address-on-mac-mchlp2718/mac).
- [HX21 community SSH configuration](https://github.com/byjahidul/Imou-HX21): provenance and side effects must be reviewed separately from official firmware authentication.

## Site validation

The source and static-export checks now cover twelve OS/language/view routes, full prompt rendering, view-preserving navigation, metadata/sitemap and the unchanged archive bytes. Text checkout uses LF to preserve archive/source comparisons on Windows; Git for Windows supplies the existing unzip/bash checks. The isolated Windows export stays on the checkout's drive because cross-drive webpack entry resolution failed in testing. `PAGES_BUILD_TMPDIR` can choose another staging directory on that drive.

These application tests exercise the documentation site and local artifact verification. They do not execute the prompt against a router or flash firmware.
