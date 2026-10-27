"""Synthesize the sound design and mix it under the voice.

Run: python3 video/sfx.py  -> out/sfx.wav (effects only) and out/mix.wav
"""

import os
import subprocess
import sys
import wave

import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import timeline as TL  # noqa: E402

SR = 48000
N = int(TL.DURATION * SR)
rng = np.random.default_rng(21)
OUT = os.path.join(HERE, "out")


def t_axis(dur):
    return np.arange(int(dur * SR)) / SR


def env(dur, attack, decay_tau):
    t = t_axis(dur)
    a = np.clip(t / max(attack, 1e-4), 0, 1)
    return a * np.exp(-np.maximum(t - attack, 0) / decay_tau)


def onepole_lp(x, fc):
    a = np.exp(-2 * np.pi * fc / SR)
    y = np.empty_like(x)
    acc = 0.0
    for i, v in enumerate(x):
        acc = (1 - a) * v + a * acc
        y[i] = acc
    return y


def lp(x, fc):
    """Fast FFT low-pass with a soft knee."""
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    X *= 1 / np.sqrt(1 + (f / fc) ** 4)
    return np.fft.irfft(X, len(x))


def bp(x, lo, hi):
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    X *= (1 / np.sqrt(1 + (lo / np.maximum(f, 1)) ** 4)) * (1 / np.sqrt(1 + (f / hi) ** 4))
    return np.fft.irfft(X, len(x))


def noise(dur):
    return rng.normal(0, 1, int(dur * SR))


L = np.zeros(N)
Rch = np.zeros(N)


def place(sig, t, gain=1.0, pan=0.0):
    i = int(t * SR)
    if i >= N:
        return
    sig = sig[: N - i] * gain
    L[i:i + len(sig)] += sig * np.sqrt(0.5 * (1 - pan))
    Rch[i:i + len(sig)] += sig * np.sqrt(0.5 * (1 + pan))


def db(x):
    return 10 ** (x / 20)


# ------------------------------------------------------------- sources
def click(bright=4000, dur=0.03):
    s = bp(noise(dur), bright * 0.5, bright * 1.5) * env(dur, 0.0005, 0.004)
    return s / np.abs(s).max()


def tick():
    s = bp(noise(0.04), 2500, 7000) * env(0.04, 0.0003, 0.003)
    s += np.sin(2 * np.pi * 3100 * t_axis(0.04)) * env(0.04, 0.0003, 0.006) * 0.4
    return s / np.abs(s).max()


def ping(f0):
    t = t_axis(1.2)
    s = (np.sin(2 * np.pi * f0 * t) + 0.35 * np.sin(2 * np.pi * f0 * 2.01 * t)
         + 0.15 * np.sin(2 * np.pi * f0 * 3.02 * t)) * env(1.2, 0.004, 0.28)
    t2 = t_axis(1.2)
    s2 = np.sin(2 * np.pi * f0 * 1.5 * t2) * env(1.2, 0.004, 0.3)
    s2 = np.concatenate([np.zeros(int(0.09 * SR)), s2])[: len(s)]
    return (s + 0.8 * s2) / 2.2


def thump(f0=55, dur=0.6, tau=0.12):
    t = t_axis(dur)
    f = f0 * (1 + 1.5 * np.exp(-t / 0.03))
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * env(dur, 0.002, tau)


def rustle(dur, lo=1800, hi=7000, flutter=14):
    t = t_axis(dur)
    am = np.clip(0.5 + 0.5 * np.sin(2 * np.pi * flutter * t + rng.uniform(0, 6)) + rng.normal(0, 0.25, len(t)), 0, 1)
    am = lp(am, 40)
    s = bp(noise(dur), lo, hi) * am * np.sin(np.pi * np.clip(t / dur, 0, 1))
    return s / (np.abs(s).max() + 1e-9)


def whoosh(dur, lo=200, hi=2500, peak=0.6):
    t = t_axis(dur)
    s = bp(noise(dur), lo, hi)
    shape = np.where(t < dur * peak, (t / (dur * peak)) ** 2, np.exp(-(t - dur * peak) / (dur * 0.15)))
    s = s * shape
    return s / np.abs(s).max()


def pad(freqs, dur, attack=1.5, release=2.0):
    t = t_axis(dur)
    s = np.zeros(len(t))
    for k, f in enumerate(freqs):
        for det in (-0.12, 0.0, 0.13):
            s += np.sin(2 * np.pi * f * (1 + det / 100) * t + rng.uniform(0, 6)) / (1 + k * 0.4)
    s = lp(s, 1400)
    e = np.clip(t / attack, 0, 1) ** 2 * np.clip((dur - t) / release, 0, 1)
    return s * e / np.abs(s).max()


def chirp():
    d = 0.09
    t = t_axis(d)
    f = 3600 + 1400 * np.sin(np.pi * t / d) + rng.uniform(-300, 300)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / d) ** 2


# ------------------------------------------------------------- score
P = TL.PHRASES

# room tone
room = lp(noise(TL.DURATION), 180)
room /= np.abs(room).max()
place(room, 0, db(-40))
place(room[::-1].copy(), 0, db(-40), pan=0.6)

# night tension drone, cut dead before the click
dur = 6.28
t = t_axis(dur)
drone = (np.sin(2 * np.pi * 55 * t) + 0.7 * np.sin(2 * np.pi * 58.3 * t) + 0.25 * np.sin(2 * np.pi * 110.4 * t))
drone += 0.6 * lp(noise(dur), 260)
drone *= np.clip(t / 1.5, 0, 1) * (0.35 + 0.65 * (t / dur) ** 2)
drone *= np.clip((dur - t) / 0.03, 0, 1)
place(drone / np.abs(drone).max(), 0, db(-21))
riser = whoosh(1.4, 300, 5000, peak=0.98) * np.clip((1.4 - t_axis(1.4)) / 0.02, 0, 1)
place(riser, 6.28 - 1.4, db(-22))

# lamp
place(click(2500, 0.03), TL.LAMP_ON - 0.02, db(-12), pan=-0.4)
place(click(1800, 0.03), TL.LAMP_ON + 0.035, db(-16), pan=-0.4)
hum_t = t_axis(13.9 - TL.LAMP_ON)
hum = (np.sin(2 * np.pi * 100 * hum_t) + 0.3 * np.sin(2 * np.pi * 200 * hum_t)) * np.clip(hum_t / 0.3, 0, 1)
place(hum, TL.LAMP_ON, db(-46), pan=-0.4)

# clock ticks
for s in range(0, 7):
    g = db(-30) if s < 5 else db(-20)
    place(tick(), float(s) + 0.02, g, pan=0.5)
tt = 9.4
k = 0
while tt < 13.4:
    place(tick(), tt, db(-33), pan=0.5)
    rate = 2 + 22 * np.sin(np.pi * (tt - 9.4) / 4.0)
    tt += 1 / rate
    k += 1

# notifications
for n, (tt, _, _) in enumerate(TL.TOASTS):
    place(ping(1318.5 * (1 if n % 2 == 0 else 1.122)), tt, db(-19 + n * 0.8), pan=0.25)

# mouse click and "sent"
place(click(5000, 0.02), TL.CLICK_AT, db(-10), pan=0.1)
place(click(3000, 0.02), TL.CLICK_AT + 0.07, db(-16), pan=0.1)
place(ping(987.8) * 0.7, TL.SENT_AT, db(-24))

# the turn: warm low boom and a pad that carries to the end
place(thump(42, 2.5, 0.9), TL.WARM_START - 0.05, db(-9))
place(whoosh(1.2, 80, 900, 0.1), TL.WARM_START - 0.05, db(-24))
pad_dur = TL.DURATION - TL.WARM_START
warm = pad([73.4, 110, 146.8, 185, 220, 293.7], pad_dur, attack=1.8, release=1.2)
swell = np.interp(t_axis(pad_dur), [0, 3, 6.5, 7.6, 10.5, pad_dur], [0.55, 0.7, 0.85, 1.0, 1.0, 0.8])
place(warm * swell, TL.WARM_START, db(-21))
air = pad([587.3, 740, 880], pad_dur, attack=4, release=1.5)
place(air * np.interp(t_axis(pad_dur), [0, 6, 8, pad_dur], [0, 0.4, 1, 1]), TL.WARM_START, db(-33), pan=-0.3)

# papers lifting and flying
for n in range(12):
    tt = TL.LIFT_START + n * 0.07 + rng.uniform(-0.02, 0.05)
    place(rustle(rng.uniform(0.35, 0.7)), tt, db(-25 - rng.uniform(0, 4)), pan=rng.uniform(-0.7, 0.7))
place(whoosh(1.6, 150, 1800, 0.4), TL.LIFT_START, db(-23))
place(whoosh(1.0, 300, 3000, 0.5), 10.2, db(-28), pan=-0.4)
for land in [10.62, 10.70, 10.80, 10.84, 10.90, 11.00, 11.08, 12.02, 12.16, 12.30]:
    s = lp(noise(0.12), 900) * env(0.12, 0.002, 0.02)
    place(s / np.abs(s).max(), land, db(-22), pan=rng.uniform(-0.4, 0.4))
    place(rustle(0.12, 2500, 8000), land - 0.02, db(-32))
# folder arrives
place(whoosh(0.7, 120, 1500, 0.8), 10.3, db(-27))
# Scope card lands on "emissions"
t_em = P["emissions"][0]
place(thump(70, 0.5, 0.08), t_em + 0.2, db(-14))
place(lp(noise(0.08), 1500) * env(0.08, 0.001, 0.015), t_em + 0.2, db(-18))
# folder closes on "evidence"
t_ev = P["evidence"][0]
place(whoosh(0.35, 300, 2500, 0.8), t_ev, db(-24))
place(thump(85, 0.4, 0.06), t_ev + 0.33, db(-15))
# check marks
for i in range(8):
    tt = P["answers"][0] - 0.12 + i * 0.075 + 0.06
    s = np.sin(2 * np.pi * (1800 + i * 90) * t_axis(0.08)) * env(0.08, 0.001, 0.012)
    place(s, tt, db(-25), pan=0.3)

# dawn
for n in range(6):
    tt = 13.6 + n * rng.uniform(0.25, 0.55)
    for m in range(rng.integers(2, 4)):
        place(chirp(), tt + m * 0.13, db(-37), pan=0.7)
place(whoosh(1.6, 100, 1200, 0.6), TL.DAWN_START, db(-30), pan=0.5)

# tagline + logo
place(thump(48, 2.2, 0.7), P["esg_work"][0] - 0.05, db(-20))
place(thump(46, 3.0, 1.0), P["done_faster"][0] + 0.32, db(-13))
sh = pad([1174.7, 1480, 1760, 2349], 2.4, attack=0.05, release=2.2)
place(sh, P["done_faster"][0] + 0.32, db(-31))

mix = np.stack([L, Rch], axis=1)
mix *= db(-1) / np.abs(mix).max()


def write(path, data):
    d = np.clip(data, -1, 1)
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((d * 32767).astype("<i2").tobytes())


write(os.path.join(OUT, "sfx.wav"), mix)

# voice: decode, offset, light compression via ffmpeg then mix
voice_wav = os.path.join(OUT, "voice_48k.wav")
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", os.path.join(HERE, "assets", "voice.mp3"),
                "-af", "acompressor=threshold=-20dB:ratio=2.5:attack=8:release=120,highpass=f=70,loudnorm=I=-16:TP=-2:LRA=7",
                "-ar", str(SR), "-ac", "2", voice_wav], check=True)
with wave.open(voice_wav) as w:
    v = np.frombuffer(w.readframes(w.getnframes()), "<i2").astype(np.float64).reshape(-1, 2) / 32767
voice = np.zeros_like(mix)
i0 = int(TL.VOICE_OFFSET * SR)
n = min(len(v), N - i0)
voice[i0:i0 + n] = v[:n]

# duck the effects slightly under the voice
venv = lp(np.abs(voice[:, 0]), 6)
venv /= venv.max()
duck = 1 - 0.35 * np.clip(venv * 3, 0, 1)
final = voice * db(-0.5) + mix * db(-5) * duck[:, None]
final *= db(-1) / np.abs(final).max()
write(os.path.join(OUT, "mix.wav"), final)
print("mix done")
