# MAC-fix reference review — 2 September 2026

The user supplied https://share.gemini.google/W4dWzg6CN5D9 (resolved shared conversation https://gemini.google.com/share/ca8f4ba319c1), titled “Fixing HX21 MAC Address in OpenWrt.” It was read in the browser. It is AI-generated advice, not an authoritative source.

Added a corrected, conditional MAC troubleshooting subsection in both languages at `/en#mac-fix` and `/bn#mac-fix`, linked from the last walkthrough step. The original backup-only ZIP was not changed; its warning remains valid, and it still contains no automatic MAC repair script.

Verified against primary sources:

- [OpenWrt 25.12.5 HX21 device tree](https://github.com/openwrt/openwrt/blob/v25.12.5/target/linux/mediatek/dts/mt7981b-imou-hx21.dts): base MAC cell `macaddr_factory_4` is six bytes at `0x4`, not the shared answer's `0x1fef20`. `factory` is lowercase and read-only. GMACs use relative base offsets -1 and +1, so generic “WAN = LAN + 1” or label-MAC arithmetic is not a safe rule for every observed interface.
- [Network configuration](https://openwrt.org/docs/guide-user/network/network_configuration): `macaddr` is supported on a `config device` section; actual section IDs and device names must be inspected. `network.br_lan` is not guaranteed to exist.
- [Wireless configuration](https://openwrt.org/docs/guide-user/network/wifi/basic): `wifi-iface` MAC override is distinct from `wifi-device` radio identification. Use valid unicast addresses and account for driver support.

The guide distinguishes configuration persistence across reboots from restoration of hardware identity/calibration, warns about loss after reset/clean upgrades, keeps original per-interface MACs private, and avoids reproducing an unverified raw Factory-write command as a recipe. It does not claim the workaround or restoration was tested on the user's physical router.
