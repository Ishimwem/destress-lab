"use strict";
var stresses = [];
var loaded = false;
$("button").on('click', function () {
    location.href = "/";
})
/* variable declarations */

// game and background canvases
var gcanvas = document.getElementById("game");
var bcanvas = document.getElementById("background");

var ctx = gcanvas.getContext("2d");
var bctx = bcanvas.getContext("2d");
bcanvas.width = $(window).width();
bcanvas.height = $(window).height();

// character attributes
var x = gcanvas.width/2;
var y = 40;
var face = "down";

// bullet attributes
var sx = x;
var sy = y;
var speed = 3;

// dog attributes
var dogs = [];
var count = 5; // dog count
var ballSpeed = 1;
var dx = ballSpeed;
var dy = ballSpeed;

// input from the user
var upPressed = false;
var downPressed = false;
var rightPressed = false;
var leftPressed = false;
var shoot = false;

// bullet speed and direction
var bx = 0;
var by = 0;
var bspeed = 5;
var shooting = false;

// stresses that are defeated count
var defeated = 0;

// if the user has no stresses
var defaultStresses = [{name: "work", x: 400, y: 30, dx: dx - 2, dy, show: true},
  {name: "project", x: 50, y: 90, dx, dy, show: true}];

// check if user is logged in
var authCheck = false;

// user input
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

/* Event Handlers */

function keyDownHandler(e) {
    if(e.keyCode == 37) {
        leftPressed = true;
        face = "left";
    }
    else if(e.keyCode == 38) {
        upPressed = true;
        face = "up";
    }
    else if(e.keyCode == 39) {
        rightPressed = true;
        face = "right";
    }
    else if(e.keyCode == 40) {
        downPressed = true;
        face = "down";
    }
    if(e.keyCode == 32) {
        shoot = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 37) {
        leftPressed = false;
    }
    else if(e.keyCode == 38) {
        upPressed = false;
    }
    else if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 40) {
        downPressed = false;
    }
}

// draw the bullet
function drawBullet() {
    ctx.beginPath();
    ctx.arc(sx, sy, 2, 0, Math.PI*2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();
}

// return the bullet to the character
function resetBullet () {
    sx = x;
    sy = y;
    bx = 0;
    by = 0;
}

// shoot the bullet
function shooter() {
    drawBullet();

    // direction of bullet
    if(!shooting) {
        shooting = true;
        if (face == "up" && sy > 0) {
            by = -bspeed;
        } else if (face == "down" && sy < gcanvas.height) {
            by = bspeed;
        } else if (face == "right" && sx < gcanvas.width) {
            bx = bspeed;
        } else if (face == "left" && sx > 0) {
            bx = -bspeed;
        }
    }

    if(sy > 0 && sy <= gcanvas.height && sx > 0 && sx <= gcanvas.width) {
        sx += bx;
        sy += by;
    }
    // bullet has reached the end of the canvas
    else {
        shooting = false;
        shoot = false;
    }
}

// draw the character who shoots the stresses
function drawCharacter() {
    if(face == "up") {
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI*2);
        ctx.fillStyle = "#e342ff";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.arc(x - 4, y - 8, 2, 0, Math.PI*2);
        ctx.arc(x + 4, y - 8, 2, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(x - 11, y - 2, 22, 7);
        ctx.rect(x - 7, y + 2, 14, 15);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(x - 7, y + 4, 14, 3);
        ctx.fillStyle = "#1dacc2";
        ctx.fill();
        ctx.closePath();
    }
    else if(face == "down") {
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI*2);
        ctx.fillStyle = "#e342ff";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.arc(x - 4, y + 8, 2, 0, Math.PI*2);
        ctx.arc(x + 4, y + 8, 2, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(x - 11, y - 5, 22, 7);
        ctx.rect(x - 7, y - 17, 14, 15);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(x - 7, y - 7, 14, 3);
        ctx.fillStyle = "#1dacc2";
        ctx.fill();
        ctx.closePath();
    }
    else if(face == "left") {
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI*2);
        ctx.fillStyle = "#e342ff";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.arc(x - 8, y - 4, 2, 0, Math.PI*2);
        ctx.arc(x - 8, y + 4, 2, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(x - 2, y - 11, 7, 22);
        ctx.rect(x + 2, y - 7, 15, 14);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(x + 5, y - 7, 3, 14);
        ctx.fillStyle = "#1dacc2";
        ctx.fill();
        ctx.closePath();
    }
    else if(face == "right") {
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI*2);
        ctx.fillStyle = "#e342ff";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.arc(x + 8, y - 4, 2, 0, Math.PI*2);
        ctx.arc(x + 8, y + 4, 2, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(x - 5, y - 11, 7, 22);
        ctx.rect(x - 18, y - 7, 15, 14);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(x - 8, y - 7, 3, 14);
        ctx.fillStyle = "#1dacc2";
        ctx.fill();
        ctx.closePath();
    }
}

/**
 * Takes the given stressors adds them to the stresses list for drawing.
 * @param {array} stressors
 * If stressors are null, then the default list is used, otherwise
 * use the given stressors.
 */
function addStress(stressors) {
    stresses = [];
    if(!stressors) {
        stresses = defaultStresses;
    } else {
        for(var i = 0; i < stressors.length; i++) {
            var randomX = Math.floor(Math.random() * gcanvas.width - 50) + 45;
            var randomY = Math.floor(Math.random() * gcanvas.height - 45) + 50;
            var speed = Math.floor(Math.random() * 3);
            stresses.push({name: stressors[i], x: randomX, y: randomY, dx: speed, dy: speed, show: true});
        }
    }
}

// draw the stress on the screen
function showStress (stress) {
    ctx.fillStyle = "#def2ff";
    ctx.font = "bold 20px Arial";
    ctx.fillText(stress.name, stress.x, stress.y);
}

// make the stresses bounce along the canvas
function moveStresses() {
    for (var i = 0; i < stresses.length; i++) {
        if(stresses[i].show) {
            showStress(stresses[i]);
            if(stresses[i].x + stresses[i].dx > gcanvas.width - 60 || stresses[i].x + stresses[i].dx < 30) {
                stresses[i].dx = -stresses[i].dx;
            }
            if(stresses[i].y + stresses[i].dy > gcanvas.height || stresses[i].y + stresses[i].dy < 30) {
                stresses[i].dy = -stresses[i].dy;
            }
            stresses[i].x += stresses[i].dx;
            stresses[i].y += stresses[i].dy;
        }
    }
}

// check if the bullet collided with a stressor
function collisionDetection() {
    for(var s = 0; s < stresses.length; s++) {
        var stress = stresses[s];
        if(stress.show) {
            if(sx > stress.x - 10 && sx < stress.x + 50 && sy > stress.y && sy < stress.y + 10) {
                defeated++;
                stress.show = false;
                // if all stresses are defeated, repeat the game
                if(defeated == stresses.length) {
                    for(var s = 0; s < stresses.length; s++) {
                        stresses[s].show = true;
                    }
                    defeated = 0;
                    alert("You'll get through this...");
                    loaded = false;
                }
            }
        }
    }
}

/**
 * Acquires the dog images from the API given a list.  If the list is null,
 * get random images.  Otherwise, get images of the listed breeds.
 * Adds n images total to the dogs array.
 * @param {int} n
 *  The number of dogs to draw.
 * @param {array} breeds
 *  The list of breeds to use for the images.
 */
function addDog(n, breeds) {
    var dogImages = [];
    var promise = new Promise ((resolve, reject) => {
    $.get('/user/images', (urlString, status) => {
        if(urlString) {
            var urls = JSON.parse(urlString);
            for(var u in urls) {
                var dogImg = new Image();
                dogImg.src = urls[u];
                dogImages.push(dogImg);
            }
            resolve();
        }
    });
    });
    promise.then(() => {
        console.log(dogImages[0]);
        for(var d = 0; d < dogImages.length; d++) {
            var randomX = Math.floor(Math.random() * bcanvas.width - 150) + 75;
            var randomY = Math.floor(Math.random() * bcanvas.height - 150) + 75;
            dogs.push({bx: randomX, by: randomY, bdx: ballSpeed, bdy: ballSpeed, image: dogImages[d]});
        }
    });
}

// Draws the dog
function drawDog(dog) {
    bctx.beginPath();
    bctx.arc(dog.bx, dog.by, 70, 0, Math.PI*2);
    bctx.closePath();
    bctx.fillStyle = "#4d10c7";
    bctx.fill();
    bctx.drawImage(dog.image, dog.bx - 37, dog.by - 37, 75, 75);
    bctx.globalCompositeOperation='source-over';
}

// bounce the dogs along the background canvas
function moveDogs() {
    for (var i = 0; i < dogs.length; i++) {
        drawDog(dogs[i]);

        if(dogs[i].bx + dogs[i].bdx > bcanvas.width - 75 || dogs[i].bx + dogs[i].bdx < 75) {
            dogs[i].bdx = -dogs[i].bdx;
        }
        if(dogs[i].by + dogs[i].bdy > bcanvas.height - 75 || dogs[i].by + dogs[i].bdy < 75) {
            dogs[i].bdy = -dogs[i].bdy;
        }

        dogs[i].bx += dogs[i].bdx;
        dogs[i].by += dogs[i].bdy;
    }
}

// Loads the game based on stressors and breeds.
function loadStuff() {
    var stressors = [];
    var breeds = window.parent.parent.currentBreeds;

    var promise = new Promise ((resolve, reject) => {
    $.get('/user/stressors', (data, status) => {
        if(data) {
            stressors = JSON.parse(data);
            resolve();
        }
    });
    });

    promise.then(() => {
    console.log(stressors);
    addStress(stressors);
    addDog(count, breeds);
    loaded = true;
    });
}

// Updates the canvas.
function draw() {
    if(!loaded) {
        loadStuff();
    }
    if(authCheck && !window.parent.parent.auth) { // logged out
        loaded = false;
        authCheck = false;
        defeated = 0;
    } else if(!authCheck && window.parent.parent.auth) { // logged in
        loaded = false;
        authCheck = true;
        defeated = 0;
    }
    bcanvas.width = $(window).width();
    bcanvas.height = $(window).height();

    if(bcanvas.width < 800) {
        gcanvas.width = bcanvas.width - 50;
    }
    else {
        gcanvas.width = 500;
    }
    if(bcanvas.height < 600) {
        gcanvas.height = bcanvas.height - 50;
    }
    else {
        gcanvas.height = 500;
    }

    ctx.clearRect(0, 0, gcanvas.width, gcanvas.height);
    bctx.clearRect(0, 0, bcanvas.width, bcanvas.height);
    drawCharacter();
    moveDogs();
    moveStresses();
    collisionDetection();

    // shoot the bullet if the user pressed space
    if(shoot) {
        shooter();
    } else {
        resetBullet();
    }

    // the character movement but not past the game canvas' boundaries
    if(rightPressed && x < gcanvas.width - 10) {
        x += speed;
    }
    else if(leftPressed && x > 10) {
        x -= speed;
    }
    else if(downPressed && y < gcanvas.height - 10) {
        y += speed;
    }
    else if(upPressed && y > 10) {
        y -= speed;
    }

    requestAnimationFrame(draw);
}

// draw the game
draw();
