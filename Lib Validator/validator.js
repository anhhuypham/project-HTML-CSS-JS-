// function Validator(formSelector, options = {}) {
// 	//Hàm lấy thẻ cha của thẻ input
// 	function getParent(element, selector) {
// 		while (element.parentElement) {
// 			if (element.parentElement.matches(selector)) return element.parentElement;
// 			element = element.parentElement;
// 		}
// 	}
// 	//Chứa các rule
// 	var formRules = {};
// 	var formElement = document.querySelector(formSelector);

// 	//Chứa các function thực hiện rule
// 	var validatorRules = {
// 		required: function (value) {
// 			return value.trim() ? undefined : "Vui lòng nhập trường này";
// 		},
// 		email: function (value) {
// 			var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// 			return regex.test(value) ? undefined : "Trường này phải là email";
// 		},
// 		min: function (min) {
// 			return function (value) {
// 				return value.length >= min ? undefined : `Nhập tối thiểu ${min} kí tự`;
// 			};
// 		},
// 	};

// 	if (formElement) {
// 		var inputs = formElement.querySelectorAll("[name][rules]");
// 		for (var input of inputs) {
// 			var rules = input.getAttribute("rules").split("|"); // Mảng các rule
// 			var ruleInfo;

// 			for (var rule of rules) {
// 				var hasValue = rule.includes(":");
// 				if (hasValue) {
// 					ruleInfo = rule.split(":");
// 					rule = ruleInfo[0];
// 					// ruleInfo[1] = 6
// 				}
// 				//Gán function theo rule
// 				var ruleFunc = validatorRules[rule];

// 				//Lấy function con của function min
// 				if (hasValue) {
// 					ruleFunc = ruleFunc(ruleInfo[1]);
// 				}

// 				if (Array.isArray(formRules[input.name])) {
// 					formRules[input.name].push(ruleFunc);
// 				} else {
// 					formRules[input.name] = [ruleFunc];
// 				}
// 			}

// 			//Lắng nghe sự kiện
// 			input.onblur = handleValidate;
// 			input.oninput = handleClearValidate;
// 		}

// 		//Hàm blur
// 		function handleValidate(event) {
// 			var rules = formRules[event.target.name];
// 			var formGroup = getParent(event.target, ".form-group");

// 			var formMessage = formGroup.querySelector(".form-message");
// 			for (var rule of rules) {
// 				var errorMessage = rule(event.target.value);
// 				if (errorMessage) break;
// 			}

// 			if (errorMessage) {
// 				formGroup.classList.add("invalid");
// 				formMessage.innerText = errorMessage;
// 			} else {
// 				formGroup.classList.remove("invalid");
// 				formMessage.innerText = "";
// 			}

// 			return !errorMessage;
// 		}

// 		//Clear message lỗi
// 		function handleClearValidate(event) {
// 			var formGroup = getParent(event.target, ".form-group");

// 			if (formGroup.classList.contains("invalid")) {
// 				formGroup.classList.remove("invalid");
// 				var formMessage = formGroup.querySelector(".form-message");
// 				if (formMessage) {
// 					formMessage.innerText = "";
// 				}
// 			}
// 		}
// 	}

// 	//Xử lý hành vi submit form
// 	formElement.onsubmit = function (e) {
// 		e.preventDefault();
// 		var inputs = formElement.querySelectorAll("[name][rules]");
// 		var isValid = false;
// 		for (var input of inputs) {
// 			if (handleValidate({ target: input })) {
// 				isValid = true;
// 			}
// 		}

// 		if (isValid) {
// 			//TH submit with JS
// 			if (typeof options.onSubmit === "function") {
// 				var enableInput = formElement.querySelectorAll("[name][rules]"); //NodeList (4)
// 				var formValue = Array.from(enableInput).reduce(function (values, input) {
// 					values[input.name] = input.value;
// 					return values;
// 				}, {}); //Chuyển qua Array
// 				//TH submit default
// 				options.onSubmit(formValue);
// 			} else {
// 				formElement.submit();
// 			}
// 		}
// 	};
// }

// function Person(name) {
// 	console.log(name);
// }

function Validator(selector, options = {}) {
	var formRules = {};
	var formElement = document.querySelector(selector);

	var validateRules = {
		required: function (value) {
			return value.trim() ? undefined : "Vui lòng nhập trường này";
		},
		email: function (value) {
			var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
			return regex.test(value) ? undefined : "Trường này phải là email";
		},
		min: function (min) {
			return function (value) {
				return value.length >= min ? undefined : `Nhập tối thiểu ${min} kí tự`;
			};
		},
	};

	if (formElement) {
		var inputs = formElement.querySelectorAll("[name][rules]");
		for (var input of inputs) {
			var rules = input.getAttribute("rules").split("|");
			var ruleInfo;

			for (var rule of rules) {
				var hasValue = rule.includes(":");
				if (hasValue) {
					ruleInfo = rule.split(":");
					rule = ruleInfo[0];
				}

				var ruleFunc = validateRules[rule];

				if (hasValue) ruleFunc = ruleFunc(ruleInfo[1]);

				if (Array.isArray(formRules[input.name])) {
					formRules[input.name].push(ruleFunc);
				} else {
					formRules[input.name] = [ruleFunc];
				}
			}

			input.onblur = handleValidate;
			input.oninput = handleClearValidate;
		}

		function handleValidate(e) {
			var rules = formRules[e.target.name];
			var formGroup = e.target.closest(".form-group");
			var formMessage = formGroup.querySelector(".form-message");
			var errorMessage;
			for (var rule of rules) {
				errorMessage = rule(e.target.value);
				if (errorMessage) break;
			}

			if (errorMessage) {
				formGroup.classList.add("invalid");
				formMessage.innerText = errorMessage;
			}

			return !errorMessage;
		}

		function handleClearValidate(e) {
			var formGroup = e.target.closest(".form-group");
			var formMessage = formGroup.querySelector(".form-message");

			if (formGroup.classList.contains("invalid")) {
				formGroup.classList.remove("invalid");

				if (formMessage) {
					formMessage.innerText = "";
				}
			}
		}
	}

	formElement.onsubmit = function (e) {
		e.preventDefault();
		var inputs = formElement.querySelectorAll("[name][rules]");
		var isValid = true;
		for (var input of inputs) {
			if (!handleValidate({ target: input })) isValid = false;
		}

		if (isValid) {
			var enableInputs = formElement.querySelectorAll("[name][rules]");
			var formInput = Array.from(enableInputs).reduce(function (values, input) {
				values[input.name] = input.value;
				return values;
			}, {});

			options.onSubmit(formInput);
		}
	};
}

const app = (function () {
	const cars = ["HUY"];
	return {
		getCar(index) {
			return cars[index];
		},
		add(car) {
			cars.push(car);
		},
		delete(index) {
			cars.splice(index, 1);
		},
		show() {
			for (var car of cars) {
				console.log(car);
			}
		},
	};
})();

function createLogger(namespace) {
	return function (message) {
		console.log(`[${namespace}]: ${message}`);
	};
}

function createStorage(key) {
	const store = JSON.parse(localStorage.getItem(key)) ?? {};
	const save = () => {
		localStorage.setItem(key, JSON.stringify(store));
	};
	const storage = {
		get(key) {
			return store[key];
		},

		set(key, value) {
			store[key] = value;
			save();
		},

		delete(key) {
			delete store[key];
			save();
		},
	};
	return storage;
}

const storage1 = createStorage("fullName");
console.log(storage1.get("fullName"));
localStorage.removeItem("myCat");
