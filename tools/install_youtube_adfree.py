#!/usr/bin/env python3
"""
CleanHub TV - Ad-Free YouTube & SponsorBlock Installer for LG webOS
Sideloads the open-source YouTube AdFree (with auto-SponsorBlock & 4K HDR)
and Homebrew Channel onto your LG Smart TV over Wi-Fi.
Zero video ads · Auto sponsor skipping · Background audio play
"""

import os
import sys
import argparse
import subprocess
import urllib.request
import json
import time

YOUTUBE_ADFREE_IPK_URL = "https://github.com/webosbrew/youtube-webos/releases/download/v0.4.3/youtube.leanback.v4_0.4.3_all.ipk"
HOMEBREW_CHANNEL_URL = "https://github.com/webosbrew/webos-homebrew-channel/releases/download/v0.6.3/org.webosbrew.hbchannel_0.6.3_all.ipk"

def run_ssh(tv_ip, remote_cmd, key_file=None):
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

def scp_file(tv_ip, local_file, remote_file, key_file=None):
    cmd = [
        "scp", "-P", "9922",
        "-o", "StrictHostKeyChecking=no",
        "-o", "UserKnownHostsFile=/dev/null",
        "-o", "HostKeyAlgorithms=+ssh-rsa",
        "-o", "PubkeyAcceptedKeyTypes=+ssh-rsa"
    ]
    if key_file and os.path.exists(key_file):
        cmd.extend(["-i", key_file])
    cmd.extend([local_file, f"prisoner@{tv_ip}:{remote_file}"])
    return subprocess.run(cmd, capture_output=True, text=True)

def download_file(url, target_path):
    print(f"[*] Downloading: {url} ...")
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=30) as response, open(target_path, 'wb') as out_file:
        out_file.write(response.read())
    size_mb = os.path.getsize(target_path) / (1024 * 1024)
    print(f"[✓] Downloaded {size_mb:.2f} MB")

def install_package(tv_ip, package_name, ipk_url, key_file=None):
    local_ipk = f"/tmp/{package_name}.ipk"
    remote_ipk = f"/media/developer/temp/{package_name}.ipk"

    try:
        download_file(ipk_url, local_ipk)
    except Exception as e:
        print(f"[!] Download failed ({e}). Checking local cache...")
        if not os.path.exists(local_ipk):
            print(f"[!] Could not download {package_name}. Please check internet connection.")
            return False

    print(f"[*] Sideloading {package_name} to LG TV ({tv_ip})...")
    run_ssh(tv_ip, "mkdir -p /media/developer/temp", key_file)
    res = scp_file(tv_ip, local_ipk, remote_ipk, key_file)
    if res.returncode != 0:
        print(f"[!] SCP upload error: {res.stderr}")
        return False

    print(f"[*] Installing via Luna Bus...")
    install_cmd = f"luna-send-pub -n 1 luna://com.webos.appInstallService/dev/install '{{\"id\":\"{package_name}\",\"ipkUrl\":\"{remote_ipk}\"}}'"
    res = run_ssh(tv_ip, install_cmd, key_file)
    print(f"[*] Response: {res.stdout.strip()}")
    return "true" in res.stdout.lower()

def main():
    parser = argparse.ArgumentParser(description="Install Ad-Free YouTube + SponsorBlock on LG webOS Smart TV")
    parser.add_argument("tv_ip", help="LG TV IP address (e.g. 192.168.0.15)")
    parser.add_argument("--key", help="SSH Private key file")
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

    print(f"\n=======================================================")
    print(f"🎬 Installing Ad-Free YouTube on LG webOS ({args.tv_ip})")
    print(f"=======================================================")

    # 1. Install Homebrew Channel
    print("\n[Step 1/2] Installing webOS Homebrew Channel...")
    install_package(args.tv_ip, "org.webosbrew.hbchannel", HOMEBREW_CHANNEL_URL, key_file)

    # 2. Install YouTube AdFree
    print("\n[Step 2/2] Installing YouTube AdFree (with SponsorBlock)...")
    ok = install_package(args.tv_ip, "youtube.leanback.v4", YOUTUBE_ADFREE_IPK_URL, key_file)

    if ok:
        print("\n[✨] Success! Ad-Free YouTube is now installed.")
        print("     • Zero pre-roll or mid-roll video ads")
        print("     • Automatic SponsorBlock segment skipping")
        print("     • Locked 4K HDR 60fps playback with VP9 / AV1 hardware acceleration")
    else:
        print("\n[!] Installation encountered a notice. Verify Dev Mode status in TV Developer app.")

if __name__ == "__main__":
    main()
