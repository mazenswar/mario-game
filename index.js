const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const gravity = 0.5;
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
	constructor() {
		this.position = {
			x: 200,
			y: 350,
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
const platform = new Platform();
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
	platform.draw();
	player.update();
	if (keys.right.pressed) {
		player.velocity.x = 5;
	} else if (keys.left.pressed) {
		player.velocity.x = -5;
	} else {
		player.velocity.x = 0;
	}
	// platform collission detection
	if (
		player.position.y + player.height <= platform.position.y &&
		player.position.y + player.height + player.velocity.y >=
			platform.position.y &&
		player.position.x + player.width >= platform.position.x &&
		player.position.x <= platform.position.x + platform.width
	) {
		player.velocity.y = 0;
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
			player.velocity.y -= 10;
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
