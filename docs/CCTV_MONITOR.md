# 📹 4-Channel CCTV Surveillance Monitor Guide

CleanHub TV includes a hardware-accelerated **4-Camera CCTV Security Monitor** built directly into the launcher interface.

---

## ⚡ Key Capabilities

- **2x2 Quad Grid Matrix**: Monitor 4 camera streams simultaneously (e.g. Front Gate, Living Room, Driveway, Backyard).
- **1-Click 1080p Fullscreen Zoom**: Click or press **OK / Enter** on any camera to instantly expand it to edge-to-edge full screen.
- **Auto-Tour Patrol**: Press the **Green** button on the remote to automatically cycle through cameras every 10 seconds.
- **Direct Number Switching**: Press **`1`**, **`2`**, **`3`**, or **`4`** to jump directly to any camera in full screen. Press **`0`** or **`Back`** to return to the 2x2 grid.
- **Support for Multi-Protocol Feeds**:
  - HLS (`.m3u8`) surveillance streams from NVR / NAS (Frigate, Synology, go2rtc, Home Assistant).
  - Direct MP4 / WebM video streams.
  - HTTP MJPEG streams (`http://<cam-ip>/mjpeg`).
  - HTTP Snapshot Auto-Polling (1fps refresh).

---

## 🛠️ Remote Control Shortcuts

| Remote Button | Action |
| :--- | :--- |
| **`OK` / `Enter`** | Zoom into selected camera (Fullscreen) / Return to Quad View |
| **`Back` / `0`** | Return to 2x2 Quad Grid |
| **`1` – `4`** | Jump directly to Camera 1, 2, 3, or 4 |
| **`Red` Button** | Toggle Fullscreen / Quad View |
| **`Green` Button** | Start / Stop 10-second Auto-Tour Patrol |
| **`Yellow` Button** | Reconnect & reload all camera feeds |
| **`Blue` Button** | Open In-App Camera Stream Configuration |

---

## 📡 Configuring Your Own Cameras

Press the **Blue** button on the remote (or click **Camera Settings** in the CCTV header) to customize camera names and URLs:

### 1. TP-Link Tapo C200 / C310 / C500:
- Format: `rtsp://<username>:<password>@<cam_ip>:554/stream1` (or `stream2` for sub-stream).
- With go2rtc / Frigate / Home Assistant: `http://<nvr_ip>:5000/api/<cam_name>/live/index.m3u8`.

### 2. Hikvision & Ezviz:
- Main Stream: `rtsp://admin:<password>@<cam_ip>:554/Streaming/Channels/101`
- Sub Stream: `rtsp://admin:<password>@<cam_ip>:554/Streaming/Channels/102`
- HTTP Snapshot: `http://admin:<password>@<cam_ip>/ISAPI/Streaming/channels/101/picture`

### 3. CP Plus & Dahua:
- Main Stream: `rtsp://admin:<password>@<cam_ip>:554/cam/realmonitor?channel=1&subtype=0`
- Sub Stream: `rtsp://admin:<password>@<cam_ip>:554/cam/realmonitor?channel=1&subtype=1`
- HTTP Snapshot: `http://admin:<password>@<cam_ip>/cgi-bin/snapshot.cgi`

> [!TIP]
> All custom camera URLs and names are saved directly to your TV's local storage (`localStorage`) and persist across TV reboots!
