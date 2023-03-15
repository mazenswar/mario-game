class Projectile {
	constructor({ x, y }) {
		(this.x = x), (this.y = y), (this.velocity = 10);
	}

	draw() {
		context.fillStyle = "red";
		context.fillRect(this.x, this.y, 30, 30);
	}
	update() {
		this.draw();
		if (this.x > 3000) {
			this.velocity = 0;
		} else {
			this.x += this.velocity;
		}
	}
}
