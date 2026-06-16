from card import Card
from config import *
import random
class Board():
    def __init__(self, size, top_left_corner):
        self.size = size
        self.deck = []
        self.top_left_corner = top_left_corner
    
    def setup_cards(self):
        if self.size % 2 != 0:
            raise ValueError("Board size must be even.")

        pointer_x = self.top_left_corner[0]
        pointer_y = self.top_left_corner[1]
        chicken_index = 0

        pair_count = self.size // 2
        if pair_count > len(CARD_FACE_TYPES):
            raise ValueError("Not enough card face types to build a matching board.")

        face_pool = CARD_FACE_TYPES[:pair_count] * 2
        random.shuffle(face_pool)

        board_width = int(self.size) / 4
        for y in range(int(board_width)):
            for x in range(int(board_width)):
                name = f"chicken{chicken_index}"
                face = face_pool[chicken_index]
                new_card = Card(name, pointer_x, pointer_y, face=face)

                chicken_index += 1
                self.deck.append(new_card)
                pointer_x += CARD_SIZE

            pointer_x = self.top_left_corner[0]
            pointer_y += CARD_SIZE


    def get_cards(self):
        return self.deck

    def render(self):
        for card in self.deck:
            card.render()
                 
            

            
