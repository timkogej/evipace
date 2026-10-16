"""Generate every 2D texture the 3D scene uses: documents, the laptop screen
(one image per video frame), the clock face and labels.

Run: python3 video/tex.py   (writes into video/tex/)
"""

import json
import math
import os
import random
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from timeline import (APPROVED_AT, BROWSER_AT, CLICK_AT, FPS, FRAMES,  # noqa: E402
                      SENT_AT, TOASTS)

OUT = os.path.join(HERE, "tex")
os.makedirs(os.path.join(OUT, "screen"), exist_ok=True)

FONTS = os.path.expanduser("~/Library/Fonts")
DIDOT = os.path.join(HERE, "assets", "GFSDidot-Regular.ttf")


def inter(size, weight="Regular"):
    return ImageFont.truetype(os.path.join(FONTS, f"Inter-{weight}.otf"), size)


def didot(size):
    return ImageFont.truetype(DIDOT, size)


INK = (38, 42, 44)
SOFT = (118, 122, 120)
RULE = (205, 203, 196)
ORANGE = (255, 111, 0)
PAPER = (243, 240, 233)

rng = random.Random(7)


# --------------------------------------------------------------------------
# Paper
# --------------------------------------------------------------------------
W, H = 1240, 1754


def paper(tint=PAPER):
    im = Image.new("RGB", (W, H), tint)
    noise = Image.effect_noise((W // 2, H // 2), 9).resize((W, H)).convert("L")
    grain = Image.merge("RGB", [noise] * 3)
    im = Image.blend(im, Image.eval(grain, lambda v: int(tint[0] - 8 + v / 255 * 16)), 0.25)
    return im


def lines(d, x, y, widths, gap=34, h=9, col=(170, 170, 164)):
    for w in widths:
        d.rounded_rectangle([x, y, x + w, y + h], radius=h // 2, fill=col)
        y += gap
    return y


def header(d, brand, title, sub):
    d.text((110, 110), brand, font=inter(30, "SemiBold"), fill=INK)
    d.text((110, 150), sub, font=inter(22), fill=SOFT)
    d.text((110, 260), title, font=didot(66), fill=INK)
    d.line([110, 360, W - 110, 360], fill=RULE, width=3)


def table(d, y, rows, col2=760):
    for label, value in rows:
        d.text((110, y), label, font=inter(28), fill=SOFT)
        d.text((col2, y), value, font=inter(28, "Medium"), fill=INK)
        y += 64
        d.line([110, y - 16, W - 110, y - 16], fill=(222, 220, 214), width=2)
    return y


def invoice(name, brand, title, rows, total):
    im = paper()
    d = ImageDraw.Draw(im)
    header(d, brand, title, "Invoice no. " + str(rng.randint(20000, 99999)) + " · Period Jan–Dec 2025")
    y = table(d, 430, rows)
    d.text((110, y + 60), "Total due", font=inter(32, "SemiBold"), fill=INK)
    d.text((760, y + 56), total, font=didot(52), fill=INK)
    lines(d, 110, H - 360, [900, 760, 840, 520], gap=40)
    im.save(os.path.join(OUT, name + ".png"))


def spreadsheet(name, title):
    im = paper()
    d = ImageDraw.Draw(im)
    d.text((110, 110), title, font=inter(30, "SemiBold"), fill=INK)
    d.text((110, 152), "Printed 12 Oct 2026, page 1 of 3", font=inter(22), fill=SOFT)
    x0, y0, cw, rh = 110, 260, 170, 52
    for r in range(24):
        for c in range(6):
            x, y = x0 + c * cw, y0 + r * rh
            d.rectangle([x, y, x + cw, y + rh], outline=(200, 198, 192), width=1)
            if r == 0:
                d.text((x + 12, y + 12), ["Site", "Month", "kWh", "m³", "Litres", "Notes"][c],
                       font=inter(22, "SemiBold"), fill=INK)
            elif rng.random() < 0.82:
                d.text((x + 12, y + 13), str(rng.randint(100, 99999)) if c > 1 else
                       ["Plant A", "Plant B", "Office"][r % 3] if c == 0 else
                       ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"][r % 8],
                       font=inter(21), fill=(80, 84, 86))
    # pen marks: somebody struggled with this sheet
    d.ellipse([560, 560, 760, 640], outline=(178, 52, 40), width=4)
    d.text((800, 1560), "??", font=inter(64, "Bold"), fill=(178, 52, 40))
    im.save(os.path.join(OUT, name + ".png"))


def letter(name, kicker, title, body_widths, stamp=None):
    im = paper()
    d = ImageDraw.Draw(im)
    d.text((110, 120), kicker, font=inter(24, "Medium"), fill=SOFT)
    d.text((110, 180), title, font=didot(58), fill=INK)
    d.line([110, 280, W - 110, 280], fill=RULE, width=3)
    lines(d, 110, 340, body_widths, gap=44)
    if stamp:
        d.rounded_rectangle([760, 1400, 1130, 1520], radius=14, outline=(60, 110, 90), width=5)
        d.text((790, 1432), stamp, font=inter(34, "Bold"), fill=(60, 110, 90))
    im.save(os.path.join(OUT, name + ".png"))


def questionnaire():
    im = paper()
    d = ImageDraw.Draw(im)
    d.text((110, 110), "SUPPLIER SUSTAINABILITY QUESTIONNAIRE", font=inter(24, "SemiBold"), fill=SOFT)
    d.text((110, 160), "ESG Questionnaire 2026", font=didot(70), fill=INK)
    d.line([110, 270, W - 110, 270], fill=RULE, width=3)
    qs = [
        "1. Do you report Scope 1 & 2 emissions?",
        "2. Do you have a sustainability policy?",
        "3. Is there an environmental target?",
        "4. Do you track energy consumption?",
        "5. Do you have a supplier code of conduct?",
        "6. Is there a health & safety policy?",
        "7. Can you provide supporting evidence?",
        "8. Who is responsible for ESG?",
    ]
    boxes = []
    y = 340
    for q in qs:
        d.text((110, y), q, font=inter(30, "Medium"), fill=INK)
        lines(d, 110, y + 56, [720, 540], gap=30, h=8, col=(196, 194, 188))
        bx, by, s = 1010, y - 4, 70
        d.rounded_rectangle([bx, by, bx + s, by + s], radius=10, outline=(150, 150, 144), width=4)
        boxes.append(((bx + s / 2) / W, (by + s / 2) / H))
        y += 172
    im.save(os.path.join(OUT, "questionnaire.png"))
    return boxes


POLICY = [
    "Our commitment",
    "We are committed to running our business in a way",
    "that reduces our environmental impact, treats people",
    "fairly and is transparent towards our customers.",
    "",
    "Climate and energy",
    "We measure our Scope 1 and Scope 2 emissions every",
    "year and set targets to reduce energy use and fuel",
    "consumption across all of our sites.",
    "",
    "People and conduct",
    "We provide safe working conditions, respect human",
    "rights and expect the same of our suppliers.",
    "",
    "Responsibility",
    "Management reviews this policy annually and reports",
    "progress to customers on request.",
]


def policy():
    im = paper()
    d = ImageDraw.Draw(im)
    d.text((110, 120), "POLICY · VERSION 1.0 · 2026", font=inter(24, "SemiBold"), fill=SOFT)
    d.text((110, 175), "Sustainability Policy", font=didot(80), fill=INK)
    d.rectangle([110, 300, 230, 306], fill=ORANGE)
    y = 380
    for ln in POLICY:
        if ln and not ln[0].islower() and len(ln) < 26:
            d.text((110, y), ln, font=didot(42), fill=INK)
            y += 66
        elif ln:
            d.text((110, y), ln, font=inter(30), fill=(70, 74, 76))
            y += 48
        else:
            y += 30
    d.text((110, H - 200), "Approved by management", font=inter(24), fill=SOFT)
    d.line([110, H - 230, 520, H - 230], fill=RULE, width=2)
    im.save(os.path.join(OUT, "policy.png"))


def scope_card():
    cw, ch = 1240, 1754
    im = paper((247, 245, 240))
    d = ImageDraw.Draw(im)
    d.text((110, 120), "GREENHOUSE GAS EMISSIONS · 2025", font=inter(26, "SemiBold"), fill=SOFT)
    d.text((110, 180), "Scope 1 & 2", font=didot(120), fill=INK)
    d.rectangle([110, 345, 250, 352], fill=ORANGE)
    d.text((110, 470), "312.4", font=didot(260), fill=INK)
    d.text((110, 780), "t CO₂e  total", font=inter(44, "Medium"), fill=SOFT)
    y = 960
    for label, val, frac in [("Scope 1 — fuel & gas", "118.9 t", 0.38),
                             ("Scope 2 — electricity", "193.5 t", 0.62)]:
        d.text((110, y), label, font=inter(36, "Medium"), fill=INK)
        d.text((870, y), val, font=didot(46), fill=INK)
        d.rounded_rectangle([110, y + 70, 1130, y + 92], radius=11, fill=(226, 223, 216))
        d.rounded_rectangle([110, y + 70, 110 + int(1020 * frac), y + 92], radius=11, fill=ORANGE)
        y += 200
    d.line([110, 1440, 1130, 1440], fill=RULE, width=3)
    d.text((110, 1480), "Calculated from 2025 energy invoices", font=inter(28), fill=SOFT)
    d.text((110, 1530), "GHG Protocol · location-based", font=inter(28), fill=SOFT)
    im.resize((cw, ch)).save(os.path.join(OUT, "scope_card.png"))


def folder_label():
    im = Image.new("RGB", (800, 220), (240, 236, 226))
    d = ImageDraw.Draw(im)
    d.text((50, 40), "Evidence", font=didot(110), fill=INK)
    d.rectangle([0, 0, 22, 220], fill=ORANGE)
    im.save(os.path.join(OUT, "folder_label.png"))


def clock_face():
    s = 1024
    im = Image.new("RGB", (s, s), (236, 232, 222))
    d = ImageDraw.Draw(im)
    c = s / 2
    for i in range(60):
        a = math.radians(i * 6)
        r1 = 440 if i % 5 else 405
        d.line([c + math.sin(a) * r1, c - math.cos(a) * r1, c + math.sin(a) * 470, c - math.cos(a) * 470],
               fill=INK, width=10 if i % 5 == 0 else 4)
    for n, a in [(12, 0), (3, 90), (6, 180), (9, 270)]:
        r = 330
        x, y = c + math.sin(math.radians(a)) * r, c - math.cos(math.radians(a)) * r
        d.text((x, y), str(n), font=didot(120), fill=INK, anchor="mm")
    d.text((c, c + 150), "evipace", font=didot(40), fill=SOFT, anchor="mm")
    im.save(os.path.join(OUT, "clock_face.png"))


def wood():
    """Dark walnut top, 4096 wide so the close-ups stay crisp."""
    import numpy as np
    w, h = 4096, 2048
    r = np.random.default_rng(3)
    y = np.arange(h)[:, None].astype(np.float32)
    x = np.arange(w)[None, :].astype(np.float32)
    drift = np.cumsum(r.uniform(-0.6, 0.6, h)).astype(np.float32)[:, None]
    v = (0.5 + 0.22 * np.sin(y * 0.045 + np.sin(x * 0.0012 + 1.3) * 3.2 + drift * 0.02)
         + 0.12 * np.sin(y * 0.31 + np.sin(x * 0.004 + 4.1) * 1.6)
         + 0.06 * np.sin(y * 1.7 + x * 0.002))
    n = r.normal(0, 1, (h, w // 8)).astype(np.float32)
    n = np.repeat(n, 8, axis=1)
    v = np.clip(v + n * 0.05, 0, 1)
    base = Image.fromarray((v * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.0))
    dark, light = (34, 20, 12), (92, 58, 36)
    im = Image.merge("RGB", [base.point(lambda q, a=a, b=b: int(a + (b - a) * q / 255)) for a, b in zip(dark, light)])
    im.save(os.path.join(OUT, "wood.jpg"), quality=92)


# --------------------------------------------------------------------------
# Laptop screen, one PNG per video frame
# --------------------------------------------------------------------------
SW, SH = 1440, 900


def ease(x):
    x = max(0.0, min(1.0, x))
    return 1 - (1 - x) ** 3


def ease_io(x):
    x = max(0.0, min(1.0, x))
    return x * x * (3 - 2 * x)


def mail_ui(d, approved=False):
    d.rectangle([0, 0, SW, SH], fill=(24, 28, 31))
    d.rectangle([0, 0, 280, SH], fill=(18, 21, 24))
    d.text((40, 52), "Inbox", font=inter(30, "SemiBold"), fill=(230, 232, 230))
    for i, label in enumerate(["Inbox", "Flagged", "Sent", "Drafts", "Archive"]):
        y = 130 + i * 54
        if i == 0:
            d.rounded_rectangle([20, y - 12, 260, y + 34], radius=10, fill=(40, 46, 50))
        d.text((44, y), label, font=inter(22), fill=(180, 186, 184))
    # message list
    for i in range(9):
        y = 40 + i * 96
        d.line([300, y + 92, 780, y + 92], fill=(38, 43, 47), width=2)
        d.ellipse([320, y + 26, 350, y + 56], fill=(60, 68, 72) if i else ORANGE)
        d.rounded_rectangle([370, y + 26, 370 + rng_widths[i][0], y + 40], radius=7, fill=(150, 156, 154))
        d.rounded_rectangle([370, y + 54, 370 + rng_widths[i][1], y + 64], radius=5, fill=(78, 86, 90))
    if approved:
        d.rectangle([790, 0, SW, SH], fill=(30, 35, 38))
        d.text((850, 90), "Re: Supplier ESG questionnaire", font=inter(34, "SemiBold"), fill=(236, 238, 236))
        d.text((850, 146), "Procurement · 09:01", font=inter(22), fill=(140, 148, 146))
        cx, cy = 1110, 420
        d.ellipse([cx - 92, cy - 92, cx + 92, cy + 92], fill=ORANGE)
        d.line([cx - 42, cy + 2, cx - 10, cy + 36, cx + 48, cy - 34], fill=(255, 255, 255), width=18, joint="curve")
        d.text((cx, 580), "Approved", font=didot(76), fill=(244, 242, 236), anchor="mm")
        d.text((cx, 660), "Thank you — your responses have", font=inter(26), fill=(178, 184, 182), anchor="mm")
        d.text((cx, 698), "been reviewed and approved.", font=inter(26), fill=(178, 184, 182), anchor="mm")
    else:
        d.rectangle([790, 0, SW, SH], fill=(28, 32, 35))
        for y in range(120, 820, 44):
            d.rounded_rectangle([850, y, 850 + rng.randint(260, 520), y + 12], radius=6, fill=(48, 54, 58))


rng_widths = [(rng.randint(180, 330), rng.randint(220, 380)) for _ in range(9)]


def toast(im, x, y, title, body, glow):
    w, h = 600, 118
    layer = Image.new("RGBA", im.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rounded_rectangle([x + 4, y + 10, x + w + 4, y + h + 14], radius=22, fill=(0, 0, 0, 120))
    layer = layer.filter(ImageFilter.GaussianBlur(10))
    d = ImageDraw.Draw(layer)
    d.rounded_rectangle([x, y, x + w, y + h], radius=22, fill=(56 + glow, 63 + glow, 68 + glow, 250))
    d.rounded_rectangle([x + 24, y + 26, x + 76, y + 78], radius=12, fill=ORANGE if title != "Reminder" else (214, 72, 52))
    d.text((x + 50, y + 52), "@" if title != "Reminder" else "!", font=inter(28, "Bold"), fill=(255, 255, 255), anchor="mm")
    d.text((x + 98, y + 24), title, font=inter(24, "SemiBold"), fill=(244, 246, 244))
    d.text((x + w - 24, y + 26), "now", font=inter(20), fill=(160, 166, 164), anchor="ra")
    d.text((x + 98, y + 62), body, font=inter(23), fill=(214, 218, 216))
    im.alpha_composite(layer)


def browser(im, t):
    d = ImageDraw.Draw(im)
    d.rectangle([0, 0, SW, SH], fill=(248, 248, 246))
    d.rectangle([0, 0, SW, 64], fill=(232, 232, 228))
    d.rounded_rectangle([300, 14, 1140, 50], radius=18, fill=(255, 255, 255))
    d.text((330, 22), "evipace.com/en/send-request", font=inter(20), fill=(90, 96, 94))
    for i, c in enumerate([(236, 106, 94), (242, 190, 80), (98, 196, 110)]):
        d.ellipse([28 + i * 30, 24, 44 + i * 30, 40], fill=c)
    # page
    d.text((120, 130), "evipace", font=didot(40), fill=INK)
    d.text((120, 210), "Send your ESG request", font=didot(76), fill=INK)
    d.text((122, 316), "Forward the request as you received it. We take it from there.", font=inter(24), fill=SOFT)
    fields = [("Request type", "Customer ESG questionnaire"), ("Deadline", "Friday, 17 October"),
              ("Attachments", "questionnaire.xlsx · invoices_2025.pdf")]
    y = 390
    for label, val in fields:
        d.text((122, y), label, font=inter(20, "Medium"), fill=SOFT)
        d.rounded_rectangle([120, y + 30, 760, y + 84], radius=10, fill=(255, 255, 255), outline=(214, 214, 208), width=2)
        d.text((142, y + 44), val, font=inter(23), fill=INK)
        y += 108
    # button
    bx, by, bw, bh = 120, 720, 440, 86
    pressed = CLICK_AT <= t < SENT_AT
    sent = t >= SENT_AT
    col = (226, 96, 0) if pressed else ORANGE
    if sent:
        k = ease((t - SENT_AT) / 0.6)
        glow = Image.new("RGBA", im.size, (0, 0, 0, 0))
        ImageDraw.Draw(glow).rounded_rectangle([bx - 30, by - 30, bx + bw + 30, by + bh + 30], radius=60,
                                               fill=(255, 130, 30, int(140 * (1 - k * 0.5))))
        im.alpha_composite(glow.filter(ImageFilter.GaussianBlur(24)))
        d = ImageDraw.Draw(im)
    inset = 4 if pressed else 0
    d.rounded_rectangle([bx + inset, by + inset, bx + bw - inset, by + bh - inset], radius=43, fill=col)
    label = "Request sent  ✓" if sent else "Send your ESG request"
    d.text((bx + bw / 2, by + bh / 2), label, font=inter(28, "SemiBold"), fill=(255, 255, 255), anchor="mm")
    # right column: what happens next
    d.text((900, 400), "What happens next", font=didot(40), fill=INK)
    for i, s in enumerate(["We review the request", "We prepare the answers", "You send them back"]):
        d.ellipse([900, 480 + i * 70, 930, 510 + i * 70], outline=ORANGE, width=3)
        d.text((950, 482 + i * 70), s, font=inter(24), fill=(70, 74, 76))
    # cursor
    p = ease_io((t - BROWSER_AT - 0.08) / 0.45)
    cx = 1000 + (bx + bw * 0.55 - 1000) * p
    cy = 860 + (by + bh * 0.55 - 860) * p
    cur = [(cx, cy), (cx, cy + 40), (cx + 11, cy + 30), (cx + 20, cy + 50), (cx + 28, cy + 46),
           (cx + 19, cy + 27), (cx + 33, cy + 27)]
    d.polygon(cur, fill=(16, 16, 16), outline=(255, 255, 255))
    if CLICK_AT <= t < CLICK_AT + 0.35:
        r = 10 + 60 * ease((t - CLICK_AT) / 0.35)
        a = int(200 * (1 - (t - CLICK_AT) / 0.35))
        ring = Image.new("RGBA", im.size, (0, 0, 0, 0))
        ImageDraw.Draw(ring).ellipse([cx - r, cy - r, cx + r, cy + r], outline=(255, 140, 40, a), width=5)
        im.alpha_composite(ring)


def screen_frame(i):
    t = (i - 1) / FPS
    im = Image.new("RGBA", (SW, SH))
    if BROWSER_AT <= t < APPROVED_AT:
        browser(im, t)
    else:
        mail_ui(ImageDraw.Draw(im), approved=t >= APPROVED_AT)
        if t < BROWSER_AT:
            shown = [x for x in TOASTS if x[0] <= t]
            # newest on top; older ones slide down as new arrive
            y = 36
            for k, (t0, title, body) in enumerate(reversed(shown)):
                slide = ease((t - t0) / 0.38)
                x = SW - 640 + (1 - slide) * 680
                glow = int(30 * max(0, 1 - (t - t0) / 0.5))
                toast(im, int(x), int(y), title, body, glow)
                y += int(138 * (ease((t - t0) / 0.3) if k == 0 else 1))
    im.convert("RGB").save(os.path.join(OUT, "screen", f"screen_{i:04d}.png"), compress_level=1)


if __name__ == "__main__":
    what = sys.argv[1:] or ["docs", "screen", "wood"]
    if "docs" in what:
        invoice("invoice_power", "NORTHGRID ENERGY", "Electricity invoice",
                [("Meter point", "AT 0019 4410 22"), ("Consumption", "48,210 kWh"), ("Unit price", "€0.184"),
                 ("Network fees", "€1,912.40"), ("Taxes", "€2,214.15")], "€ 13,996.05")
        invoice("invoice_gas", "ALPENGAS", "Natural gas statement",
                [("Supply point", "GS-7781-03"), ("Consumption", "12,400 m³"), ("Energy", "131,440 kWh"),
                 ("Unit price", "€0.071"), ("Taxes", "€1,866.70")], "€ 11,198.94")
        invoice("invoice_fuel", "ROUTE FUEL CARD", "Fuel card statement",
                [("Vehicles", "6"), ("Diesel", "3,850 L"), ("Petrol", "410 L"), ("Unit price", "€1.62"),
                 ("Card fees", "€48.00")], "€ 6,949.20")
        spreadsheet("sheet_a", "Energy_2025_final_v3.xlsx")
        spreadsheet("sheet_b", "Fleet_fuel_2025.xlsx")
        letter("request", "FROM: PROCUREMENT · TO: SUPPLIERS", "ESG questionnaire",
               [900, 980, 860, 940, 620, 0, 900, 960, 880, 420, 0, 800, 520])
        letter("cert", "CERTIFICATE", "ISO 14001", [700, 820, 640, 0, 880, 760], stamp="CERTIFIED")
        letter("contract", "WASTE MANAGEMENT", "Service contract", [900, 960, 880, 940, 700, 0, 880, 800, 600])
        boxes = questionnaire()
        policy()
        scope_card()
        folder_label()
        clock_face()
        paper().save(os.path.join(OUT, "blank.png"))
        with open(os.path.join(OUT, "boxes.json"), "w") as f:
            json.dump(boxes, f)
        print("docs done")
    if "wood" in what:
        wood()
        print("wood done")
    if "screen" in what:
        for i in range(1, FRAMES + 1):
            screen_frame(i)
        print("screen done")
