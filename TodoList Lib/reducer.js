// import config from "./util/storage.js";

// const init = {
// 	todos: config().get(),
// 	filter: "all",
// 	filters: {
// 		all: () => true,
// 		active: (todo) => !todo.completed,
// 		completed: (todo) => todo.completed,
// 	},
// 	editIndex: null,
// };

// const actions = {
// 	add({ todos }, title) {
// 		todos.push({ title, completed: false });
// 		config().set(todos);
// 	},
// 	toggle({ todos }, index) {
// 		const todo = todos[index];
// 		todo.completed = !todo.completed;
// 		config().set(todos);
// 	},
// 	toggleAll({ todos }, completed) {
// 		todos.forEach((todo) => (todo.completed = completed));
// 	},
// 	remove({ todos }, index) {
// 		todos.splice(index, 1);
// 		config().set(todos);
// 	},
// 	switchFilter(state, filter) {
// 		state.filter = filter;
// 	},
// 	clearCompleted(state) {
// 		state.todos = state.todos.filter(state.filters.active);
// 		config().set(state.todos);
// 	},
// 	startEdit(state, index) {
// 		state.editIndex = index;
// 	},
// 	edit(state, value) {
// 		if (state.editIndex !== null) {
// 			if (value) {
// 				state.todos[state.editIndex].title = value;
// 				config().set(state.todos);
// 			} else {
// 				this.remove(state, state.editIndex);
// 			}
// 			state.editIndex = null;
// 		}
// 	},
// 	clearEdit(state) {
// 		state.editIndex = null;
// 	},
// };
// export default function reducer(state = init, action, args) {
// 	actions[action] && actions[action](state, ...args);
// 	return state;
// }

import config from "./util/storage.js";
const init = {
	todos: config().get(),
	filter: "all",
	filters: {
		all: () => true,
		active: (todo) => !todo.completed,
		completed: (todo) => todo.completed,
	},
	editIndex: null,
};
const actions = {
	add({ todos }, title) {
		todos.push({ title, completed: false });
		config().set(todos);
	},
	toggle({ todos }, index) {
		const todo = todos[index];
		todo.completed = !todo.completed;
		config().set(todos);
	},
	remove({ todos }, index) {
		todos.splice(index, 1);
		config().set(todos);
	},
	toggleAll({ todos }, completed) {
		todos.forEach((todo) => (todo.completed = completed));
	},
	switchFilter(state, type) {
		state.filter = type;
	},
	clearCompleted(state) {
		state.todos = state.todos.filter(state.filters.active);
		config().set(state.todos);
	},
	startEdit(state, index) {
		state.editIndex = index;
	},
	edit(state, index, value) {
		if (state.editIndex !== null) {
			state.todos[index].title = value;
			state.editIndex = null;
		}
		config().set(state.todos);
	},
	clearEdit(state) {
		state.editIndex = null;
	},
};
export default function reducer(state = init, action, args) {
	actions[action] && actions[action](state, ...args);
	return state;
}
