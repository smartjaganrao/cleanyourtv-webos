# CleanHub TV Architecture: Android TV vs Samsung Tizen vs LG webOS

This document explains the technical architectural differences between Android TV, Samsung Tizen OS, and **LG webOS**.

---

## 🏗️ Architectural Comparison Table

| Dimension | Android TV / Google TV | Samsung Tizen OS | LG webOS (webOS 4.x - 24+) |
| :--- | :--- | :--- | :--- |
| **Underlying OS** | Android (Linux kernel + ART) | Tizen OS (Linux kernel + Chromium/EFL) | webOS (Linux kernel + Wayland + Chromium V8) |
| **Debug Bridge** | ADB on port 5555 | SDB on port 26101 | Developer Mode SSH on port 9922 & Luna Bus |
| **Package Format** | Android Package (`.apk`) | W3C Tizen Widget (`.wgt`) | Debian ar Archive (`.ipk`) |
| **Application Runtime** | Native Android Java / Compose | W3C Web App (HTML5/CSS3/ES6) | W3C Chromium Web App (`usr/palm/applications`) |
| **System Interprocess Bus** | Android Binder IPC | D-Bus / Tizen API | LG Luna Service Bus (`luna://`) |
| **App Launching** | `am start -n <package>/<activity>` | `tizen.application.launch(appId)` | `luna://com.webos.service.applicationmanager/launch` |
| **Launcher Bypass** | `pm disable-user com.google.android.tvlauncher` | `Autorun Smart Hub = OFF` | `Home Auto Launch = OFF` + Recent App Startup |
| **Remote Control Input** | Android KeyEvents | Tizen TVInputDevice & WebSocket | W3C KeyEvents + Magic Remote Gyro Pointer |
| **Video Decoding** | Android MediaPlayer / ExoPlayer | Tizen AVPlay / HTML5 Video | Hardware Video Overlay (Wayland Hole Punch) |
| **Root Required?** | No (Standard user ADB) | No (Standard user SDB) | **No** (Standard user Developer Mode on port 9922) |
| **Risk of Bricking** | Low | Zero | **Zero** (100% user-space application sandbox) |

---

## ⚡ Why webOS Web App Architecture?

1. **Native Hardware Graphics Acceleration:**  
   webOS runs applications inside a dedicated Chromium container rendered by LG's custom Wayland compositor (`surface-manager` / `starfish`). Glassmorphism, CSS transforms, and SVG icons render locked at 60fps even on entry-level quad-core ARM chipsets.

2. **Hardware Video Hole Punching:**  
   For 4K HDR live streams and CCTV surveillance feeds, webOS automatically punches a transparent hole through the Chromium graphics DOM plane directly into the hardware media decode pipeline, allowing stutter-free 4K 60fps playback with zero CPU load.

3. **Zero Root Required:**  
   Installs safely in the unprivileged `prisoner` developer sandbox (`/media/developer/apps/usr/palm/applications/`). Completely safe, reversible, and does not void LG manufacturer warranty.
