const platformImg = "./img/platform.png";
const backgroundImg = "./img/background.png";
const hillsImg = "./img/hills.png";
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const gravity = 0.5;
const velocityRate = { x: 5, y: 15 };
const movementRange = {
	left: 100,
	right: 500,
};
let scrollOffset = 0;
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
		this.position = {
			x: 100,
			y: 100,
		};
		this.height = 30;
		this.width = 30;
		this.velocity = {
			x: 0,
			y: 1,
		};
	}

	draw() {
		context.fillStyle = "red";
		context.fillRect(this.position.x, this.position.y, this.width, this.height);
	}

	update() {
		this.draw();
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		if (this.height + this.position.y + this.velocity.y <= canvas.height) {
			this.velocity.y += gravity;
		} else {
			this.velocity.y = 0;
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
const player = new Player();
const platformImage = createImage(platformImg);
const platforms = [
	new Platform({ x: 0, y: 470, image: platformImage }),
	new Platform({ x: platformImage.width - 2, y: 470, image: platformImage }),
];
const genericObjects = [
	new GenericObject({ x: -1, y: -1, image: createImage(backgroundImg) }),
	new GenericObject({ x: 0, y: 0, image: createImage(hillsImg) }),
];

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
		player.velocity.x = velocityRate.x;
	} else if (keys.left.pressed && player.position.x >= movementRange.left) {
		player.velocity.x = velocityRate.x * -1;
	} else {
		player.velocity.x = 0;
		if (keys.right.pressed) {
			scrollOffset += scrollRate;
			platforms.forEach((platform) => {
				platform.position.x -= velocityRate.x;
			});
			genericObjects.forEach((genericObject) => {
				genericObject.position.x -= 3;
			});
		} else if (keys.left.pressed) {
			scrollOffset -= scrollRate;
			platforms.forEach((platform) => {
				platform.position.x += velocityRate.x;
			});
			genericObjects.forEach((genericObject) => {
				genericObject.position.x += 3;
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

	if (scrollOffset > 2000) {
		console.log("Winner winner");
	}
}

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
			player.velocity.y -= velocityRate.y;
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
