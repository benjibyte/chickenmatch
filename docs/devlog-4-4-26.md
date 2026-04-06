# Devlog
Benjamin Brinkerhoff
4.4.26

## Entry 1
I failed again to do what I tried to do yesterday, turns out there was no file named `"background.png"` 
because I had on accidentally saved it in the editor's special format, and not a `.png` file format. 

Then I needed to make sure that the Object `Board` was rendering all it's `Cards` properly. That still isn't working.
I remember reading somewhere on Reddit, that it's best to load up all your sprites once rather than every single frame if 
you don't have too. Problem is, I must have misinterpreted it, because now nothing is being `blit` onto the screen according too
pygame-ce's documentation.

Thus, that is my tackle for today, get all 16 Chickens showing-- *try to use O.O.P.* and then make them react when they click.

It's a **tall order, but hopefully I can get some of it done. See you in the next devlog!**

## Entry 2
So turns out that all I had to do was simply copy the `for loop` rendering code into the game loop. It doesn't seem to impact performance,
but that is hard to tell, since there isn't really any performance to track yet, lol.

All the Chickens render, but they don't conform to a grid, after the first row they keep getting pushed in a down-right diagonal line 
that runs off the screen. I need to reset the `pointer_x` which *should* draw the next row of chickens on the same x, but a different y,
because right now, that X value never gets reset at the end of **it's scoped for loop.**

## Entry 3

I got click detection working! Turns out that because of a for loop, and how the "name"/"ID" was being assigned to each chicken *and because I hadn't counted for the mouse position to confirm a specific chicken*--Each and every chicken would fire of!

I used some if statements to create some "boxes" of where the mouse should be, otherwise the chickens are always firing off "false". I want to eventually find a way where I don't have to use a for loop. I feel like that could impact game performance eventually.

### The next steps...

I need to do the following next:

1. I need to draw more sprites for the other collectibles
2. I need to write an algorithm that ensures only one pair of each collectible is assigned too
  a card/chicken. When they are created in the `setup_deck` method. (*Only one match of brown eggs, blue eggs, white eggs, chick, cracked egg, and mouse etc.*)
3. Once I have those collectible sprites, I need to write a new method for each chicken/card to create and delete that sprite then to delete that collectible-surface soon after. (**I might need to import the Time library to count seconds**)
4. When Chicken Objects are created using the Card Class, I need to 
