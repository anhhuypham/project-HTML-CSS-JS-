import html from "../core.js";

export default function Note() {
	return html`<div class="take-note">
		<h1>Note Taker</h1>
		<p>Add a New Note:</p>
		<div class="title">
			<label for="title">Title</label>
			<input type="text" name="title" id="text" placeholder="Enter a note title" />
		</div>
		<div class="content">
			<label for="content">Note</label>
			<textarea name="" id="" cols="30" rows="10" placeholder="Enter note text"></textarea>
		</div>
		<button class="btn">Submit</button>
	</div>`;
}
