# ⚡ Auto-Boot Bypass: Launch CleanHub TV Directly on Startup

By default, recent versions of LG webOS (webOS 6.0 through webOS 24+) open a bloated, full-screen home dashboard packed with trending banners, sponsored trailers, and recommendations every time the TV powers on.

Follow these simple steps to make your TV boot **instantly** into CleanHub TV or your last used input with zero ads.

---

## 🚀 Native webOS Settings (Zero Root Required)

1. On your LG Magic Remote, press the **Gear (⚙️ Settings)** button.
2. Navigate to:  
   `All Settings → General → System → Additional Settings → Home Settings`  
   *(On webOS 6.x / 2021: Settings → General → Additional Settings → Home Settings)*
3. Make the following changes:
   - **Home Auto Launch**: Set to **`OFF`**  
     *(Prevents the full-screen LG home screen from appearing on power-on)*
   - **Home Promotion**: Set to **`OFF`**  
     *(Disables sponsored trend notifications)*
4. Under `Power On Screen` (if available on your webOS version):
   - Set to **`Recent Input`** or **`Last Used App`**.

Now, whenever you turn off your TV while CleanHub TV is active, the TV will power straight back into CleanHub TV on next boot!

---

## 🛠️ Advanced: Permanent Autostart via Homebrew Channel

If you have rooted your TV with Homebrew Channel (`org.webosbrew.hbchannel`), you can configure an unconditional autostart hook so CleanHub TV launches even if the TV was unplugged or rebooted:

```bash
# SSH into your TV
ssh -p 9922 prisoner@<TV_IP>

# Append autostart command to startup hook
cat << 'EOF' >> /var/lib/webosbrew/startup.sh
luna-send-pub -n 1 luna://com.webos.service.applicationmanager/launch '{"id":"com.cleanyourtv.home"}'
EOF

chmod +x /var/lib/webosbrew/startup.sh
```
