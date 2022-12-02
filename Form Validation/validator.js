function Validator(options) {
	function getParent(element, selector) {
		while (element.parentElement) {
			if (element.parentElement.matches(selector)) {
				return element.parentElement;
			}
			element = element.parentElement;
		}
	}

	var selectorRule = {};

	//Function validate
	function validate(inputElement, rule) {
		var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
		var errorMessage;

		//Lấy ra các rules của từng selectorRule
		var rules = selectorRule[rule.selector];
		//Lặp qua rules (array)
		for (let i = 0; i < rules.length; i++) {
			switch (inputElement.type) {
				case "radio":
				case "checkbox":
					errorMessage = rules[i](formElement.querySelector(rule.selector + ":checked"));
					break;
				default:
					errorMessage = rules[i](inputElement.value);
					break;
			}
			if (errorMessage) break;
		}

		if (errorMessage) {
			errorElement.textContent = errorMessage;
			getParent(inputElement, options.formGroupSelector).classList.add("invalid");
		} else {
			errorElement.textContent = "";
			getParent(inputElement, options.formGroupSelector).classList.remove("invalid");
		}

		return !errorMessage;
	}

	//Object form --> validate
	var formElement = document.querySelector(options.form);
	if (formElement) {
		//Click submit form
		formElement.onsubmit = function (e) {
			e.preventDefault();

			var isFormValid = true;

			options.rules.forEach(function (rule) {
				var inputElement = formElement.querySelector(rule.selector);
				var isValid = validate(inputElement, rule);
				if (!isValid) {
					isFormValid = false;
				}
			});

			if (isFormValid) {
				//TH submit with JS
				if (typeof options.onSubmit === "function") {
					var enableInput = formElement.querySelectorAll("[name]:not([disabled])"); //NodeList (4)
					var formValue = Array.from(enableInput).reduce(function (values, input) {
						switch (input.type) {
							case "radio":
								values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
								break;
							case "checkbox":
								if (!input.matches(":checked")) {
									values[input.name] = "";
									return values;
								}
								if (!Array.isArray(values[input.name])) values[input.name] = [];
								values[input.name].push(input.value);
								break;
							case "file":
								values[input.name] = input.files;
								break;
							default:
								values[input.name] = input.value;
								break;
						}
						return values;
					}, {}); //Chuyển qua Array
					//TH submit default
					options.onSubmit(formValue);
				} else {
					formElement.submit();
				}
			}
		};

		options.rules.forEach(function (rule) {
			//Lưu cái các rules cho mỗi input = Array
			if (Array.isArray(selectorRule[rule.selector])) {
				selectorRule[rule.selector].push(rule.test);
			} else {
				selectorRule[rule.selector] = [rule.test];
			}
			var inputElements = formElement.querySelectorAll(rule.selector);
			Array.from(inputElements).forEach(function (inputElement) {
				//Xử lí blur khỏi input
				inputElement.onblur = function () {
					validate(inputElement, rule);
				};

				//Xử lí TH lỗi khi input
				inputElement.oninput = function () {
					var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
					errorElement.textContent = "";
					getParent(inputElement, options.formGroupSelector).classList.remove("invalid");
				};
			});
		});
		console.log(selectorRule);
	}
}

//Định nghĩa rule
//Nguyên tắc rule
//Khi có lỗi -> msg lỗi
//Khi hợp lệ -> undefined
Validator.isRequired = function (selector, message) {
	return {
		selector,
		test(value) {
			return value ? undefined : message || "Vui lòng nhập trường này";
		},
	};
};

Validator.isEmail = function (selector, message) {
	return {
		selector,
		test(value) {
			var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			return regex.test(value) ? undefined : message || "Trường này phải là email";
		},
	};
};

Validator.minLength = function (selector, min, message) {
	return {
		selector,
		test(value) {
			return value.length >= min ? undefined : message || `Nhập tối thiểu ${min} kí tự`;
		},
	};
};

Validator.isConfirmed = function (selector, getConfirmValue, message) {
	return {
		selector,
		test(value) {
			return value == getConfirmValue() ? undefined : message || "Giá trị nhập vào không chính xác";
		},
	};
};

// function Validator(options) {
// 	var selectorRule = {};

// 	function validate(inputElement, rule) {
// 		var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
// 		var errorMessage;

// 		for (let i = 0; i < selectorRule[rule.selector].length; i++) {
// 			errorMessage = selectorRule[rule.selector][i](inputElement.value);
// 			if (errorMessage) break;
// 		}

// 		if (errorMessage) {
// 			errorElement.innerText = errorMessage;
// 			inputElement.parentElement.classList.add("invalid");
// 		} else {
// 			errorElement.innerText = "";
// 			inputElement.parentElement.classList.remove("invalid");
// 		}
// 		console.log(errorMessage);

// 		return !errorMessage;
// 	}

// 	var formElement = document.querySelector(options.form);

// 	if (formElement) {
// 		formElement.onsubmit = function (e) {
// 			e.preventDefault();

// 			var isFormValid = true;

// 			options.rules.forEach(function (rule) {
// 				var inputElement = formElement.querySelector(rule.selector);
// 				var isValid = validate(inputElement, rule);
// 				if (!isValid) {
// 					isFormValid = false;
// 				}
// 			});

// 			if (isFormValid) {
// 				if (typeof options.onSubmit === "function") {
// 					var enableInput = formElement.querySelectorAll("[name]");
// 					var formValue = Array.from(enableInput).reduce(function (values, input) {
// 						values[input.name] = input.value;
// 						return values;
// 					}, {});
// 					options.onSubmit(formValue);
// 				}
// 			}
// 		};
// 		options.rules.forEach(function (rule) {
// 			if (Array.isArray(selectorRule[rule.selector])) {
// 				selectorRule[rule.selector].push(rule.test);
// 			} else {
// 				selectorRule[rule.selector] = [rule.test];
// 			}

// 			var inputElement = formElement.querySelector(rule.selector);

// 			if (inputElement) {
// 				inputElement.onblur = function () {
// 					validate(inputElement, rule);
// 				};

// 				inputElement.oninput = function () {
// 					var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
// 					errorElement.innerText = "";
// 					inputElement.parentElement.classList.remove("invalid");
// 				};
// 			}
// 		});
// 	}
// }

// Validator.isRequired = function (selector, message) {
// 	return {
// 		selector,
// 		test(value) {
// 			return value.trim() ? undefined : message || "Vui lòng nhập trường này";
// 		},
// 	};
// };

// Validator.isEmail = function (selector, message) {
// 	return {
// 		selector,
// 		test(value) {
// 			var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// 			return regex.test(value) ? undefined : message || "Trường này phải là email";
// 		},
// 	};
// };

// Validator.minLength = function (selector, min, message) {
// 	return {
// 		selector,
// 		test(value) {
// 			return value.length >= min ? undefined : message || "Nhập tối thiểu 6 kí tự";
// 		},
// 	};
// };

// Validator.isConfirmed = function (selector, getConfirmValue, message) {
// 	return {
// 		selector,
// 		test(value) {
// 			return value === getConfirmValue() ? undefined : message || "Nhập không chính xác";
// 		},
// 	};
// };
