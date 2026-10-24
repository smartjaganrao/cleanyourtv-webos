# 🛠️ How to Enable Developer Mode on LG Smart TV (webOS)

All LG Smart TVs running webOS (webOS 3.5, 4.x, 5.x, 6.x, 7.x/webOS 22, 8.x/webOS 23, and webOS 24+) include an official Developer Mode that allows sideloading apps over local Wi-Fi without rooting or voiding warranty.

---

## Step 1: Create a Free LG Developer Account
1. Visit the [LG Developer Portal](https://webostv.developer.lge.com).
2. Sign up for a free developer account (any standard email address works).
3. Verify your email address.

---

## Step 2: Install Developer Mode App on your LG TV
1. On your LG TV, press the **Home** button on the Magic Remote.
2. Open the **Apps** (LG Content Store).
3. Search for **Developer Mode** and select the official app by LG Electronics.
4. Install and open the **Developer Mode** app.

---

## Step 3: Turn Developer Mode ON
Inside the Developer Mode app on your TV screen:
1. Log in using your LG Developer Account email and password.
2. Toggle **Dev Mode Status** to **`ON`**.
3. Toggle **Key Server** to **`ON`**.
4. Note the **IP Address** and **Passphrase** displayed on the screen.

---

## Step 4: Verify the Connection from your Computer
Run the probe utility from your computer:
```bash
python3 tools/lg_tv.py probe <TV_IP>
```

You should see:
```
[✓] Active LG TV Ports Found: [3000, 3001, 9922, 9998]
    • Port 9922: Developer Mode SSH (Active & Ready for Sideloading)
```

Your LG TV is now ready for CleanHub TV installation!

---

## Step 5: Sideload CleanHub TV in 1 Command
```bash
python3 tools/webos_install.py <TV_IP>
```
CleanHub TV will compile into an `.ipk`, upload over Wi-Fi, install on your TV, and launch automatically!
