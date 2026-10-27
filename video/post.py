"""Grade the Blender frames, add grain, vignette and the Didot titles.

Run: python3 video/post.py [first last]   reads out/frames, writes out/final
"""

import os
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import timeline as TL  # noqa: E402

SRC = os.path.join(HERE, "out", "frames")
DST = os.path.join(HERE, "out", "final")
os.makedirs(DST, exist_ok=True)
S = 1080
DIDOT = os.path.join(HERE, "assets", "GFSDidot-Regular.ttf")
INTER = os.path.expanduser("~/Library/Fonts/Inter-Medium.otf")
CREAM = (244, 240, 230)
ORANGE = (255, 111, 0)


def clamp01(x):
    return max(0.0, min(1.0, x))


def ease(x):
    x = clamp01(x)
    return 1 - (1 - x) ** 3


def smooth(x):
    x = clamp01(x)
    return x * x * (3 - 2 * x)


# ---------------------------------------------------------------- grade
yy, xx = np.mgrid[0:S, 0:S].astype(np.float32)
r = np.sqrt((xx - S / 2) ** 2 + (yy - S / 2) ** 2) / (S * 0.72)
VIGNETTE = (1 - 0.42 * np.clip(r, 0, 1) ** 2.2)[..., None]


def grade(a):
    """a: float32 0..1. Deeper blacks, cool shadows, warm highlights."""
    lum = a.mean(axis=2, keepdims=True)
    a = np.clip((a - 0.01) / 0.99, 0, 1)
    a = a ** 1.08
    shadow = np.clip(1 - lum * 3, 0, 1)
    a = a + shadow * np.array([-0.006, 0.002, 0.012], np.float32)
    high = np.clip(lum * 2 - 0.9, 0, 1)
    a = a + high * np.array([0.02, 0.004, -0.02], np.float32)
    return np.clip(a * VIGNETTE, 0, 1)


rng = np.random.default_rng(5)


def grain(a, i):
    g = rng.normal(0, 1, (S // 2, S // 2)).astype(np.float32)
    g = np.array(Image.fromarray(g).resize((S, S), Image.BILINEAR))[..., None]
    lum = a.mean(axis=2, keepdims=True)
    amp = 0.022 * (0.4 + 0.6 * (1 - np.abs(lum - 0.35) * 1.6).clip(0, 1))
    return np.clip(a + g * amp, 0, 1)


# ---------------------------------------------------------------- titles
def font(size):
    return ImageFont.truetype(DIDOT, size)


def title(im, text, cx, cy, size, alpha, rise=0.0, track=0.0, color=CREAM, shadow=True):
    """Centered Didot text with per-letter tracking and a soft shadow."""
    if alpha <= 0:
        return
    f = font(size)
    widths = [f.getlength(ch) for ch in text]
    sp = track * size
    total = sum(widths) + sp * (len(text) - 1)
    layer = Image.new("RGBA", im.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    x = cx - total / 2
    y = cy + rise
    for ch, w in zip(text, widths):
        col = ORANGE if (ch == "." and color == CREAM and text.endswith(".") and x > cx + total / 2 - w - 2) else color
        d.text((x, y), ch, font=f, fill=(*col, int(255 * alpha)), anchor="lm")
        x += w + sp
    if shadow:
        sh = Image.new("RGBA", im.size, (0, 0, 0, 0))
        sh.putalpha(layer.getchannel("A").filter(ImageFilter.GaussianBlur(size * 0.18)).point(lambda v: int(v * 0.7)))
        im.alpha_composite(sh)
    im.alpha_composite(layer)


def light_logo():
    src = Image.open(os.path.join(HERE, "..", "public", "images", "brand", "evipace-logo.png")).convert("RGBA")
    src = src.crop(src.getbbox())
    a = np.array(src).astype(np.float32)
    rgb = a[..., :3]
    orange = (rgb[..., 0] - rgb[..., 2]) > 90
    out = a.copy()
    out[..., :3] = np.where(orange[..., None], rgb, np.array(CREAM, np.float32))
    return Image.fromarray(out.astype(np.uint8))


LOGO = light_logo()
LOGO_W = 400
LOGO = LOGO.resize((LOGO_W, int(LOGO.height * LOGO_W / LOGO.width)), Image.LANCZOS)


def small_caps(im, text, cx, cy, alpha):
    f = ImageFont.truetype(INTER, 22)
    layer = Image.new("RGBA", im.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    sp = 6
    widths = [f.getlength(c) for c in text]
    x = cx - (sum(widths) + sp * (len(text) - 1)) / 2
    for c, w in zip(text, widths):
        d.text((x, cy), c, font=f, fill=(*CREAM, int(200 * alpha)), anchor="lm")
        x += w + sp
    im.alpha_composite(layer)


P = TL.PHRASES
END_BLUR_AT = P["done_right"][0] - 0.45   # dawn stays sharp under the first line
TOP_SHADE_AT = P["esg_work"][0] - 0.3
yy_, _ = np.mgrid[0:S, 0:S].astype(np.float32) / S
TOP_SHADE = np.clip(1 - (yy_ - 0.18) / 0.45, 0, 1)[..., None] ** 1.5


def frame_image(i):
    t = (i - 1) / TL.FPS
    im = Image.open(os.path.join(SRC, f"f_{i:04d}.png")).convert("RGB")

    # end card: defocus and darken the dawn shot under the tagline
    k = smooth((t - END_BLUR_AT) / 0.9)
    if k > 0:
        im = im.filter(ImageFilter.GaussianBlur(16 * k))
    a = np.asarray(im).astype(np.float32) / 255
    a = grade(a)
    ks = smooth((t - TOP_SHADE_AT) / 0.6)
    if ks > 0:
        a = a * (1 - 0.6 * ks * TOP_SHADE * (1 - k))
    if k > 0:
        a = a * (1 - 0.72 * k)
    # open from black, close to black
    a = a * smooth(t / 0.35) * (1 - smooth((t - (TL.DURATION - 0.35)) / 0.35))
    a = grain(a, i)
    out = Image.fromarray((a * 255).astype(np.uint8)).convert("RGBA")

    # "Send it to Evipace."
    t0, t1 = P["send_it"][0] - 0.1, 9.05
    if t0 <= t <= t1 + 0.4:
        al = ease((t - t0) / 0.55) * (1 - smooth((t - t1) / 0.4))
        title(out, "Send it to Evipace.", S / 2, S * 0.80, 60, al, rise=10 * (1 - ease((t - t0) / 0.8)),
              track=0.02 + 0.03 * ease((t - t0) / 2.0))

    # tagline
    lines = [("ESG work.", P["esg_work"][0] - 0.05), ("Done right.", P["done_right"][0] - 0.05),
             ("Done faster.", P["done_faster"][0] - 0.05)]
    for n, (txt, ts) in enumerate(lines):
        if t >= ts:
            al = ease((t - ts) / 0.6)
            title(out, txt, S / 2, 350 + n * 104, 84, al, rise=14 * (1 - ease((t - ts) / 0.9)), track=0.02)
    tl = P["done_faster"][0] + 0.35
    if t >= tl:
        al = ease((t - tl) / 0.8)
        logo = LOGO.copy()
        logo.putalpha(logo.getchannel("A").point(lambda v: int(v * al)))
        out.alpha_composite(logo, (int(S / 2 - LOGO.width / 2), int(700 + 10 * (1 - al))))
        small_caps(out, "EVIPACE.COM", S / 2, 700 + LOGO.height + 46, ease((t - tl - 0.3) / 0.8))
    out.convert("RGB").save(os.path.join(DST, f"p_{i:04d}.png"), compress_level=1)


if __name__ == "__main__":
    a = int(sys.argv[1]) if len(sys.argv) > 1 else 1
    b = int(sys.argv[2]) if len(sys.argv) > 2 else TL.FRAMES
    for i in range(a, b + 1):
        if os.path.exists(os.path.join(SRC, f"f_{i:04d}.png")):
            frame_image(i)
    print("post done", a, b)
