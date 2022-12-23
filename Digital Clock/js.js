function showTime() {
	const date = new Date();
	let h = date.getHours();
	let m = date.getMinutes();
	let s = date.getSeconds();

	let session = "AM";

	if (h > 12) {
		h = h - 12;
		session = "PM";
	}
	if (h == 0) {
		h = 12;
	}
	m = m < 10 ? "0" + m : m;
	s = s < 10 ? "0" + s : s;

	const time = h + ":" + m + ":" + s + " " + session;
	document.querySelector(".clock").innerText = time;
	setTimeout(showTime, 1000);
}

showTime();
