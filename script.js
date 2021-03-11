const canvas = document.querySelector("canvas");

let img = new Image();
img.src = "running-sprite1.png"

canvas.style.backgroundColor= "black";
canvas.width = 600;
canvas.height = 600;
let ctx = canvas.getContext("2d");

img.addEventListener("load", (event) => {
    spriteH = img.height / 2;
    spriteW = img.width / 5;

    //ctx.drawImage(img, 0, 0, spriteW, spriteH, 0, 50, spriteW, spriteH);

    //ctx.drawImage(img, spriteW, 0, spriteW, spriteH, 210, 100, spriteW, spriteH);

    draw();
})


let numImgs = 5;
let currentImgIndx = 0;
let frames = 0;
let playerX = 10;
let playerY = 200;

let draw = () => {
    frames += 1;
    //x += 1;
    // clear the canvas (maybe not the whole thing depending on game)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (frames %  5 == 0){
        // calculate and update vars
        currentImgIndx = (currentImgIndx == 4) ? 0 : currentImgIndx += 1;
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




