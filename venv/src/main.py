# This game was originally created by Benjibyte.
# This is a very very late Christmas present for his Sister and her daughters.
# Date of Program Creation: 3/13/26 m/dd/yy

# See development log at /venv/logs/<date>.txt

import pygame
import random
import time

from card import *
from config import *
from board import *

WIDTH = 320
HEIGHT = 180
BOARD_SIZE = 16



pygame.init()
screen = pygame.display.set_mode((WIDTH, HEIGHT), pygame.SCALED)
clock = pygame.time.Clock()
running = True

# Load Pixel art graphics
background = pygame.image.load(BACKGROUND_SPRITE)


coop = Board(16, (131,61))
coop.setup_cards()
cards_flipped = 0
cards_flipped_for_match = 2

while running:
    # Check for events
    for event in pygame.event.get():

        # QUIT event
        if event.type == pygame.QUIT:
            running = False

        # When the Player clicks or taps the screen
        #if event.type == pygame.MOUSEBUTTONDOWN:


    # Screen background
    screen.fill("black")
    screen.blit(background)
    for chicken in coop.get_cards():
        screen.blit(source=chicken.render(), dest=chicken.get_pos())

    # detect click on a specific chicken
    for chicken in coop.get_cards():
        match_type = chicken.get_face()
        if chicken.is_clicked() == True:
            # Check for the amount of chicken cards flipped over,
            print(match_type)
            if cards_flipped == (cards_flipped_for_match - 1):
                print(f"Cards flipped: {cards_flipped}")
                
                

    pygame.display.flip()
    clock.tick(60)

pygame.quit()
