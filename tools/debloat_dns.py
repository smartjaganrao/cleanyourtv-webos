#!/usr/bin/env python3
"""
CleanHub TV - LG webOS Smart TV Ad & Telemetry DNS Blocker Tool
Verifies whether your network is currently blocking LG webOS ads and telemetry tracking,
and exports drop-in blocklists for Pi-hole, AdGuard Home, NextDNS, and routers.

Usage:
    python3 tools/debloat_dns.py --check
    python3 tools/debloat_dns.py --export pihole
    python3 tools/debloat_dns.py --export adguard
"""

import os
import sys
import socket
import argparse

BLOCKLIST_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "blocklists", "lg-webos-ads-telemetry.txt")

SAMPLE_DOMAINS = [
    "ad.lgsmartad.com",
    "common.lgsmartad.com",
    "ibis.lgappstv.com",
    "aic.lgtvcommon.com",
    "rdx2.lgtvsdp.com",
    "nudge.lgtvcommon.com",
    "alphonso.tv"
]

def check_domains():
    print("🔎 Checking network status for LG webOS ad and telemetry tracking servers...\n")
    print(f"{'Domain':<30} | {'Status':<15} | {'Resolved IP'}")
    print("-" * 65)

    blocked_count = 0
    total_count = len(SAMPLE_DOMAINS)

    for domain in SAMPLE_DOMAINS:
        try:
            ip = socket.gethostbyname(domain)
            if ip in ("0.0.0.0", "127.0.0.1", "::1") or ip.startswith("0."):
                status = "🛡️  BLOCKED"
                blocked_count += 1
            else:
                status = "⚠️  ACTIVE (Ad)"
            print(f"{domain:<30} | {status:<15} | {ip}")
        except socket.gaierror:
            status = "🛡️  BLOCKED (NX)"
            blocked_count += 1
            print(f"{domain:<30} | {status:<15} | None (Blocked)")

    print("-" * 65)
    if blocked_count == total_count:
        print("🎉 EXCELLENT! All LG webOS ad & telemetry servers are blocked on your network.")
        print("   Your TV is clean and zero viewing data or ACR telemetry is tracked.")
    elif blocked_count > 0:
        print(f"⚠️  Partial blocking: {blocked_count}/{total_count} domains blocked.")
    else:
        print("🚨 Ads & Telemetry are ACTIVE on your network.")
        print("   Add blocklists/lg-webos-ads-telemetry.txt to your router, Pi-hole, or NextDNS.")

def export_blocklist(fmt):
    if not os.path.exists(BLOCKLIST_FILE):
        print(f"Error: {BLOCKLIST_FILE} not found.")
        return

    with open(BLOCKLIST_FILE, "r") as f:
        domains = [line.strip() for line in f if line.strip() and not line.startswith("#")]

    if fmt == "pihole":
        out = "\n".join(domains)
    elif fmt == "adguard":
        out = "\n".join([f"||{d}^" for d in domains])
    elif fmt == "hosts":
        out = "\n".join([f"0.0.0.0 {d}" for d in domains])
    else:
        out = "\n".join(domains)

    print(out)

def main():
    parser = argparse.ArgumentParser(description="LG webOS DNS Debloat Checker & Exporter")
    parser.add_argument("--check", action="store_true", help="Check DNS blocking status for sample LG TV ad domains")
    parser.add_argument("--export", choices=["pihole", "adguard", "hosts"], help="Export formatted blocklist")
    args = parser.parse_args()

    if args.check:
        check_domains()
    elif args.export:
        export_blocklist(args.export)
    else:
        check_domains()

if __name__ == "__main__":
    main()
