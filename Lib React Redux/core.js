export default function html([first, ...strings], ...values) {
	return values
		.reduce((acc, cur) => acc.concat(cur, strings.shift()), [first])
		.filter((x) => (x && x !== true) || x === 0)
		.join("");
}

export function createStore(reducer) {
	let state = reducer(); // giá trị default của reducer là init(data xe)
	const roots = new Map();

	function render() {
		for (let [root, component] of roots) {
			const output = component();
			root.innerHTML = output;
		}
	}

	return {
		attach(component, root) {
			roots.set(root, component);
			render();
		},
		connect(selector = (state) => state) {
			return (component) =>
				(props, ...args) =>
					component(Object.assign({}, props, selector(state), ...args)); // lấy lun state mà state ở đây là init của bên reducer
		},
		dispatch(action, ...args) {
			state = reducer(state, action, args);
			render();
		},
	};
}
