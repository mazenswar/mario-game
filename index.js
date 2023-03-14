const platformImg = "./img/platform.png";
const backgroundImg = "./img/background.png";
const hillsImg = "./img/hills.png";
const spriteStandRight = "./img/stand-right.png";
const spriteRunRight = "./img/spriteRunRight.png";
const platformSmallTall = "./img/platformSmallTall.png";
const run = "./img/run-2.png";
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const gravity = 0.5;
const movementRange = {
	left: 10,
	right: 500,
};
const scrollRate = 5;
canvas.width = 1024;
canvas.height = 576;

// FUNCTIONS

function createImage(imgSrc) {
	const image = new Image();
	image.src = imgSrc;
	return image;
}
////////////// CLASSES
class Player {
	constructor() {
		this.speed = 10;
		this.jump = 15;
		this.position = {
			x: 100,
			y: 100,
		};
		this.height = 120;
		this.width = 120;
		this.velocity = {
			x: 0,
			y: 1,
		};
		this.sprites = {};
		this.currentSprite = createImage(run);
		this.currentCropWidth = 120;
		this.frames = 0;
	}

	draw() {
		// context.fillStyle = "red";
		// context.fillRect(this.position.x, this.position.y, this.width, this.height);
		context.drawImage(
			this.currentSprite,
			this.currentCropWidth * this.frames,
			0,
			this.currentCropWidth,
			120,
			this.position.x,
			this.position.y,
			this.width,
			this.height
		);
	}

	update() {
		this.frames++;
		if (this.frames > 14) {
			this.frames = 1;
		}
		this.draw();
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		if (this.height + this.position.y + this.velocity.y <= canvas.height) {
			this.velocity.y += gravity;
		} else {
			// this.velocity.y = 0;
		}
	}
}

class Platform {
	constructor({ x, y, image }) {
		this.position = {
			x,
			y,
		};
		this.image = image;
		this.width = image.width;
		this.height = image.height;
	}

	draw() {
		context.drawImage(this.image, this.position.x, this.position.y);
	}
}

class GenericObject {
	constructor({ x, y, image }) {
		this.position = {
			x,
			y,
		};
		this.image = image;
		this.width = image.width;
		this.height = image.height;
	}

	draw() {
		context.drawImage(this.image, this.position.x, this.position.y);
	}
}
//////////////////////// INIT
let scrollOffset = 0;
let player = new Player();
let platformImage = createImage(platformImg);
let platforms = [];
let genericObjects = [];

function init() {
	scrollOffset = 0;
	player = new Player();
	platformImage = createImage(platformImg);
	platforms = [
		new Platform({ x: 0, y: 470, image: platformImage }),
		new Platform({ x: platformImage.width - 2, y: 470, image: platformImage }),
		new Platform({
			x: platformImage.width * 2 + 300,
			y: 470,
			image: platformImage,
		}),
		new Platform({
			x: platformImage.width * 3 + 900,
			y: 470,
			image: platformImage,
		}),
		new Platform({
			x: platformImage.width * 5 + 500,
			y: 250,
			image: createImage(platformSmallTall),
		}),
	];
	genericObjects = [
		new GenericObject({ x: -1, y: -1, image: createImage(backgroundImg) }),
		new GenericObject({ x: 0, y: 0, image: createImage(hillsImg) }),
	];
}

const keys = {
	right: {
		pressed: false,
	},
	left: {
		pressed: false,
	},
};

///////////////////////////////////////////////
function animate() {
	requestAnimationFrame(animate);
	context.fillStyle = "white";
	context.fillRect(0, 0, canvas.width, canvas.height);
	genericObjects.forEach((genericObject) => {
		genericObject.draw();
	});
	platforms.forEach((platform) => {
		platform.draw();
	});
	player.update();
	if (keys.right.pressed && player.position.x <= movementRange.right) {
		player.velocity.x = player.speed;
	} else if (
		(keys.left.pressed && player.position.x >= movementRange.left) ||
		(keys.left.pressed && scrollOffset > 0 && player.position.x > 0)
	) {
		player.velocity.x = player.speed * -1;
	} else {
		player.velocity.x = 0;
		if (keys.right.pressed) {
			scrollOffset += scrollRate;
			platforms.forEach((platform) => {
				platform.position.x -= player.speed;
			});
			genericObjects.forEach((genericObject) => {
				genericObject.position.x -= player.speed * 0.66;
			});
		} else if (keys.left.pressed && scrollOffset > 0) {
			scrollOffset -= scrollRate;
			platforms.forEach((platform) => {
				platform.position.x += player.speed;
			});
			genericObjects.forEach((genericObject) => {
				genericObject.position.x += player.speed * 0.66;
			});
		}
	}
	// platform collission detection
	platforms.forEach((platform) => {
		if (
			player.position.y + player.height <= platform.position.y &&
			player.position.y + player.height + player.velocity.y >=
				platform.position.y &&
			player.position.x + player.width >= platform.position.x &&
			player.position.x <= platform.position.x + platform.width
		) {
			player.velocity.y = 0;
		}
	});
	// win condition
	if (scrollOffset > 6000) {
		console.log("Winner winner");
	}
	// lose condition
	if (player.position.y > canvas.height) {
		// reset
		init();
	}
}

init();
animate();

// EVENT LISTENERS

addEventListener("keydown", ({ key }) => {
	switch (key.toLowerCase()) {
		case "a":
			console.log("left");
			keys.left.pressed = true;
			break;
		case "s":
			console.log("down");
			break;
		case "d":
			console.log("right");
			keys.right.pressed = true;
			break;
		case "w":
			console.log("up");
			if (player.position.y > 0) {
				player.velocity.y -= player.jump;
			}
			break;
	}
});

addEventListener("keyup", ({ key }) => {
	switch (key.toLowerCase()) {
		case "a":
			console.log("left");
			keys.left.pressed = false;
			break;
		case "s":
			console.log("down");
			break;
		case "d":
			console.log("right");
			keys.right.pressed = false;
			break;
		case "w":
			console.log("up");
			break;
	}
});
