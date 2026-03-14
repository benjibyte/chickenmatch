import pygame
from scale import *

class Chicken:
    def __init__(self, egg_color, name) -> None:
        self.egg_color = egg_color
        self.name = name
        pass
    
    def set_x(self, x):
        self.x = x
        return f"New X: {x} has been set!"
    def set_y(self, y):
        self.y = y
        return f"New Y: {y} has been set!"

    def selected(self):
        print("Brrk Brrk!")

    def showEgg(self):
        # Hide Self; Show Egg
        # Set "nesting" to False
        # Increase discovered_eggs by 1
        # then while there are less then 3
        # eggs flippped over, disapear
        # once 3 eggs are flipped over, wait a bit and then 
        # hide eggs, show self again.

        return True

    def hideEgg(self):
        # Show Self; Hide Egg
        # Decrease discovered_eggs by 1
        # Set "nesting" to True

        return True
