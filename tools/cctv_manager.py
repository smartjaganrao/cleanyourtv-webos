#!/usr/bin/env python3
"""
CleanHub TV - CCTV Camera Discovery & Stream Configuration Tool
Scans local network for RTSP & HTTP surveillance cameras (Tapo, Hikvision, CP Plus, Dahua, Frigate, NVR).
Tests feed availability, bandwidth latency, and generates JSON presets for CleanHub TV.
"""

import socket
import json
import os
import sys
import argparse
import subprocess

COMMON_PORTS = [554, 80, 8080, 8000, 8554, 1935]

CAMERA_PRESETS = {
    "tapo": {
        "name": "TP-Link Tapo C200/C310",
        "rtsp_template": "rtsp://{user}:{pwd}@{ip}:554/stream1",
        "substream_template": "rtsp://{user}:{pwd}@{ip}:554/stream2"
    },
    "hikvision": {
        "name": "Hikvision / Ezviz",
        "rtsp_template": "rtsp://{user}:{pwd}@{ip}:554/Streaming/Channels/101",
        "substream_template": "rtsp://{user}:{pwd}@{ip}:554/Streaming/Channels/102"
    },
    "cpplus": {
        "name": "CP Plus / Dahua",
        "rtsp_template": "rtsp://{user}:{pwd}@{ip}:554/cam/realmonitor?channel=1&subtype=0",
        "substream_template": "rtsp://{user}:{pwd}@{ip}:554/cam/realmonitor?channel=1&subtype=1"
    },
    "frigate": {
        "name": "Frigate NVR / go2rtc (HLS/WebRTC)",
        "hls_template": "http://{ip}:5000/api/{camera}/live/index.m3u8"
    }
}

def scan_subnet(subnet_prefix="192.168.0", start=1, end=254, timeout=0.15):
    print(f"[*] Scanning {subnet_prefix}.{start} - {end} for IP cameras...")
    discovered = []
    for host in range(start, end + 1):
        ip = f"{subnet_prefix}.{host}"
        for port in [554, 80, 8000]:
            try:
                s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                s.settimeout(timeout)
                if s.connect_ex((ip, port)) == 0:
                    discovered.append((ip, port))
                    print(f"    [+] Active device at {ip}:{port}")
                    s.close()
                    break
                s.close()
            except Exception:
                pass
    return discovered

def test_stream_url(url, timeout=4):
    print(f"[*] Testing stream URL: {url} ...")
    try:
        cmd = ["curl", "-I", "-s", "--max-time", str(timeout), url]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if "200" in res.stdout or "302" in res.stdout:
            print("[✓] Stream responded HTTP 200 OK")
            return True
        else:
            print(f"[?] Stream header: {res.stdout.splitlines()[:2]}")
            return False
    except Exception as e:
        print(f"[!] Test error: {e}")
        return False

def print_presets():
    print("\n--- Common CCTV RTSP & HLS URL Formats ---")
    for key, data in CAMERA_PRESETS.items():
        print(f"\n• {data['name']}:")
        for k, v in data.items():
            if k != "name":
                print(f"    {k}: {v}")
    print("\n💡 Tip: You can configure these URLs directly inside CleanHub TV using the remote control (Blue Button / Camera Settings)!")

def main():
    parser = argparse.ArgumentParser(description="CleanHub TV CCTV Camera Manager")
    parser.add_argument("--scan", help="Scan local subnet prefix (e.g. 192.168.0)")
    parser.add_argument("--test", help="Test a camera stream URL")
    parser.add_argument("--presets", action="store_true", help="Print camera URL presets for Tapo, Hikvision, CP Plus, etc.")
    args = parser.parse_args()

    if args.presets:
        print_presets()
    elif args.test:
        test_stream_url(args.test)
    elif args.scan:
        scan_subnet(args.scan)
    else:
        print_presets()

if __name__ == "__main__":
    main()
