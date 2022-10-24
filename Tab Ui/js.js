const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$(".tab-item");
const panes = $$(".tab-pane");
const tabActive = $(".tab-item.active");
const line = $(".tab-line");

requestIdleCallback(function () {
	line.style.width = tabActive.offsetWidth + "px";
	line.style.left = tabActive.offsetLeft + "px";
});

function active(index) {
	$(".tab-item.active").classList.remove("active");
	tabs[index].classList.add("active");
	$(".tab-pane.active").classList.remove("active");
	panes[index].classList.add("active");
	line.style.width = tabs[index].offsetWidth + "px";
	line.style.left = tabs[index].offsetLeft + "px";
}

var isPause = false;
var indexCurrent = 0;

$(".tabs").onmouseover = function () {
	isPause = true;
};

$(".tabs").onmouseout = function () {
	isPause = false;
};

setInterval(() => {
	if (!isPause) {
		active(indexCurrent);
		if (indexCurrent == tabs.length - 1) {
			indexCurrent = 0;
		} else {
			indexCurrent++;
		}
	}
}, 1000);
// <-- Dùng phím arrow để di chuyển qua lạis -->s
// document.addEventListener("keydown", function (e) {
// 	if (e.key === "ArrowRight") {
// 		for (let i = 0; i < tabs.length - 1; i++) {
// 			if (tabs[i].classList.contains("active") === true) {
// 				tabs[i + 1].click();
// 				break;
// 			}
// 		}
// 	}

// 	if (e.key === "ArrowLeft") {
// 		for (let i = tabs.length - 1; i > 0; i--) {
// 			if (tabs[i].classList.contains("active") === true) {
// 				tabs[i - 1].click();
// 				break;
// 			}
// 		}
// 	}
// });
