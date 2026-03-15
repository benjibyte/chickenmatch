# Chickens are cards... The matching symbol are eggs.
# However, to help me remember what role they play--I will rename/rework the code
# to cover this structure "card.py"
from config import * 

import os
# We are going to use this for filepath operations
# The eggs that the Chicken Cards will reveal will be based on how much
# egg asset files are in the assets directory. Borrowing the file structure
# spares extra work

card_sprite = os.path.join()
# reveal_sprite = os.path.join( # The filepath for the )
class Card():
    def __init__(self, name) -> None:
        self.name = name
        
        # self.image = card_sprite
        # self.reveal_sprite = reveal_sprite

