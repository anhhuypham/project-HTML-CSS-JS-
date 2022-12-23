// import { inputText, inputTitle } from "./js/main.js";

const init = {
	items: [
		{
			title: "Tilte something here",
			content:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, ad unde minus aliquid id maxime optio repellat vero consectetur alias eos possimus ratione expedita quasi illo! Laboriosam est impedit ullam.",
		},
	],
};

const actions = {
	add({ items }, tilte, value) {},
};
export default function reducer(state = init, action, args) {
	actions[action] && actions[action](state, ...args);
	return state;
}

export { init };
