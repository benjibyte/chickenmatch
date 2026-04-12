import os
import pygame
CUR_DIR = os.getcwd()
print(CUR_DIR)
SCALE = 4
CARD_SIZE = 16
SCREEN_OG_WIDTH = 320
SCREEN_OG_HEIGHT = 180
TOTAL_TILES = 16
GRID_SIZE = 4
CARD_FACE_TYPES = ["brown_egg", "white_egg", "green_egg", "cracked_egg", "mouse", "poop", "rotten_egg", "chick"]

# Load Art sprite filepaths
BACKGROUND_SPRITE = os.path.join(CUR_DIR, "assets/img/background.png")
CARD_SPRITE = os.path.join(CUR_DIR, "assets/img/chicken.png")
WHITE_EGG_SPRITE = os.path.join(CUR_DIR, "assets/img/white_egg.png")
BROWN_EGG_SPRITE = os.path.join(CUR_DIR, "assets/img/brown_egg.png")
GREEN_EGG_SPRITE = os.path.join(CUR_DIR, "assets/img/green_egg.png")
POOF_GIF_SPRITE = os.path.join(CUR_DIR, "assets/img/poof_animation/poof.gif") 

# Animation Sprite Frames
POOF_ANIMATION = pygame.image.load_animation(POOF_GIF_SPRITE)
