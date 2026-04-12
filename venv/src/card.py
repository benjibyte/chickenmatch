# Chickens are cards... The matching symbol are eggs.
# However, to help me remember what role they play--I will rename/rework the code
# to cover this structure "card.py"
from config import *

import pygame
import os
import random
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

    def choose_face_type(self):
        chosen_index = random.randit(0,CARD_FACE_TYPE.length)
        face_type = CARD_FACE_TYPE[]
        return face_type


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

    def is_clicked(self):

        # Trigger when mouse click event happens in one frame
        if pygame.mouse.get_just_pressed()[0]:
            # Compare cordinates of mouse with the X and Y of this Card
            mouse_pos = pygame.mouse.get_pos()
            if (mouse_pos[0] > self.x) and (mouse_pos[0] < (self.x + CARD_SIZE)):
                if (mouse_pos[1] > self.y) and (mouse_pos[1] < (self.y + CARD_SIZE)):
                    print(f"LMB just pressed on {self.name}")
                    return True

            return False

    def get_face(self):
        return self.card_face
