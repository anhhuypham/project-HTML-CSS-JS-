// const PLAYER_STORAGE_KEY = "todos";
// export default function config() {
// 	return {
// 		get() {
// 			return JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || [];
// 		},
// 		set(item) {
// 			localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(item));
// 		},
// 	};
// }

const TODO_STORAGE_KEY = "todos";
export default function config() {
	return {
		get() {
			return JSON.parse(localStorage.getItem(TODO_STORAGE_KEY)) || [];
		},
		set(item) {
			localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(item));
		},
	};
}
