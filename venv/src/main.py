# This game was originally created by Benjibyte.
# This is a very very late Christmas present for his Sister and her daughters.
# Date of Program Creation: 3/13/26 m/dd/yy

# See development log at /venv/logs/<date>.txt

import pygame
import random

from card import *
from config import *

WIDTH = 320
HEIGHT = 180
BOARD_SIZE = 9



pygame.init()
screen = pygame.display.set_mode((WIDTH, HEIGHT), pygame.SCALED)
clock = pygame.time.Clock()
running = True

# Load Pixel art graphics
background = pygame.image.load(BACKGROUND_SPRITE)


# Create Coop
chicken = Card("robert", 160, 90)


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

    # Render the next game frame here
    screen.blit(chicken.render())

    pygame.display.flip()
    clock.tick(60)

pygame.quit()
