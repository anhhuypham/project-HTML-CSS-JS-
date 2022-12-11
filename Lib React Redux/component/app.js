import html from "../core.js";
import { connect } from "../store.js";

const connector = connect(); // trả về state

function App({ cars }) {
	return html`<ul>
			${cars.map((car) => `<li>${car}</li>`)}
		</ul>

		<button onclick="dispatch('ADD', 'Porche')">Add cars</button>`;
}

export default connector(App);
