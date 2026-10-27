"""Shared timing for the Evipace ad. All times are video seconds.

The voice file starts VOICE_OFFSET seconds into the video; the phrase times
below were measured from the ElevenLabs take with ffmpeg silencedetect and
already include that offset.
"""

FPS = 30
DURATION = 20.0
FRAMES = int(DURATION * FPS)
VOICE_OFFSET = 0.7

V = VOICE_OFFSET
PHRASES = {
    "another_customer": (0.13 + V, 1.33 + V),
    "questionnaire": (1.84 + V, 3.72 + V),
    "deadline": (4.29 + V, 5.44 + V),
    "send_it": (6.46 + V, 7.78 + V),
    "we_turn": (8.53 + V, 10.52 + V),
    "emissions": (10.75 + V, 11.70 + V),
    "evidence": (11.90 + V, 12.46 + V),
    "answers": (12.61 + V, 13.41 + V),
    "esg_work": (14.20 + V, 15.49 + V),
    "done_right": (15.92 + V, 16.68 + V),
    "done_faster": (17.04 + V, 18.26 + V),
}

# Story beats
LAMP_ON = 0.32
TOASTS = [  # (time, title, body)
    (0.95, "Procurement", "ESG questionnaire — response due in 14 days"),
    (2.62, "EcoVadis", "Sustainability assessment: action required"),
    (3.22, "Customer request", "Scope 1 & 2 emissions data required"),
    (3.86, "Procurement", "Please share your sustainability policy"),
    (4.95, "Reminder", "Supplier ESG review — deadline Friday"),
]
BROWSER_AT = 6.05        # screen switches to evipace.com send-request page
CLICK_AT = 6.62          # cursor clicks "Send your ESG request"
SENT_AT = 6.84           # button turns into "Request sent"
WARM_START, WARM_END = 7.0, 8.2   # lamp turns Evipace orange
LIFT_START = 9.3         # papers lift off the pile
APPROVED_AT = 13.25      # customer's approval mail on screen
DAWN_START, DAWN_END = 13.3, 14.6

# Shots: (start, camera name)
SHOTS = [
    (0.0, "C1_desk"),
    (2.50, "C2_screen"),
    (5.00, "C3_clock"),
    (6.20, "C4_button"),
    (7.12, "C5_side"),
    (9.20, "C6_crane"),
    (11.30, "C7_scope"),
    (12.38, "C8_folder"),
    (13.18, "C9_answers"),
    (14.05, "C10_dawn"),
]


def frame(t):
    """Video second -> 1-based Blender frame."""
    return int(round(t * FPS)) + 1
