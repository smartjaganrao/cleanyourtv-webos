#!/usr/bin/env python3
"""
Generate crisp, Apple-TV aesthetic app icons for CleanHub TV (webOS).
Renders at 512x512 supersampled and downsizes to 160x160 with Lanczos for ultra-crisp display on 4K/1080p OLED TVs.
"""

import os
import math
from PIL import Image, ImageDraw, ImageFont

ICONS_DIR = os.path.join(os.path.dirname(__file__), "..", "launcher", "assets", "icons")
os.makedirs(ICONS_DIR, exist_ok=True)

SIZE = 512
TARGET_SIZE = 160
CORNER_RADIUS = 110

def create_base(bg_color_top, bg_color_bottom=None):
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    if bg_color_bottom and bg_color_bottom != bg_color_top:
        for y in range(SIZE):
            ratio = y / float(SIZE)
            r = int(bg_color_top[0] * (1 - ratio) + bg_color_bottom[0] * ratio)
            g = int(bg_color_top[1] * (1 - ratio) + bg_color_bottom[1] * ratio)
            b = int(bg_color_top[2] * (1 - ratio) + bg_color_bottom[2] * ratio)
            draw.line([(0, y), (SIZE, y)], fill=(r, g, b, 255))
    else:
        draw.rectangle([(0, 0), (SIZE, SIZE)], fill=bg_color_top + (255,))
    
    # Rounded corner mask
    mask = Image.new("L", (SIZE, SIZE), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([(0, 0), (SIZE, SIZE)], radius=CORNER_RADIUS, fill=255)
    img.putalpha(mask)
    
    # Border highlight
    overlay = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    overlay_draw.rounded_rectangle([(2, 2), (SIZE-3, SIZE-3)], radius=CORNER_RADIUS, outline=(255, 255, 255, 45), width=4)
    img = Image.alpha_composite(img, overlay)
    
    return img

def save_icon(img, filename):
    out = img.resize((TARGET_SIZE, TARGET_SIZE), Image.Resampling.LANCZOS)
    path = os.path.join(ICONS_DIR, filename)
    out.save(path, "PNG")
    print(f"Generated {path}")

# 1. YouTube
def make_youtube():
    base = create_base((235, 30, 35), (190, 10, 20))
    draw = ImageDraw.Draw(base)
    # White play button box
    draw.rounded_rectangle([(110, 160), (402, 352)], radius=56, fill=(255, 255, 255, 255))
    # Red play triangle
    draw.polygon([(220, 206), (220, 306), (320, 256)], fill=(230, 25, 30, 255))
    save_icon(base, "youtube.png")

# 2. Netflix
def make_netflix():
    base = create_base((18, 18, 18), (8, 8, 8))
    draw = ImageDraw.Draw(base)
    # Red N ribbon
    # Left bar
    draw.rectangle([(150, 120), (200, 392)], fill=(229, 9, 20, 255))
    # Right bar
    draw.rectangle([(312, 120), (362, 392)], fill=(229, 9, 20, 255))
    # Diagonal sash
    draw.polygon([(150, 120), (200, 120), (362, 392), (312, 392)], fill=(245, 18, 30, 255))
    save_icon(base, "netflix.png")

# 3. Prime Video
def make_prime():
    base = create_base((15, 23, 30), (0, 168, 225))
    draw = ImageDraw.Draw(base)
    # Prime text or curved arrow smile
    draw.rounded_rectangle([(100, 190), (412, 260)], radius=20, fill=(255, 255, 255, 240))
    # Smile arc
    draw.arc([(130, 240), (382, 360)], start=20, end=160, fill=(0, 168, 225, 255), width=24)
    # Smile arrowhead
    draw.polygon([(360, 290), (395, 310), (380, 275)], fill=(0, 168, 225, 255))
    save_icon(base, "prime.png")

# 4. Hotstar / JioHotstar
def make_hotstar():
    base = create_base((12, 40, 110), (5, 120, 220))
    draw = ImageDraw.Draw(base)
    # Star emblem
    cx, cy, r_out, r_in = 256, 240, 120, 52
    points = []
    for i in range(10):
        angle = i * math.pi / 5 - math.pi / 2
        r = r_out if i % 2 == 0 else r_in
        points.append((cx + r * math.cos(angle), cy + r * math.sin(angle)))
    draw.polygon(points, fill=(255, 215, 0, 255))
    draw.text((180, 370), "HOTSTAR", fill=(255, 255, 255, 240))
    save_icon(base, "hotstar.png")

# 5. CCTV Viewer
def make_cctv():
    base = create_base((15, 23, 42), (30, 41, 59))
    draw = ImageDraw.Draw(base)
    # Quad grid representation
    # 4 squares
    pad = 18
    w = 110
    colors = [(14, 165, 233), (16, 185, 129), (245, 158, 11), (139, 92, 246)]
    coords = [
        (130, 130, 130+w, 130+w),
        (130+w+pad, 130, 130+w*2+pad, 130+w),
        (130, 130+w+pad, 130+w, 130+w*2+pad),
        (130+w+pad, 130+w+pad, 130+w*2+pad, 130+w*2+pad),
    ]
    for (x1, y1, x2, y2), c in zip(coords, colors):
        draw.rounded_rectangle([(x1, y1), (x2, y2)], radius=16, fill=c + (200,), outline=(255, 255, 255, 100), width=3)
        # Small camera lens in center
        cx, cy = (x1 + x2) // 2, (y1 + y2) // 2
        draw.ellipse([(cx-16, cy-16), (cx+16, cy+16)], fill=(255, 255, 255, 230))
        draw.ellipse([(cx-8, cy-8), (cx+8, cy+8)], fill=(15, 23, 42, 255))
    # Red REC badge
    draw.ellipse([(350, 100), (376, 126)], fill=(239, 68, 68, 255))
    save_icon(base, "cctv.png")

# 6. ZEE5
def make_zee5():
    base = create_base((130, 48, 198), (75, 20, 120))
    draw = ImageDraw.Draw(base)
    # ZEE 5 Stylized
    draw.ellipse([(140, 140), (372, 372)], outline=(255, 255, 255, 220), width=18)
    draw.line([(190, 200), (310, 200)], fill=(255, 255, 255, 255), width=20)
    draw.line([(310, 200), (190, 310)], fill=(255, 255, 255, 255), width=20)
    draw.line([(190, 310), (310, 310)], fill=(255, 255, 255, 255), width=20)
    save_icon(base, "zee5.png")

# 7. Apple TV
def make_appletv():
    base = create_base((28, 28, 30), (10, 10, 12))
    draw = ImageDraw.Draw(base)
    # Apple icon + tv
    # Apple body
    draw.ellipse([(170, 180), (310, 320)], fill=(255, 255, 255, 255))
    draw.ellipse([(200, 180), (340, 320)], fill=(255, 255, 255, 255))
    # Leaf
    draw.ellipse([(255, 130), (295, 175)], fill=(255, 255, 255, 255))
    # Cutout bite
    draw.ellipse([(290, 210), (350, 280)], fill=(28, 28, 30, 255))
    # "tv" label
    draw.rounded_rectangle([(335, 200), (385, 230)], radius=8, fill=(255, 255, 255, 255))
    save_icon(base, "appletv.png")

# 8. Plex
def make_plex():
    base = create_base((24, 24, 27), (15, 15, 18))
    draw = ImageDraw.Draw(base)
    # Gold Plex chevron
    draw.polygon([(180, 140), (280, 256), (180, 372), (240, 372), (340, 256), (240, 140)], fill=(229, 160, 13, 255))
    save_icon(base, "plex.png")

# 9. Xstream Play
def make_xstream():
    base = create_base((217, 30, 24), (160, 15, 15))
    draw = ImageDraw.Draw(base)
    # Crisp X
    draw.line([(160, 150), (352, 362)], fill=(255, 255, 255, 255), width=36)
    draw.line([(352, 150), (160, 362)], fill=(255, 255, 255, 255), width=36)
    save_icon(base, "xstream.png")

# 10. LG Channels
def make_lgchannels():
    base = create_base((165, 0, 52), (105, 0, 30))
    draw = ImageDraw.Draw(base)
    # LG TV screen & broadcast beam
    draw.rounded_rectangle([(140, 160), (372, 340)], radius=24, outline=(255, 255, 255, 255), width=16)
    # Play icon inside
    draw.polygon([(230, 210), (230, 290), (300, 250)], fill=(255, 255, 255, 255))
    save_icon(base, "lgchannels.png")

# 11. Web Browser
def make_browser():
    base = create_base((37, 99, 235), (29, 78, 216))
    draw = ImageDraw.Draw(base)
    # Globe / Compass
    draw.ellipse([(140, 140), (372, 372)], outline=(255, 255, 255, 255), width=16)
    draw.ellipse([(200, 140), (312, 372)], outline=(255, 255, 255, 180), width=10)
    draw.line([(140, 256), (372, 256)], fill=(255, 255, 255, 180), width=10)
    # Compass needle
    draw.polygon([(256, 170), (280, 256), (256, 240)], fill=(239, 68, 68, 255))
    draw.polygon([(256, 342), (232, 256), (256, 272)], fill=(255, 255, 255, 255))
    save_icon(base, "browser.png")

# 12. Home Dashboard (Home Connect)
def make_homeconnect():
    base = create_base((5, 150, 105), (4, 120, 87))
    draw = ImageDraw.Draw(base)
    # Roof
    draw.polygon([(256, 140), (140, 240), (372, 240)], fill=(255, 255, 255, 255))
    # Walls
    draw.rectangle([(170, 240), (342, 360)], fill=(255, 255, 255, 255))
    # Door cutout
    draw.rounded_rectangle([(230, 280), (282, 360)], radius=8, fill=(5, 150, 105, 255))
    save_icon(base, "homeconnect.png")

# 13. Homebrew Channel
def make_homebrew():
    base = create_base((79, 70, 229), (67, 56, 202))
    draw = ImageDraw.Draw(base)
    # 3D Cube / Package
    # Top face
    draw.polygon([(256, 140), (356, 195), (256, 250), (156, 195)], fill=(224, 231, 255, 255))
    # Left face
    draw.polygon([(156, 195), (256, 250), (256, 370), (156, 315)], fill=(165, 180, 252, 255))
    # Right face
    draw.polygon([(356, 195), (256, 250), (256, 370), (356, 315)], fill=(129, 140, 248, 255))
    save_icon(base, "homebrew.png")

# 14. Developer Mode
def make_devmode():
    base = create_base((217, 119, 6), (180, 83, 9))
    draw = ImageDraw.Draw(base)
    # Terminal bracket < / >
    # <
    draw.line([(200, 190), (150, 256), (200, 322)], fill=(255, 255, 255, 255), width=20)
    # /
    draw.line([(270, 180), (242, 332)], fill=(255, 255, 255, 255), width=18)
    # >
    draw.line([(312, 190), (362, 256), (312, 322)], fill=(255, 255, 255, 255), width=20)
    save_icon(base, "devmode.png")

def main():
    print("Generating Apple-TV style crisp brand icons...")
    make_youtube()
    make_netflix()
    make_prime()
    make_hotstar()
    make_cctv()
    make_zee5()
    make_appletv()
    make_plex()
    make_xstream()
    make_lgchannels()
    make_browser()
    make_homeconnect()
    make_homebrew()
    make_devmode()
    print("Done! All icons generated in launcher/assets/icons/")

if __name__ == "__main__":
    main()
