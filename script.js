const canvas = document.querySelector("canvas");

const img = new Image();
img.src = "sm-walking.png"




//canvas.style.backgroundColor = "black";
canvas.width = 600;
canvas.height = 600;
let ctx = canvas.getContext("2d");

img.addEventListener("load", (event) => {
    spriteH = img.height;
    spriteW = img.width / 8;

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

    draw();
})


let numImgs = 8;
let currentImgIndx = 0;
let frames = 8;
let playerX = 10;
let playerY = 400;

let draw = () => {
    frames += 1;
    //x += 1;
    // clear the canvas (maybe not the whole thing depending on game)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (frames % 8 == 0) {
        // calculate and update vars
        currentImgIndx = (currentImgIndx == 7) ? 0 : currentImgIndx += 1;
    }


    // moves player according to what keys are pressed
    if (rightPressed) {
        playerX += 5;
    }
    else if (leftPressed) {
        playerX -= 5;
    }
    else if (downPressed) {
        playerY += 5;
    }
    else if (upPressed) {
        playerY -= 5;
    }



    // does scrolling background
    spriteArray.forEach((sprite) => {
        sprite.scroll();
        sprite.draw(ctx);
    });

    /*
    // render circles 
    circles.forEach((circle) => {
        circle.x = circle.x + Math.cos(circle.direction);
        circle.y = circle.y + Math.sin(circle.direction);
        drawCircle(circle.x, circle.y, radius, 5, circle.colour, circle.colour);
        bounce(circle);
    }); */

    ctx.drawImage(img, spriteW * currentImgIndx, 0, spriteW, spriteH, playerX, playerY, spriteW, spriteH);
    window.requestAnimationFrame(draw);
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

// Adding objects to be enemies and health points

let circles = [];
let radius = 25;
let xCirc = 10;
let yCirc = 20;


function drawCircle(xCirc, yCirc, radius, border, borderColor, fillColor) {
    ctx.beginPath();
    ctx.arc(xCirc, yCirc, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = borderColor;
    ctx.fillStyle = fillColor;
    ctx.lineWidth = border;
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

for (let i = 0; i < 15; i++) {
    let xC = radius + (Math.random() * (canvas.width - (2 * radius)));
    let yC = radius + (Math.random() * (canvas.height - (2 * radius)));
    let colour = randomColour();
    let direction = Math.random() * 2.0 * Math.PI;
    circles.push({ x: xC, y: yC, colour: colour, direction: direction });
}

function randomColour() {
    let chars = '0123456789ABCDEF';
    let colour = '#';
    for (let i = 0; i < 6; i++) {
        colour += chars[Math.floor(Math.random() * 16)];
    }

    return colour;
}

function bounce(circle) {
    if (((circle.x - radius) < 0) || ((circle.y - radius) < 0) || ((circle.x + radius) > canvas.width) || ((circle.y + radius) > canvas.height)) {
        circle.direction += (Math.PI / 2);
    }
    if (circle.direction > (2 * Math.PI)) {
        circle.direction -= (2 * Math.PI);
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