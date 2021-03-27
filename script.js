const canvas = document.querySelector("canvas");
const backgroundMusic = document.createElement("audio");
backgroundMusic.src = "backgroundMusic.mp3";

const img = new Image();
img.src = "character.png"

const enemieImg = new Image();
enemieImg.src = "enemiesWhite.png";


//canvas.style.backgroundColor = "black";
canvas.width = 600;
canvas.height = 600;
let ctx = canvas.getContext("2d");
drawMenu();


img.addEventListener("load", (event) => {
    spriteH = img.height;
    spriteW = img.width / 8;
    

    enemieH = 48;
    enemieW = 48;

    const layer6 = new Image();
    layer6.src = "layer_06.png";

    const backGroundSprite = new ScrollingSprite(layer6, 0, 0, canvas.width, canvas.height, 0.1);
    const backGroundSprite2 = new ScrollingSprite(layer6, -canvas.width, 0, canvas.width, canvas.height, 0.1);

    const layer5 = new Image();
    layer5.src = "layer_05.png";

    const sunSprite = new ScrollingSprite(layer5, 0, 0, canvas.width, canvas.height, 0.001);
    const sunSprite2 = new ScrollingSprite(layer5, -canvas.width, 0, canvas.width, canvas.height, 0.001);

    const layer4 = new Image();
    layer4.src = "layer_04.png";

    const backGroundShadowBuildingSprite = new ScrollingSprite(layer4, 0, 0, canvas.width, canvas.height, 0.5);
    const backGroundShadowBuildingSprite2 = new ScrollingSprite(layer4, -canvas.width, 0, canvas.width, canvas.height, 0.5);

    const layer3 = new Image();
    layer3.src = "layer_03.png";

    const backGroundBuildingSprite = new ScrollingSprite(layer3, 0, 0, canvas.width, canvas.height, 0.8);
    const backGroundBuildingSprite2 = new ScrollingSprite(layer3, -canvas.width, 0, canvas.width, canvas.height, 0.8);

    const layer2 = new Image();
    layer2.src = "layer_02.png";

    const backGroundTreeSprite = new ScrollingSprite(layer2, 0, 0, canvas.width, canvas.height, 1.2);
    const backGroundTreeSprite2 = new ScrollingSprite(layer2, -canvas.width, 0, canvas.width, canvas.height, 1.2);

    const layer1 = new Image();
    layer1.src = "layer_01.png";

    const foreGroundSprite = new ScrollingSprite(layer1, 0, 0, canvas.width, canvas.height, 2);
    const foreGroundSprite2 = new ScrollingSprite(layer1, -canvas.width, 0, canvas.width, canvas.height, 2);

    spriteArray = [
        backGroundSprite,
        backGroundSprite2,
        sunSprite,
        sunSprite2,
        backGroundBuildingSprite,
        backGroundBuildingSprite2,
        backGroundShadowBuildingSprite,
        backGroundShadowBuildingSprite2,
        backGroundBuildingSprite,
        backGroundBuildingSprite2,
        backGroundTreeSprite,
        backGroundTreeSprite2,
        foreGroundSprite,
        foreGroundSprite2
    ]

    document.addEventListener("keypress", (event) => {
        if (event.keyCode == 13) {
            draw();
            backgroundMusic.play();
        }
    });
})


let numImgs = 8;
let currentImgIndx = 0;
let frames = 0;
let playerX = 10;
let playerY = 400;
let eFrames = 0;
let eImgIndex = 0;

let draw = () => {
    
    frames += 1;
    eFrames += 1;
    // clear the canvas (maybe not the whole thing depending on game)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (frames % 8 == 0) {
        // calculate and update vars
        currentImgIndx = (currentImgIndx == 7) ? 0 : currentImgIndx += 1;
    }

    if (eFrames % 6 == 0) {
        eImgIndex = (eImgIndex == 2) ? 0 : eImgIndex += 1;
        //ctx.drawImage(enemieImg, enemieW * eFrames, enemieH, enemieW, enemieH, 300, 300, spriteW, spriteH);

    }

    // moves player according to what keys are pressed
    if (rightPressed) {
        playerX += 1;
    }
    else if (leftPressed) {
        playerX -= 1;
    }
    else if (downPressed) {
        playerY += 1;
    }
    else if (upPressed) {
        playerY -= 1;
    }

    // does scrolling background
    spriteArray.forEach((sprite) => {
        sprite.scroll();
        sprite.draw(ctx);
    });

    ctx.drawImage(img, spriteW * currentImgIndx, 0, spriteW, spriteH, playerX, playerY, spriteW, spriteH);
    window.requestAnimationFrame(draw);

    ctx.drawImage(enemieImg, enemieW * eImgIndex, 0, enemieW, enemieH, 300, 400, spriteW, spriteH);

    
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

// Determines if or when key is pressed
function keyDownHandler(event) {
    if (event.keyCode == 39 || event.keyCode == 68) {
        rightPressed = true;
    }
    else if (event.keyCode == 37 || event.keyCode == 65) {
        leftPressed = true;
    }
    if (event.keyCode == 40 || event.keyCode == 83) {
        downPressed = true;
    }
    else if (event.keyCode == 38 || event.keyCode == 87) {
        upPressed = true;
    }
}

// Determines if or when key is released
function keyUpHandler(event) {
    if (event.keyCode == 39 || event.keyCode == 68) {
        rightPressed = false;
    }
    else if (event.keyCode == 37 || event.keyCode == 65) {
        leftPressed = false;
    }
    if (event.keyCode == 40 || event.keyCode == 83) {
        downPressed = false;
    }
    else if (event.keyCode == 38 || event.keyCode == 87) {
        upPressed = false;
    }
}

// class for scrolling sprite
class ScrollingSprite {
    constructor(image, x, y, width, height, speed) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    scroll() {
        this.x -= this.speed;
        if (this.x <= -this.width) {
            this.x = this.width - 1;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

function drawMenu() {
    ctx.font = "50px Consolas";
    ctx.fillStyle = "purple";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "black";
    ctx.fillText("Some Chicken Game",125,100); 
    ctx.font = "30px Consolas";
    ctx.fillText("The purpose of the game is to avoid", 125, 300);
    ctx.fillText("the chickens from touching you,",125, 330);
    ctx.fillText("you are given three lives.",125, 360);
    ctx.fillText("Press Enter to start, Good luck!",125, 390);

  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }