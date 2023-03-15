const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const gravity = 0.5;
const movementRange = {
	left: 90,
	right: 500,
};
const scrollRate = 5;
canvas.width = 1024;
canvas.height = 576;
