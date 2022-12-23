import html from "../core.js";
import { connect } from "../store.js";

function Item({ item }) {
	return html` <div class="note">
		<h2>${item.title}</h2>
		<p>${item.content}</p>
		<div class="note-btn">
			<button class="detail">View Detail</button>
			<button class="delete-node">Delete Note</button>
		</div>
	</div>`;
}

export default connect()(Item);
