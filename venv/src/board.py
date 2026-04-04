from card import Card
from config import *
import random
class Board():
    def __init__(self, size, top_left_corner):
        self.size = size
        self.deck = []
        self.top_left_corner = top_left_corner
    
    def setup_cards(self):
        pointer_x = self.top_left_corner[0]
        pointer_y = self.top_left_corner[1]
        chicken_index = 0
        name = f"chicken{chicken_index}"

        board_width = int(self.size) / 2
        for y in range(int(board_width)):
            for x in range(int(board_width)):
                new_card = Card(name, pointer_x, pointer_y)
                self.deck.append(new_card)
                pointer_x += CARD_SIZE
            pointer_y += CARD_SIZE
    def get_cards(self):
        return self.deck

    def render(self):
        for card in self.deck:
            card.render()
                 
            

            
