#!/usr/bin/env python3
"""
CleanHub TV - LG webOS TV Companion CLI
Pairs with LG Smart TVs running webOS over local Wi-Fi.
Supports remote control key injection, app launching, input switching, and diagnostics.
"""

import socket
import ssl
import json
import base64
import os
import sys
import subprocess
import argparse
import time

APP_SHORTCUTS = {
    "cytv": "com.cleanyourtv.home",
    "cleanhub": "com.cleanyourtv.home",
    "home": "com.cleanyourtv.home",
    "cctv": "com.cctv.viewer",
    "camera": "com.cctv.viewer",
    "youtube": "youtube.leanback.v4",
    "yt": "youtube.leanback.v4",
    "netflix": "netflix",
    "prime": "amazon",
    "hotstar": "hotstar",
    "zee5": "com.zee5.app",
    "browser": "com.webos.app.browser",
    "hdmi1": "com.webos.app.hdmi1",
    "hdmi2": "com.webos.app.hdmi2",
    "hdmi3": "com.webos.app.hdmi3",
    "hdmi4": "com.webos.app.hdmi4",
    "livetv": "com.webos.app.livetv",
    "homebrew": "org.webosbrew.hbchannel",
    "devmode": "com.palmdts.devmode"
}

def probe_tv(ip, timeout=2):
    """Probe an IP address for standard LG webOS TV ports."""
    open_ports = []
    # 3000/3001: webOS SSAP WebSocket, 9922: Dev Mode SSH, 9998: CDP Debugger
    for port in [3000, 3001, 9922, 9998]:
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.settimeout(timeout)
            if s.connect_ex((ip, port)) == 0:
                open_ports.append(port)
            s.close()
        except Exception:
            pass
    return open_ports

def run_ssh(tv_ip, remote_cmd, key_file=None):
    """Run command via SSH (port 9922)."""
    cmd = [
        "ssh", "-p", "9922",
        "-o", "StrictHostKeyChecking=no",
        "-o", "UserKnownHostsFile=/dev/null",
        "-o", "HostKeyAlgorithms=+ssh-rsa",
        "-o", "PubkeyAcceptedKeyTypes=+ssh-rsa"
    ]
    if key_file and os.path.exists(key_file):
        cmd.extend(["-i", key_file])
    cmd.extend([f"prisoner@{tv_ip}", remote_cmd])
    return subprocess.run(cmd, capture_output=True, text=True)

def launch_app(tv_ip, app_name, key_file=None):
    app_id = APP_SHORTCUTS.get(app_name.lower(), app_name)
    print(f"[*] Launching {app_id} on LG TV ({tv_ip})...")
    cmd = f"luna-send-pub -n 1 luna://com.webos.service.applicationmanager/launch '{{\"id\":\"{app_id}\"}}'"
    res = run_ssh(tv_ip, cmd, key_file)
    print(f"[✓] Result: {res.stdout.strip()}")

def list_apps(tv_ip, key_file=None):
    print(f"[*] Querying installed apps from LG TV ({tv_ip})...")
    # Dev mode listing
    cmd = "ls -d /media/developer/apps/usr/palm/applications/* 2>/dev/null"
    res = run_ssh(tv_ip, cmd, key_file)
    if res.stdout:
        print("\nSideloaded / Developer Apps:")
        for line in res.stdout.strip().split("\n"):
            app_id = os.path.basename(line.strip())
            print(f"  • {app_id}")
    else:
        print("No sideloaded developer apps found.")

def send_key(tv_ip, key_name, key_file=None):
    """Inject remote key via webOS Luna or input service."""
    key_map = {
        "home": "HOME",
        "back": "BACK",
        "up": "UP",
        "down": "DOWN",
        "left": "LEFT",
        "right": "RIGHT",
        "ok": "ENTER",
        "enter": "ENTER",
        "red": "RED",
        "green": "GREEN",
        "yellow": "YELLOW",
        "blue": "BLUE",
        "1": "1", "2": "2", "3": "3", "4": "4"
    }
    target_key = key_map.get(key_name.lower(), key_name.upper())
    print(f"[*] Sending key '{target_key}' to TV...")
    cmd = f"luna-send-pub -n 1 luna://com.webos.service.tv.input/sendKey '{{\"key\":\"{target_key}\"}}'"
    res = run_ssh(tv_ip, cmd, key_file)
    print(f"[✓] {res.stdout.strip()}")

def main():
    parser = argparse.ArgumentParser(description="CleanHub TV - LG webOS CLI Companion")
    parser.add_argument("--tv", help="TV IP address (defaults to auto-detect or 192.168.0.15)", default="192.168.0.15")
    parser.add_argument("--key", help="SSH Private key file")
    subparsers = parser.add_subparsers(dest="command")

    # Probe
    probe_parser = subparsers.add_parser("probe", help="Probe TV ports on network")
    probe_parser.add_argument("ip", nargs="?", default="192.168.0.15")

    # Launch
    launch_parser = subparsers.add_parser("launch", help="Launch an application on TV")
    launch_parser.add_argument("app", help="App name or shortcut (cytv, cctv, youtube, netflix, hdmi1)")

    # Apps
    subparsers.add_parser("apps", help="List installed developer applications")

    # Key
    key_parser = subparsers.add_parser("key", help="Send a remote control key")
    key_parser.add_argument("key_name", help="Key name (home, back, ok, up, down, left, right, red, green)")

    args = parser.parse_args()

    key_file = args.key
    if not key_file:
        candidate = os.path.expanduser("~/.ssh/webos_id_rsa")
        if os.path.exists(candidate):
            key_file = candidate
        else:
            scratch_key = os.path.join(os.path.dirname(__file__), "..", "..", "webos_id_rsa")
            if os.path.exists(scratch_key):
                key_file = scratch_key

    if args.command == "probe":
        ports = probe_tv(args.ip)
        print(f"\nScanning LG TV at {args.ip}...")
        if ports:
            print(f"[✓] Active LG TV Ports Found: {ports}")
            if 9922 in ports:
                print("    • Port 9922: Developer Mode SSH (Active & Ready for Sideloading)")
            if 3000 in ports or 3001 in ports:
                print("    • Port 3000/3001: webOS SSAP Remote WebSocket")
            if 9998 in ports:
                print("    • Port 9998: Chromium CDP Debugger")
        else:
            print("[!] No active webOS ports responded.")

    elif args.command == "launch":
        launch_app(args.tv, args.app, key_file)

    elif args.command == "apps":
        list_apps(args.tv, key_file)

    elif args.command == "key":
        send_key(args.tv, args.key_name, key_file)

    else:
        parser.print_help()

if __name__ == "__main__":
    main()
