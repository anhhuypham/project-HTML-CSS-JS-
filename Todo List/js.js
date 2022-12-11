const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const button = $("button");
const input = $("input");
const listTodo = $(".list");

function start() {
	button.onclick = function (e) {
		e.preventDefault();
		const value = input.value;
		addItem({
			text: value,
		});
		input.value = "";
		input.focus();
	};
	removeItem();
	markItem();
}
start();

function addItem(options) {
	const item = document.createElement("li");
	item.innerHTML = `
        <span>${options.text}</span>
        <ion-icon class="icon" name="close-circle-outline"></ion-icon>
    `;

	if (options.text === "") alert("Vui lòng nhập lại!!");
	else {
		listTodo.appendChild(item);
		saveData();
	}
	removeItem();
	markItem();
}

function removeItem() {
	const removeButtons = $$("ion-icon");
	for (let removeButton of removeButtons) {
		removeButton.onclick = function (e) {
			const parentItem = e.target.closest("li");
			listTodo.removeChild(parentItem);
			saveData();
		};
	}
}

function markItem() {
	const items = $$("li");
	for (let item of items) {
		item.onclick = function (e) {
			e.target.closest("li").classList.toggle("completed");
			saveData();
		};
	}
}

function saveData() {
	const items = $$("li");
	const storeItem = Array.from(items).map((item) => {
		let text = item.querySelector("span").innerText;
		let status = item.getAttribute("class");
		return {
			text,
			status,
		};
	});
	localStorage.setItem("todoList", JSON.stringify(storeItem));
}

function init() {
	const data = JSON.parse(localStorage.getItem("todoList"));
	console.log(data);
	data.forEach((item) => addItem(item));
}
init();
