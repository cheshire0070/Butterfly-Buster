//canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 640; 
canvas.height = 470;
document.getElementById("canvas").appendChild(canvas);

//background
var bgStart = false;
var bgImage = new Image();
bgImage.onload = function(){ bgStart = true };
bgImage.src="background.jpg";

//butter
var butterBool = false;
var butterImage = new Image();
butterImage.onload = function(){ butterBool = true; };
butterImage.src = "bug.png";

//score
var score = 0;
//initialize fly interval to 2 seconds
var flyInterval = 2000;

//butter location
function resetLocation() {
    // Throw the butter somewhere on the screen randomly
    butter.x = 30 + (Math.random() * (canvas.width - 150));
    butter.y = 30 + (Math.random() * (canvas.height - 150));
};

//set flying 
var fly = setInterval(
    function ()
    {
        resetLocation();
    }
    , flyInterval);

var butter =
{
    speed: 300 
};

//mouse click control
canvas.addEventListener("mousedown", clicked, false);
function clicked(e) {
    e.preventDefault();
    var x = e.clientX;
    var y = e.clientY;

    if (x > butter.x + 300 && x < butter.x + 425 && y > butter.y + 80 && y < butter.y + 260){
        score += 10;
        resetLocation();
        if (flyInterval - 100 >= 50) {
            clearInterval(fly);
            flyInterval -= 100;
            fly = setInterval(function () {
                resetLocation();
            }, flyInterval);
        }
    }
}

//reset flying interval
var resetSpeed = function () {
    clearInterval(fly);
    flyInterval = 2000;
    fly = setInterval(function () {
        resetLocation();
    }, flyInterval);
};
var resetScore = function () {
    score = 0;
    resetSpeed();
};

var render = function () {
    if (bgStart) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (butterBool) {
        ctx.drawImage(butterImage, butter.x, butter.y);
        
    }

    //score
    ctx.fillStyle = "rgb(0, 0, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    document.getElementById("score").innerHTML = "score : " + score;
};


//run the game
var run = function () {
    render();
    requestAnimationFrame(run);
};

run();