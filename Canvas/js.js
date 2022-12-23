const color = document.querySelector(".color");
const eraser = document.querySelector(".eraser");
const decrease = document.querySelector(".decrease");
const size = document.querySelector(".size");
const increase = document.querySelector(".increase");
const save = document.querySelector(".save");
const clear = document.querySelector(".clear");
const canvas = document.querySelector(".canvas");
const download = document.querySelector(".download");
var ctx = canvas.getContext("2d");

var pos1 = {
	x: 0,
	y: 0,
};

var pos2 = {
	x: 0,
	y: 0,
};

var isDrawing = false;
var currentColor = "black";
var sizeLine = size.innerText;
canvas.addEventListener("mousedown", function (e) {
	pos1 = {
		x: e.offsetX,
		y: e.offsetY,
	};
	isDrawing = true;
});

canvas.addEventListener("mousemove", function (e) {
	if (isDrawing && sizeLine != 0) {
		pos2 = {
			x: e.offsetX,
			y: e.offsetY,
		};

		ctx.beginPath();
		ctx.arc(pos1.x, pos1.y, sizeLine, 0, 2 * Math.PI);
		ctx.fillStyle = currentColor;
		ctx.fill();

		ctx.beginPath();
		ctx.moveTo(pos1.x, pos1.y);
		ctx.lineTo(pos2.x, pos2.y);
		ctx.strokeStyle = currentColor;
		ctx.lineWidth = sizeLine * 2;
		ctx.stroke();

		pos1.x = pos2.x;
		pos1.y = pos2.y;
	}
});

canvas.addEventListener("mouseup", function () {
	isDrawing = false;
});

color.addEventListener("input", function (e) {
	currentColor = e.target.value;
});

eraser.addEventListener("click", function () {
	currentColor = "#fff";
});

increase.addEventListener("click", function () {
	size.innerHTML = Number(size.innerText) + 5;
	sizeLine = size.innerHTML;
});

decrease.addEventListener("click", function () {
	size.innerHTML = Number(size.innerText) - 5;
	sizeLine = size.innerHTML;
});

save.addEventListener("click", function () {
	var dataURL = canvas.toDataURL("image/jpeg").replace("image/png", "image/octet-stream");
	save.setAttribute("href", dataURL);
});

clear.addEventListener("click", function () {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
});
