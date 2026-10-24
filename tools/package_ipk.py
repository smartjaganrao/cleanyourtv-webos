#!/usr/bin/env python3
"""
CleanHub TV - Pure Python webOS IPK Packager
Packages the launcher into an official LG webOS .ipk (Debian ar archive).
Requires zero npm, Node.js, or webOS CLI dependencies. Runs on macOS, Linux, and Windows.
"""

import os
import sys
import json
import shutil
import tarfile
import argparse

def create_ar(output_path, files):
    """Create a standard Debian ar archive (used for webOS .ipk)."""
    with open(output_path, 'wb') as out:
        out.write(b'!<arch>\n')
        for filename, filepath in files:
            size = os.path.getsize(filepath)
            name_field = filename.ljust(16).encode('ascii')
            mtime = str(int(os.path.getmtime(filepath))).ljust(12).encode('ascii')
            uid = b'0     '
            gid = b'0     '
            mode = b'100644  '
            size_field = str(size).ljust(10).encode('ascii')
            trailer = b'\x60\n'
            out.write(name_field + mtime + uid + gid + mode + size_field + trailer)
            with open(filepath, 'rb') as f:
                out.write(f.read())
            if size % 2 != 0:
                out.write(b'\n')

def package_ipk(src_dir, output_ipk=None, app_id="com.cleanyourtv.home", version="1.5.0"):
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    if not src_dir:
        src_dir = os.path.join(base_dir, "launcher")

    appinfo_file = os.path.join(src_dir, "appinfo.json")
    if os.path.exists(appinfo_file):
        try:
            with open(appinfo_file, "r") as f:
                info = json.load(f)
                app_id = info.get("id", app_id)
                version = info.get("version", version)
        except Exception:
            pass

    if not output_ipk:
        output_ipk = os.path.join(base_dir, f"{app_id}_{version}_all.ipk")

    build_dir = "/tmp/cleanhub_webos_build"
    if os.path.exists(build_dir):
        shutil.rmtree(build_dir)

    app_target_dir = os.path.join(build_dir, "usr", "palm", "applications", app_id)
    pkg_target_dir = os.path.join(build_dir, "usr", "palm", "packages", app_id)
    ctrl_target_dir = os.path.join(build_dir, "control")

    os.makedirs(app_target_dir, exist_ok=True)
    os.makedirs(pkg_target_dir, exist_ok=True)
    os.makedirs(ctrl_target_dir, exist_ok=True)

    print(f"[*] Packaging CleanHub TV for LG webOS: {app_id} v{version}")
    print(f"[*] Source directory: {src_dir}")

    # 1. debian-binary
    with open(os.path.join(build_dir, "debian-binary"), "w") as f:
        f.write("2.0\n")

    # 2. control file
    control_text = f"""Package: {app_id}
Version: {version}
Section: misc
Priority: optional
Architecture: all
Installed-Size: 1800000
Maintainer: CleanYourTV Team <support@cleanyourtv.org>
Description: CleanHub TV - Ad-Free, 60fps Open-Source Launcher for LG webOS TV
webOS-Package-Format-Version: 2
"""
    with open(os.path.join(ctrl_target_dir, "control"), "w") as f:
        f.write(control_text)

    with tarfile.open(os.path.join(build_dir, "control.tar.gz"), "w:gz") as tar:
        tar.add(os.path.join(ctrl_target_dir, "control"), arcname="./control")

    # 3. packageinfo.json
    pkginfo = {
        "id": app_id,
        "version": version,
        "app": app_id
    }
    with open(os.path.join(pkg_target_dir, "packageinfo.json"), "w") as f:
        json.dump(pkginfo, f, indent=2)

    # 4. Copy application source files
    for item in os.listdir(src_dir):
        if item.startswith(".") or item == "config.xml":
            continue
        src_item = os.path.join(src_dir, item)
        dst_item = os.path.join(app_target_dir, item)
        if os.path.isdir(src_item):
            shutil.copytree(src_item, dst_item)
        else:
            shutil.copy2(src_item, dst_item)

    # 5. Create data.tar.gz
    with tarfile.open(os.path.join(build_dir, "data.tar.gz"), "w:gz") as tar:
        tar.add(os.path.join(build_dir, "usr"), arcname="./usr")

    # 6. Assemble into .ipk
    ar_files = [
        ("debian-binary", os.path.join(build_dir, "debian-binary")),
        ("control.tar.gz", os.path.join(build_dir, "control.tar.gz")),
        ("data.tar.gz", os.path.join(build_dir, "data.tar.gz"))
    ]
    create_ar(output_ipk, ar_files)

    size_kb = os.path.getsize(output_ipk) / 1024
    print(f"[✓] Successfully built .IPK package: {output_ipk} ({size_kb:.1f} KB)")
    return output_ipk

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Package CleanHub TV into a webOS .ipk")
    parser.add_argument("--src", help="Source directory (defaults to launcher/)")
    parser.add_argument("--out", help="Output .ipk path")
    args = parser.parse_args()
    package_ipk(args.src, args.out)
