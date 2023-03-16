class Coin {
	constructor({ position, id, originalPosition }) {
		this.position = position;
		this.originalPosition = originalPosition;
		this.id = id;
		this.radius = 20;
	}

	draw() {
		context.fillStyle = "gold";
		// context.fillRect(this.x, this.y, 100, 100);
		context.beginPath();
		context.arc(
			this.position.x,
			this.position.y,
			this.radius,
			0,
			Math.PI * 2,
			true
		); // Outer circle
		context.fill();
	}
}
