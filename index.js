const platformImg = "./img/platform.png";
const backgroundImg = "./img/background.png";
const hillsImg = "./img/hills.png";
const spriteStandRight = "./img/stand-right.png";
const spriteRunRight = "./img/spriteRunRight.png";
const platformSmallTall = "./img/platformSmallTall.png";
const run = "./img/run-2.png";

//////////////////////// INIT
let scrollOffset = 0;
let player = new Player();
let platformImage = createImage(platformImg);
let platforms = [];
let genericObjects = [];
let coins = [...Array(10).keys()].map((id) => {
	return new Coin({
		id,
		position: { x: 300 * (id + 1), y: 300 },
		originalPosition: { x: 300 * (id + 1), y: 300 },
	});
});
function init() {
	scrollOffset = 0;
	player = new Player();
	platformImage = createImage(platformImg);
	coins.forEach((coin) => {
		coin.position = { ...coin.originalPosition };
	});
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
	// render objects
	genericObjects.forEach((genericObject) => {
		genericObject.draw();
	});
	platforms.forEach((platform) => {
		platform.draw();
	});
	coins.forEach((coin) => {
		coin.draw();
	});
	player.update();
	// render stats
	context.fillStyle = "white";
	context.font = "40px serif";
	context.fillText(`${player.coins}`, 950, 50);
	const c = new Coin({
		id: 0,
		position: { x: 905, y: 40 },
		originalPosition: { x: 905, y: 35 },
	});
	c.draw();
	// move player & parallax
	if (keys.right.pressed && player.position.x <= movementRange.right) {
		player.velocity.x = player.speed;
	} else if (
		(keys.left.pressed && player.position.x >= movementRange.left) ||
		(keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
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
			coins.forEach((coin) => {
				coin.position.x -= player.speed;
			});
		} else if (keys.left.pressed && scrollOffset > 0) {
			scrollOffset -= scrollRate;
			platforms.forEach((platform) => {
				platform.position.x += player.speed;
			});
			genericObjects.forEach((genericObject) => {
				genericObject.position.x += player.speed * 0.66;
			});
			coins.forEach((coin) => {
				coin.position.x += player.speed;
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
	// coin collission detection
	coins.forEach((coin) => {
		if (
			player.position.y + player.height >= coin.position.y &&
			player.position.y <= coin.position.y + coin.radius &&
			player.position.x + player.width >= coin.position.x &&
			player.position.x <= coin.position.x + coin.radius
		) {
			player.coins += 1;
			coins = coins.filter((c) => c.id !== coin.id);
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
			// left
			keys.left.pressed = true;
			break;
		case "s":
			// down
			break;
		case "d":
			// right
			keys.right.pressed = true;
			break;
		case "w":
			// up
			if (player.velocity.y == 0) {
				player.velocity.y -= player.jump;
			}
			break;
		case "q":
			keys.shoot.pressed = true;
		// shoot
	}
});

addEventListener("keyup", ({ key }) => {
	switch (key.toLowerCase()) {
		case "a":
			// left
			keys.left.pressed = false;
			break;
		case "s":
			// down
			break;
		case "d":
			// right
			keys.right.pressed = false;
			break;
		case "w":
			// up
			break;
		case "q":
			// shoot
			keys.shoot.pressed = false;
	}
});
