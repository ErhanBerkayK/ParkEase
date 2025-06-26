import cv2
import numpy as np
import time
from flask_cors import CORS
from flask import Flask, jsonify
from threading import Thread

app = Flask(__name__)
CORS(app)

parking_spots = [
    (17, 53, 58, 127),
    (64, 53, 115, 130),
    (126, 28, 174, 130),
    (187, 26, 242, 130),
    (247, 24, 294, 125),
    (303, 13, 352, 115),
    (362, 11, 413, 135),
    (426, 31, 477, 130),
    (489, 31, 540, 133),
    (547, 30, 591, 126),
    (604, 25, 653, 140),
    (670, 56, 690, 120),
    (729, 24, 764, 125),
    (4, 282, 47, 392),
    (56, 292, 104, 397),
    (112, 276, 161, 392),
    (175, 282, 223, 393),
    (229, 292, 280, 390),
    (352, 281, 403, 392),
    (413, 271, 460, 390),
    (467, 274, 522, 390),
    (532, 272, 582, 388),
    (592, 269, 647, 388),
    (654, 281, 700, 388),
    (712, 273, 762, 388),
]

cap = cv2.VideoCapture("/Users/bk/Desktop/ParkEase/parkease/src/videos/park_area_video.mp4")

detection_threshold = 700

latest_status = {
    "empty_count": 0,
    "empty_slots": []
}

def check_occupancy(spot_img):
    gray = cv2.cvtColor(spot_img, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (5, 5), 1)
    _, thresh = cv2.threshold(blur, 100, 255, cv2.THRESH_BINARY_INV)
    non_zero = cv2.countNonZero(thresh)
    return non_zero > detection_threshold

def process_video():
    global latest_status
    fps = cap.get(cv2.CAP_PROP_FPS)
    slowdown_factor = 4

    while True:
        success, frame = cap.read()
        if not success:
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
            continue

        empty_spots = 0
        empty_spot_locations = []

        for i, (x1, y1, x2, y2) in enumerate(parking_spots):
            spot_img = frame[y1:y2, x1:x2]
            occupied = check_occupancy(spot_img)

            if not occupied:
                empty_spots += 1
                empty_spot_locations.append(i + 1)

        latest_status = {
            "empty_count": empty_spots,
            "empty_slots": empty_spot_locations
        }

        time.sleep(1 / (fps / slowdown_factor))

@app.route('/status')
def status():
    return jsonify({
        "empty_count": latest_status["empty_count"],
        "empty_slots": latest_status["empty_slots"]
    })

if __name__ == '__main__':
    t = Thread(target=process_video, daemon=True)
    t.start()
    app.run(host='0.0.0.0', port=5050, debug=False)