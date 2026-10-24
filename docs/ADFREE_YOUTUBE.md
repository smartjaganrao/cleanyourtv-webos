# 📺 Ad-Free YouTube with SponsorBlock for LG webOS Smart TVs

Unlike standard banner ads or tracking telemetry, YouTube in-stream video ads cannot be blocked using DNS tools like Pi-hole alone, because video advertisements are served from the same dynamic CDN endpoints (`*.googlevideo.com`) as actual video content.

CleanHub TV integrates **Ad-Free YouTube with SponsorBlock (`youtube-webos`)** and the **webOS Homebrew Channel**, bringing a complete SmartTube experience to LG webOS without needing an Android TV box or Fire Stick.

---

## ✨ Features

- **🚫 Zero Video Ads:**  
  Blocks all video pre-roll ads, mid-roll commercial breaks, and post-roll advertisements.
- **⏩ SponsorBlock Integration:**  
  Automatically detects and skips sponsored segments, subscriber reminders, channel intros, and non-music sections inside videos.
- **🎬 4K HDR 60fps Playback:**  
  Hardware-accelerated playback supporting VP9 Profile 2 and AV1 codecs across LG OLED, QNED, and UHD TV chipsets.
- **🎵 Background Playback / OLED Screen-Off:**  
  Listen to music, podcasts, or video essays while turning off the TV screen.
- **🔑 Google Account Login:**  
  Sign into your standard Google/YouTube account to preserve your subscriptions, history, and playlists.

---

## 🚀 1-Click Wi-Fi Sideload Installation

You can install Ad-Free YouTube directly to your LG TV over local Wi-Fi:

### Prerequisites:
1. Ensure your LG TV is in **Developer Mode** (via the official LG Developer Mode app).
2. Dev Mode Status = ON and Key Server = ON.

### Installation Command:
From your computer terminal inside the repository:
```bash
python3 tools/install_youtube_adfree.py <TV_IP>
```
*Example:* `python3 tools/install_youtube_adfree.py 192.168.0.15`

### What the installer does:
1. Verifies that your TV is reachable on Developer Mode SSH Port 9922.
2. Fetches the latest verified `youtube.leanback.v4` and `org.webosbrew.hbchannel` `.ipk` packages.
3. Automatically sideloads and registers the applications on your TV via the Luna bus.
4. Seamlessly pins the **"Ad-Free YouTube"** card to your CleanHub TV home dock!

---

## 🌐 Instant Web Ad-Free Player (No Install Needed)

If you prefer not to sideload an extra application, CleanHub TV also includes a **Web Ad-Free Player** option:
1. Click the **YouTube** tile on your CleanHub TV home screen.
2. Select **`🌐 Launch Web Ad-Free Player (Piped)`**.
3. It opens an ad-free, privacy-respecting YouTube client directly in the webOS browser.
