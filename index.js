const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const gravity = 0.5;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
		this.position.y += this.velocity.y;
		if (this.height + this.position.y + this.velocity.y <= canvas.height) {
			this.velocity.y += gravity;
		} else {
			this.velocity.y = 0;
		}
	}
}

const player = new Player();

function animate() {
	requestAnimationFrame(animate);
	context.clearRect(0, 0, canvas.width, canvas.height);
	player.update();
}

animate();
