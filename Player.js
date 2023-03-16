const run = "./img/run-4.png";

class Player {
	constructor() {
		this.speed = 10;
		this.jump = 15;
		this.position = {
			x: 100,
			y: 100,
		};
		this.height = 135;
		this.width = 120;
		this.velocity = {
			x: 0,
			y: 1,
		};
		this.sprites = {
			run: {
				left: 0,
				right: 0,
			},
		};
		this.currentSprite = createImage(run);
		this.currentCropWidth = 120;
		this.frames = 0;
		this.coins = 0;
		this.lives = 3;
	}

	draw() {
		// context.fillStyle = "red";
		// context.fillRect(this.position.x, this.position.y, this.width, this.height);
		context.drawImage(
			this.currentSprite,
			this.currentCropWidth * this.frames,
			0,
			this.currentCropWidth,
			140,
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
