#!/usr/bin/env python3
"""
CleanHub TV - LG webOS Sideload & Installation Utility
Installs the .ipk package to an LG Smart TV running webOS via Developer Mode (SSH port 9922)
or official webOS ares-cli.
"""

import os
import sys
import argparse
import subprocess
import time
import socket

def probe_tv_ssh(tv_ip, port=9922, timeout=3):
    """Check if LG webOS Developer Mode SSH is reachable."""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(timeout)
        s.connect((tv_ip, port))
        s.close()
        return True
    except Exception:
        return False

def run_ssh_command(tv_ip, remote_cmd, key_file=None):
    """Run a remote command on the LG TV via SSH."""
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
    """Upload a file to the LG TV via SCP."""
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

def install_ipk(tv_ip, ipk_path, key_file=None, app_id="com.cleanyourtv.home"):
    print(f"\n=======================================================")
    print(f"🚀 Sideloading CleanHub TV to LG webOS ({tv_ip})")
    print(f"=======================================================")

    # 1. Probe connectivity
    print(f"[*] Checking Developer Mode SSH connection on {tv_ip}:9922...")
    if not probe_tv_ssh(tv_ip):
        print(f"[!] Could not connect to {tv_ip}:9922.")
        print(f"[!] Please ensure:")
        print(f"    1. LG Developer Mode app is OPEN on your TV screen.")
        print(f"    2. 'Dev Mode Status' = ON and 'Key Server' = ON.")
        print(f"    3. TV and PC are connected to the SAME Wi-Fi network.")
        sys.exit(1)

    print(f"[✓] TV SSH port 9922 is open and listening.")

    # 2. Package if needed
    if not ipk_path or not os.path.exists(ipk_path):
        from package_ipk import package_ipk
        ipk_path = package_ipk(None)

    remote_dest = "/media/developer/temp/home.ipk"
    print(f"[*] Uploading {os.path.basename(ipk_path)} ({os.path.getsize(ipk_path)} bytes) to TV...")
    
    # Ensure remote directory exists
    run_ssh_command(tv_ip, "mkdir -p /media/developer/temp", key_file)
    res = scp_file(tv_ip, ipk_path, remote_dest, key_file)
    if res.returncode != 0:
        print(f"[!] Upload failed: {res.stderr}")
        sys.exit(1)

    print(f"[✓] Upload completed successfully.")

    # 3. Install via webOS appInstallService
    print(f"[*] Installing package via webOS Luna Bus...")
    install_cmd = f"luna-send-pub -n 1 luna://com.webos.appInstallService/dev/install '{{\"id\":\"{app_id}\",\"ipkUrl\":\"{remote_dest}\"}}'"
    res = run_ssh_command(tv_ip, install_cmd, key_file)
    print(f"[*] Installation response: {res.stdout.strip()}")

    if "true" not in res.stdout.lower():
        print(f"[!] Installation returned error: {res.stdout or res.stderr}")
        sys.exit(1)

    print(f"[✓] {app_id} installed successfully!")

    # 4. Launch Application
    print(f"[*] Launching {app_id} on TV display...")
    close_cmd = f"luna-send-pub -n 1 luna://com.webos.service.applicationmanager/close '{{\"id\":\"{app_id}\"}}'"
    run_ssh_command(tv_ip, close_cmd, key_file)
    import time
    time.sleep(1)
    launch_cmd = f"luna-send-pub -n 1 luna://com.webos.service.applicationmanager/launch '{{\"id\":\"{app_id}\"}}'"
    res = run_ssh_command(tv_ip, launch_cmd, key_file)
    print(f"[*] Launch response: {res.stdout.strip()}")
    print(f"\n[✨] Success! CleanHub TV is now running on your LG TV.")

def main():
    parser = argparse.ArgumentParser(description="Install CleanHub TV .ipk on LG webOS Smart TV")
    parser.add_argument("tv_ip", help="LG TV IP address (e.g. 192.168.0.15)")
    parser.add_argument("--ipk", help="Path to .ipk package (optional, auto-builds if omitted)")
    parser.add_argument("--key", help="Path to webOS private key (webos_id_rsa)")
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

    install_ipk(args.tv_ip, args.ipk, key_file)

if __name__ == "__main__":
    main()
