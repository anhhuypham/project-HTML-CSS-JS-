// const app = (function () {
// 	const cars = ["HUY"];
// 	return {
// 		getCar(index) {
// 			return cars[index];
// 		},
// 		add(car) {
// 			cars.push(car);
// 		},
// 		delete(index) {
// 			cars.splice(index, 1);
// 		},
// 		show() {
// 			for (var car of cars) {
// 				console.log(car);
// 			}
// 		},
// 	};
// })();

function createLogger(namespace) {
	return function (message) {
		console.log(`[${namespace}]: ${message}`);
	};
}

function createStorage(key) {
	const store = localStorage.getItem(key) ?? {};

	const save = () => {
		localStorage.setItem(key, JSON.stringify(store));
	};
	return {
		add(key, value) {
			store[key] = value;
			save();
		},
		remove(key) {
			delete store[key];
		},
	};
}

// const storage = createStorage("setting");
// storage.add("id", 1);

function Car(id, name) {
	this.id = id;
	this.name = name;
	this.showName = function () {
		//Method
		return function show() {
			//Function
			console.log(this);
		};
	};
}

// var car1 = new Car(1, "BMW");
// car1.showName()();

const module = {
	x: 42,
	getX(...a) {
		console.log(...a);
		return this.x;
	},
};

// console.log(module.getX());
// const showX = module.getX.bind(module, 5, 6);
// console.log(showX(3, 4));

("use strict"); // prevent `this` from being boxed into the wrapper object

function log(...args) {
	console.log(this, ...args);
}

// const boundLog = log.bind("this value", 1);
// boundLog();
// const boundLog2 = boundLog.bind("new this value", 3);
// boundLog2();

// Handle with add car and remove car
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = (function () {
	const cars = ["BMW"];
	const root = $("#root");
	const submit = $("#submit");
	const input = $("#input");

	return {
		add(car) {
			cars.push(car);
		},
		delete(index) {
			cars.splice(index, 1);
		},
		render() {
			const html = cars
				.map(function (car, index) {
					return `<li>
                                ${car}
                                <span class="delete" data-index=${index}>&times;</span>
                            </li>`;
				})
				.join("");
			root.innerHTML = html;
		},
		handleDelete(e) {
			const deleteBtn = e.target.closest(".delete");
			if (deleteBtn) {
				const index = deleteBtn.dataset.index;
				this.delete(index);
				this.render();
			}
		},
		init() {
			submit.onclick = () => {
				this.add(input.value);
				this.render();
				input.value = "";
				input.focus();
			};
			root.onclick = this.handleDelete.bind(this);
			this.render();
		},
	};
})();

app.init();
