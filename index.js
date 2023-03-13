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
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
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
	constructor({ x, y }) {
		this.position = {
			x,
			y,
		};
		this.width = 200;
		this.height = 20;
	}

	draw() {
		context.fillStyle = "blue";
		context.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
}
//////////////////////// INIT
const player = new Player();
const platforms = [
	new Platform({ x: 300, y: 600 }),
	new Platform({ x: 600, y: 400 }),
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
	context.clearRect(0, 0, canvas.width, canvas.height);
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
		} else if (keys.left.pressed) {
			scrollOffset -= scrollRate;
			platforms.forEach((platform) => {
				platform.position.x += velocityRate.x;
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
