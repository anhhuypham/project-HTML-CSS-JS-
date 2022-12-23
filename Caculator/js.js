const numbers = document.querySelectorAll(".btn");
const result = document.querySelector(".result");
const clear = document.querySelector(".clear");
const type = document.querySelector(".icon-mode");
const main = document.getElementById("main");
const listHis = document.querySelector(".list-history");
const clearHis = document.querySelector(".clear-history");

const history = [];
let caculate = "";
let answer = "";

for (let number of numbers) {
	number.addEventListener("click", function () {
		result.innerHTML += this.value;
	});
}
function equal() {
	let res = result.innerHTML;
	let output = eval(res);
	caculate = res;
	answer = output;
	history.push({ caculate, answer });
	showHistory();
	result.innerHTML = output;
}

function showHistory() {
	let html = "";
	for (let cal of history) {
		html += `<p>${cal.caculate} = ${cal.answer}</p>`;
	}
	listHis.innerHTML = html;
}

clear.onclick = function () {
	result.innerHTML = "";
};

function undo() {
	let res = result.innerHTML;
	result.innerHTML = res.substring(0, res.length - 1);
}

type.onclick = function () {
	main.classList.toggle("dark-mode");
};

document.querySelector(".history").onclick = function () {
	listHis.classList.toggle("toggle");
};

clearHis.onclick = function () {
	listHis.innerHTML = "";
};

// var arr = [1, 2, 3];
// const [a, ...b] = arr;
// console.log(b);
// function show(...rest) {
// 	console.log(rest);
// }

// show(1, 2, 3, 4);

// var arr1 = [4, 5, 6];
// var arr2 = [...arr, ...arr1];
// console.log(arr2);

// var obj = {
// 	id: 1,
// 	name: "Huy",
// };

// console.log(Object.keys(obj));
// console.log(Object.values(obj));
// console.log(Object.entries(obj));

// const { id, name, age = 18 } = obj;
// console.log(id);
// console.log(name);
// console.log(age);
// obj.age = 18;
// console.log(obj);

let x = {};
var arr = [];
x.__proto__.hi = 10;
Object.prototype.hi = ++x.hi;
console.log(x);
console.log(Object.prototype.isPrototypeOf(arr));
