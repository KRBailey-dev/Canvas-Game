//Canvas for game
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

//Game objects
var hero = {
	speed: 256, 
	x: 0,
	y: 0
};
var monster = {
	x: 0,
	y: 0
};
var monstersCaught = 0;

// Keyboard Controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset Monster when caught
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Updating objects
var update = function (modifier) {
	if (38 in keysDown) { // 38 = uparrow
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // 40 = downarrow
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // 37 = leftarrow
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // 39 = rightarrow
		hero.x += hero.speed * modifier;
	}

	// hero and enemy contact check
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
};

// Drawing the everything on screen
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
};

// The Game Loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Requests the game to loop ASAP
	requestAnimationFrame(main);
};


// Old way of browser support - game can be played on any browser
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


// Game ready to play!
var then = Date.now();
reset();
main();