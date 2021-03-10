const canvas = document.querySelector("canvas");

let img = new Image();
img.src = "running-sprite1.png"

canvas.style.backgroundColor= "black";
canvas.width = 500;
canvas.height = 500;
let ctx = canvas.getContext("2d");

img.addEventListener("load", (event) => {
    spriteH = img.height / 2;
    spriteW = img.width / 5;

    ctx.drawImage(img, 0, 0, spriteW, spriteH, 0, 50, spriteW, spriteH);

    //ctx.drawImage(img, spriteW, 0, spriteW, spriteH, 210, 100, spriteW, spriteH);

    draw();
})


let numImgs = 5;
let currentImgIndx = 0;
let frames = 0;
let x = 0;

let draw = () => {
    frames += 1;
    x += 1;
    // clear the canvas (maybe not the whole thing depending on game)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (frames %  5 == 0){
        // calculate and update vars
        currentImgIndx = (currentImgIndx == 4) ? 0 : currentImgIndx += 1;
    }

    //render2
    ctx.drawImage(img, spriteW * currentImgIndx, 0, spriteW, spriteH, x, 50, spriteW, spriteH);


    window.requestAnimationFrame(draw);
}


