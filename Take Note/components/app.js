import html from "../core.js";
import { connect } from "../store.js";
import Item from "./Item.js";
import Note from "./Note.js";

function App({ items }) {
	return html`<div class="container">
		${Note()}
		<div class="list-note">${items.map((item) => Item({ item }))}</div>
	</div>`;
}

export default connect()(App);
