# This game was originally created by Benjibyte.
# This is a very very late Christmas present for his Sister and her daughters.
# Date of Program Creation: 3/13/26 m/dd/yy

# See development log at /venv/logs/<date>.txt

import pygame
import random

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
        if chicken.is_clicked() == True:
            # Check for the amount of chicken cards flipped over,

            if cards_flipped == (cards_flipped_for_match - 1):
                match_type = chicken.get_face()
            # If there isn't a match then simply use the flip_card() method
            # to flip the card, and then increase the amount of flipped cards count.
            #
            # If there is one less than the amount of cards needed to check for a match (in my case 1, for a 2-card-match)
            # then check if they are a match:
                # If Match --> Play the Rooster Crow sound and trigger
                #  match_found(*the kind of match, *what chickens need to disapear etc)
                # If not Match --> play the sad cluck cluck sound


    pygame.display.flip()
    clock.tick(60)

pygame.quit()
