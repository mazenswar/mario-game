const platformImg = "./img/platform.png";
const pImg = createImage(platformImage);
class Level {
	constructor({ num, platforms, genericObjects, winCondition }) {
		this.num = num;
		this.platforms = platforms;
		this.genericObjects = genericObjects;
		this.winCondition = winCondition;
		this.length;
	}

	getPlatforms() {
		const startPosition = { x: 0, y: 470 };
		const y = startPosition.y;
		const platforms = [];
		while (y < this.length) {
			platforms.push(new Platform({ x: 0, y: (y += pImg.width), image: pImg }));
		}
		return platforms;
	}

	start() {}
}
