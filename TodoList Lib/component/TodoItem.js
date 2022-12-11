// import html from "../core.js";
// import { connect } from "../store.js";

// function TodoItem({ todo, index, editIndex }) {
// 	return html`
// 		<li class="${todo.completed && "completed"} ${editIndex == index && "editing"}">
// 			<div class="view">
// 				<input class="toggle" type="checkbox" ${todo.completed && "checked"} onchange="dispatch('toggle', ${index})" />
// 				<label ondblclick="dispatch('startEdit', ${index})">${todo.title}</label>
// 				<button class="destroy" onclick="dispatch('remove', ${index})"></button>
// 			</div>
// 			<input
// 				class="edit"
// 				value="${todo.title}"
// 				onkeyup="event.keyCode === 13 && dispatch('edit', this.value.trim()) || event.keyCode === 27 && dispatch('clearEdit')"
// 				||
// 				onblur="dispatch('edit', this.value.trim())"
// 			/>
// 		</li>
// 	`;
// }
// export default connect()(TodoItem);

import html from "../core.js";
import { connect } from "../store.js";

function TodoItem({ todo, editIndex, index }) {
	return html`<li class="${todo.completed && "completed"} ${editIndex === index && "editing"}" ondblclick="dispatch('startEdit', ${index})">
		<div class="view">
			<input class="toggle" type="checkbox" ${todo.completed && "checked"} onclick="dispatch('toggle', ${index})" " />
			<label>${todo.title}</label>
			<button class="destroy" onclick="dispatch('remove', ${index})"></button>
		</div>
		<input
			class="edit"
			value="${todo.title}"
			onkeyup="event.keyCode === 13 && dispatch('edit', ${index}, this.value.trim()) || event.keyCode === 27 && dispatch('clearEdit')"
			onblur="
		dispatch('edit', ${index}, this.value.trim())"
		/>
	</li>`;
}

export default connect()(TodoItem);
