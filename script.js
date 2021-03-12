const canvas = document.querySelector("canvas");

let img = new Image();
img.src = "sm-walking.png"

canvas.style.backgroundColor= "black";
canvas.width = 600;
canvas.height = 600;
let ctx = canvas.getContext("2d");

img.addEventListener("load", (event) => {
    spriteH = img.height;
    spriteW = img.width / 8;

    //ctx.drawImage(img, 0, 0, spriteW, spriteH, 0, 50, spriteW, spriteH);

    //ctx.drawImage(img, spriteW, 0, spriteW, spriteH, 210, 100, spriteW, spriteH);

    draw();
})


let numImgs = 8;
let currentImgIndx = 0;
let frames = 8;
let playerX = 10;
let playerY = 200;

let draw = () => {
    frames += 1;
    //x += 1;
    // clear the canvas (maybe not the whole thing depending on game)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (frames %  8 == 0){
        // calculate and update vars
        currentImgIndx = (currentImgIndx == 7) ? 0 : currentImgIndx += 1;
    }


    // moves player according to what keys are pressed
    if(rightPressed) {
        playerX += 5;
        ctx.drawImage(img, spriteW * currentImgIndx, 0, spriteW, spriteH, playerX, playerY, spriteW, spriteH);
    }
    else if(leftPressed) {
        playerX -= 5;
        ctx.drawImage(img, spriteW * currentImgIndx, 0, spriteW, spriteH, playerX, playerY, spriteW, spriteH);
    }
    if(downPressed) {
        playerY += 5;
        ctx.drawImage(img, spriteW * currentImgIndx, 0, spriteW, spriteH, playerX, playerY, spriteW, spriteH);
    }
    else if(upPressed) {
        playerY -= 5;
        ctx.drawImage(img, spriteW * currentImgIndx, 0, spriteW, spriteH, playerX, playerY, spriteW, spriteH);
    }

    //render2
    ctx.drawImage(img, spriteW, 0, spriteW, spriteH, playerX, playerY, spriteW, spriteH);

    /*
    // Draws circles onto page;
     circle.forEach((circle) => {
         //console.log(circle);
         drawCircle(circle.x, circle.y, radius, 5, circle.colour, circle.colour);
     });
     */
    window.requestAnimationFrame(draw);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

// Determines if or when key is pressed
function keyDownHandler(event) {
    if(event.keyCode == 39 || event.keyCode == 68) {
        rightPressed = true;
    }
    else if(event.keyCode == 37 || event.keyCode == 65) {
        leftPressed = true;
    }
    if(event.keyCode == 40 || event.keyCode == 83) {
    	downPressed = true;
    }
    else if(event.keyCode == 38 || event.keyCode == 87) {
    	upPressed = true;
    }
}

// Determines if or when key is released
function keyUpHandler(event) {
    if(event.keyCode == 39 || event.keyCode == 68) {
        rightPressed = false;
    }
    else if(event.keyCode == 37 || event.keyCode == 65) {
        leftPressed = false;
    }
    if(event.keyCode == 40 || event.keyCode == 83) {
    	downPressed = false;
    }
    else if(event.keyCode == 38 || event.keyCode == 87) {
    	upPressed = false;
    }
}

// Adding objects to be enemies and health points

let circle = [];
let radius = 25;
let xCirc = 10;
let yCirc = 20;


function drawCircle(xCirc, yCirc, radius, border, borderColor, fillColor){
    console.log("we made it inton the Drawcircle")
    ctx.beginPath();
    ctx.arc(xCirc, yCirc, radius, 0, 2*Math.PI);
    ctx.strokeStyle = borderColor;
    ctx.fillStyle = fillColor;
    ctx.lineWidth = border;
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

for (let i = 0; i < 20; i++) {
    let xC = radius + (Math.random() * (canvas.width - (2 * radius)));
    let yC = radius + (Math.random() * (canvas.height - (2 * radius)));
    let colour = randomColour();
    let direction = Math.random() * 2.0 * Math.PI;
    circle.push({xC: xC, yC: yC, colour: colour, direction: direction});
    //draw()
}

function randomColour() {
    let chars = '0123456789ABCDEF';
    let colour = '#';
    for (let i = 0; i < 6; i++){
        colour += chars[Math.floor(Math.random() * 16)];
    }

    return colour;
}

circle.forEach((circle) => {
    console.log(circle);
    drawCircle(circle.x, circle.y, radius, 5, circle.colour, circle.colour);
});
