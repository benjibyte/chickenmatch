import kaplay from "kaplay";
// Chicken Match, Author: benjibyte (on GitHub)
// This game was started about a year ago, yet it was a simple match game. 
// I kept shooting myself in the foot several times, and have had to restart
// it over and over. Once it was a half-baked Godot project, then pygame, and before all of that
// it was a html/canvas.js game...
// I need something I can prototype quickly with, and pygame was great for a while...until I realized
// I couldn't compile to Web Assembly without a lot of headache and overhead issues. 
// So here we are with Kaplay... 

// Global variables & Kaplay Initialization

const chickenColCount = 3;
const spriteSize = 16;
const gap = 0;    
// layout
const totalGridSize = 16;
const startX = ((320 - totalGridSize) / 2) - 22; // get the center
const startY = ((180 - totalGridSize) / 2) - 22; // get the center

const k = kaplay({
  width: 320,
  height: 180,
  scale: 4
});

// Load Assets
k.loadSound("burk", "/sounds/chicken-select.mp3");
k.loadSound("burgack", "/sounds/chicken-poof.mp3");
k.loadSound("pop", "/sounds/pop.mp3");

k.loadSprite("chicken", "sprites/chicken.png");
k.loadSprite("brown_egg", "sprites/brown_egg.png");
k.loadSprite("white_egg", "sprites/white_egg.png");
k.loadSprite("green_egg", "sprites/green_egg.png");
k.loadSprite("background", "sprites/background.png");
k.loadSprite("you_win", "sprites/you_win.png");
k.loadSprite("poof", "sprites/poof.png", {
  sliceX: 8,
  sliceY: 1,
  anims: {
    poof: { from:0, to: 7},
  },
});
k.loadSprite("feathers", "sprites/feathers.png", {
  sliceX: 8,
  sliceY: 1,
  anims: {
    feathers: { from:0, to: 7},
  },
});
k.loadSprite("reset_btn", "sprites/reset_btn.png", {
  sliceX: 3,
  sliceY: 1, 
  anims: {
    press: { from:0, to: 2},
  }
});

function poof(x, y) {
  const smoke = add([
    sprite("poof", { anim: "poof" }),
    pos(x, y),
    anchor("center")
  ]);


  // making the burk burk chicken sounds more diverse
  const soundSpeed = rand(0.7, 1.1);
  play("burk", {
    volume: 0.5,
    speed: soundSpeed,
    loop: false
  });
  smoke.play("poof", { speed: 16 });
  smoke.onAnimEnd(() => destroy(smoke));
}

function feathers(x, y) {
  const feathers = add([
    sprite("feathers", {anim: "feathers"}),
    pos(x, y),
    anchor("center"),
  ]);

  feathers.play("feathers", { speed: 8 });
  feathers.onAnimEnd(() => destroy(feathers));
}
/*
 * I am going to use the Fisher Yates shuffle since JS doesn't have a native solution
 * */
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Setup hidden cards
function setupHiddenCards() {
  const eggs = ["brown_egg", "white_egg", "green_egg", "brown_egg", "white_egg", "green_egg", "brown_egg", "white_egg", "green_egg"];
  const cardFaces = shuffleArray(eggs);
  
  cardFaces.forEach((egg, index) => {
    // Get cords
    const col = index % chickenColCount;
    const row = Math.floor(index / chickenColCount);

    // Grid
    const posX = startX + (col * (spriteSize + gap));
    const posY = startY + (row * (spriteSize + gap));

    k.add([
      k.sprite("chicken"),
      k.pos(posX, posY),
      k.area(), // area() supposedly allows detectable clicks with a mouse
      "card",
      {
        id: index,
        faceValue: egg,
        isFlipped: false,
        eggChild: null,
      }
    ]);
  })
}



k.scene("game", () => {
  let gameWon = false;
  let selectedCards = [];
  let pairsFound = 0;
  let isChecking = false;
  // Render the background
  const backgroundImage = k.add([sprite("background"), pos(0,0)]);

  setupHiddenCards();

  const statusText = k.add([
    k.text("Find matching pairs!", { size: 10 }),
    k.pos(10, 10),
    k.color("#000000")
  ]);

  // When a Egg Card is clicked
  k.onClick("card", (card) => {
    if (isChecking || card.isFlipped || selectedCards.length >= 3) {
      return;
    }

    // Flip the card and hide the Chicken using Opacity
    card.isFlipped = true;
    selectedCards.push(card);
    card.opacity = 0;

    // Play the animation
    let poofX = card.pos.x + 8;
    let poofY = card.pos.y + 8;
    poof(poofX, poofY);
    // Spaqwn the egg sprite on top of the chicken
    card.eggChild = card.add ([
      k.sprite(card.faceValue),
      k.pos(8,8),
      k.anchor("center"),
      "revealedEgg" // We will use this tag later to remove it
    ]);
    // Only check logic when we have exactly 3 cards selected
    if (selectedCards.length === 3) {
      isChecking = true;
      const [card1, card2, card3] = selectedCards;  
      // Check if all three cards match!
      if (card1.faceValue === card2.faceValue && card2.faceValue === card3.faceValue) {
        //Match Found!
        pairsFound++;
        // play the BUGAAK sound
        play("burgack", {
          volume: 1.0,
          speed: 0.9,
          loop: false
         });
        // play the feathers animation for each chicken
        selectedCards.forEach(chicken => {
          chicken.eggChild.opacity = 0;
          let feathersX = chicken.pos.x + 8;
          let feathersY = chicken.pos.y + 8;
          feathers(feathersX, feathersY);
        });
        selectedCards = [];
        isChecking = false;

        // Game Win Condition
        if (pairsFound === 3) {
          gameWon = true;
          const winnerBanner = add([
            sprite("you_win"),
            pos(center().x, center().y - 50),
            anchor("center"),
            opacity(0)
          ]);
        
          const resetButton = add([
            sprite("reset_btn", { frame: 0 }),
            pos(center()),
            anchor("center"),
            area(),
            "resetButton",
            opacity(0) // Keep it at 0 opacity until the player wins the game
          ]);

          tween(
            0,
            1,
            1.2,
            (value) =>  {
              winnerBanner.opacity = value;
              resetButton.opacity = value;
            },
            easings.easeOutQuad
          );
        
          k.onClick("resetButton", () => {
            console.log("Reset button clicked!");
            go("game");
          });

        }
      } else {
        // No match, turn cards back over after a short delay
        k.wait(0.8, () => {
          // Remove egg sprites
          if (card1.eggChild) k.destroy(card1.eggChild);
          if (card2.eggChild) k.destroy(card2.eggChild);
          if (card3.eggChild) k.destroy(card3.eggChild);
          // Reset card state
          card1.isFlipped = false;
          card1.opacity = 1;
          card2.isFlipped = false;
          card2.opacity = 1;
          card3.isFlipped = false;
          card3.opacity = 1;
          selectedCards = [];
          isChecking = false;
        });
      }
    }
  })
})

k.go("game");