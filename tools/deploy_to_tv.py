#!/usr/bin/env python3
"""
CleanHub TV - Direct Deployment to LG webOS Smart TV
Packages the latest IPK, uploads to the TV, installs via Dev Mode luna service, and launches.
"""

import os
import sys
import time
import subprocess

REPO_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PKG_SCRIPT = os.path.join(REPO_DIR, "tools", "package_ipk.py")
IPK_FILE = os.path.join(REPO_DIR, "com.cleanyourtv.home_1.5.0_all.ipk")

def main():
    print("=" * 60)
    print("🚀 CleanHub TV - Deploying to LG webOS TV (192.168.0.202)")
    print("=" * 60)

    # 1. Package IPK
    print("\n[*] Step 1: Packaging CleanHub TV IPK...")
    p1 = subprocess.run([sys.executable, PKG_SCRIPT], cwd=REPO_DIR)
    if p1.returncode != 0:
        print("[✗] Failed to package IPK.")
        sys.exit(1)

    if not os.path.isfile(IPK_FILE):
        print(f"[✗] Expected IPK not found at: {IPK_FILE}")
        sys.exit(1)
    
    print(f"[✓] Built IPK: {IPK_FILE} ({os.path.getsize(IPK_FILE):,} bytes)")

    # 2. Upload to TV temp folder
    print("\n[*] Step 2: Uploading IPK to TV via SCP...")
    remote_temp = "lgtv:/media/developer/temp/home.ipk"
    p2 = subprocess.run(["scp", IPK_FILE, remote_temp], capture_output=True, text=True)
    if p2.returncode != 0:
        print(f"[✗] SCP upload failed: {p2.stderr}")
        sys.exit(1)
    print("[✓] Upload complete: /media/developer/temp/home.ipk")

    # 3. Trigger Dev Mode App Install
    print("\n[*] Step 3: Triggering webOS App Install Service...")
    install_cmd = 'luna-send-pub -n 1 -i "luna://com.webos.appInstallService/dev/install" "{\\"id\\":\\"com.cleanyourtv.home\\",\\"ipkUrl\\":\\"/media/developer/temp/home.ipk\\",\\"subscribe\\":true}"'
    p3 = subprocess.run(["ssh", "lgtv", install_cmd], capture_output=True, text=True)
    print(f"[✓] Install response: {p3.stdout.strip()}")

    time.sleep(1.5)

    # 4. Launch CleanHub TV on TV
    print("\n[*] Step 4: Launching CleanHub TV (com.cleanyourtv.home) on TV...")
    launch_cmd = 'luna-send-pub -n 1 "luna://com.webos.service.applicationmanager/launch" "{\\"id\\":\\"com.cleanyourtv.home\\"}"'
    p4 = subprocess.run(["ssh", "lgtv", launch_cmd], capture_output=True, text=True)
    print(f"[✓] Launch response: {p4.stdout.strip()}")

    print("\n" + "=" * 60)
    print("✨ DEPLOYMENT COMPLETE! CleanHub TV is now live on your LG Smart TV!")
    print("=" * 60)

if __name__ == "__main__":
    main()
