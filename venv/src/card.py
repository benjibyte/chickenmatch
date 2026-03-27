# Chickens are cards... The matching symbol are eggs.
# However, to help me remember what role they play--I will rename/rework the code
# to cover this structure "card.py"
from config import * 

import pygame
import os
# We are going to use this for filepath operations
# The eggs that the Chicken Cards will reveal will be based on how much
# egg asset files are in the assets directory. Borrowing the file structure
# spares extra work

 
# reveal_sprite = os.path.join( # The filepath for the )
class Card():
    def __init__(self, name, x ,y) -> None:
        self.name = name
        self.sprite = CARD_SPRITE
        self.hidden = False
        self.x = x
        self.y = y
        #Spawn
        self.surf = pygame.image.load(self.sprite)

    def render(self):
        return self.surf
        
    def set_sprite(self, sprite):
        self.sprite = sprite
    def get_pos(self):
        return (self.x, self.y)
    
    def hide(self):
        self.hidden = True

    def show(self):
        self.hidden = False
        set_sprite(CARD_SPRITE)
    

