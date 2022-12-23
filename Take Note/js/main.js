import app from "../components/app.js";
import { attach } from "../store.js";
import { init } from "../reducer.js";

attach(app, document.querySelector("#root"));

const inputTitle = document.querySelector('input[name="title"]');
const inputText = document.querySelector("textarea");

const submitButton = document.querySelector(".btn");
submitButton.onclick = function () {
	let item = { title: inputTitle.value, content: inputText.value };
	init.items.push(item);
};
console.log(init);
