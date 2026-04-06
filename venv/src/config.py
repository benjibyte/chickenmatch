import os
CUR_DIR = os.getcwd()
print(CUR_DIR)
SCALE = 4
CARD_SIZE = 16
SCREEN_OG_WIDTH = 320
SCREEN_OG_HEIGHT = 180
TOTAL_TILES = 16
GRID_SIZE = 4

# Load Art sprite filepaths
BACKGROUND_SPRITE = os.path.join(CUR_DIR, "assets/img/background.png")
CARD_SPRITE = os.path.join(CUR_DIR, "assets/img/chicken.png")
WHITE_EGG_SPRITE = os.path.join(CUR_DIR, "assets/img/white_egg.png")
BROWN_EGG_SPRITE = os.path.join(CUR_DIR, "assets/img/brown_egg.png")
GREEN_EGG_SPRITE = os.path.join(CUR_DUR, "assets/img/green_egg.png")

# Animation Sprite Frames
POOF_1 = os.path.join(CUR_DIR, "assets/img/poof_animation/poof_frame1.png")
POOF_2 = os.path.join(CUR_DIR, "assets/img/poof_animation/poof_frame2.png")
POOF_3 = os.path.join(CUR_DIR, "assets/img/poof_animation/poof_frame3.png")
POOF_4 = os.path.join(CUR_DIR, "assets/img/poof_animation/poof_frame4.png")
POOF_5 = os.path.join(CUR_DIR, "assets/img/poof_animation/poof_frame5.png")
POOF_6 = os.path.join(CUR_DIR, "assets/img/poof_animation/poof_frame6.png")
POOF_7 = os.path.join(CUR_DIR, "assets/img/poof_animation/poof_frame7.png")
POOF_8 = os.path.join(CUR_DIR, "assets/img/poof_animation/poof_frame8.png")

POOF_ANIMATION = [POOF_1, POOF_2, POOF_3, POOF_4,
                POOF_5, POOF_6, POOF_7, POOF_8]
