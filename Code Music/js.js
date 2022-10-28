const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const PLAYER_STORAGE_KEY = "F8-PLAYER";

const heading = $("header h2");
const cdThump = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".cd");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const playlist = $(".playlist");
const progress = $(".progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const tone = $(".tone");
const btnUp = $(".btn-up");
const btnDown = $(".btn-down");

const app = {
	currentIndex: 0,
	isPlaying: false,
	isRandom: false,
	isRepeat: false,
	config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
	songs: [
		{
			name: "Chẳng còn thời gian ấy",
			singer: "Bem",
			path: "./music/song1.mp3",
			image: "./img/img1.jpg",
		},
		{
			name: "Chờ đợi có đáng sợ",
			singer: "Andiez",
			path: "./music/song2.mp3",
			image: "./img/img2.jpg",
		},
		{
			name: "Thêm bao nhiêu lâu",
			singer: "Đạt G",
			path: "./music/song3.mp3",
			image: "./img/img3.jpg",
		},
		{
			name: "Phía sau em",
			singer: "Bem",
			path: "./music/song4.mp3",
			image: "./img/img4.jpg",
		},
		{
			name: "Bài này không để đi diễn",
			singer: "Atus x Diệu Nhi",
			path: "./music/song5.mp3",
			image: "./img/img5.jpg",
		},
		{
			name: "Chẳng thể tìm được em",
			singer: "PhucXp ft. Freak D",
			path: "./music/song6.mp3",
			image: "./img/img6.jpg",
		},
		{
			name: "Vỡ tan",
			singer: "NHA cover",
			path: "./music/song7.mp3",
			image: "./img/img7.jpg",
		},
		{
			name: "Lời tạm biệt chưa nói",
			singer: "GREY D & ORANGE",
			path: "./music/song8.mp3",
			image: "./img/img8.jpg",
		},
		{
			name: "Tình đầu",
			singer: "Tăng Duy Tân",
			path: "./music/song9.mp3",
			image: "./img/img9.jpg",
		},
	],
	setConfig(key, value) {
		this.config[key] = value;
		localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
	},
	render() {
		const htmls = this.songs.map((song, index) => {
			return `
            <div class="song ${index === this.currentIndex ? "active" : ""}" data-index = ${index}>
                <div class="thumb" style="background-image: url(${song.image})"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>`;
		});
		playlist.innerHTML = htmls.join("");
		this.setConfig("currentIndex", this.currentIndex);
	},
	//Xử lí define property
	defineProperty() {
		Object.defineProperty(this, "currentSong", {
			get() {
				return this.songs[this.currentIndex];
			},
		});
	},

	handleEvents() {
		const _this = this;
		//Xử lí đĩa quay
		const cdThumpAnimate = cdThump.animate([{ transform: "rotate(360deg)" }], {
			duration: 10000,
			iterations: Infinity,
		});
		cdThumpAnimate.pause();
		//Xử lí phóng to thu nhỏ CD
		const cdWidth = cd.offsetWidth;
		document.onscroll = function () {
			const scrollTop = window.scrollY || document.documentElement.scrollTop;
			const cdNewWidth = cdWidth - scrollTop;

			cd.style.width = cdNewWidth > 0 ? cdNewWidth + "px" : 0;
			cd.style.opacity = cdNewWidth / cdWidth;
		};
		//Xử lí khi Play music
		playBtn.onclick = function () {
			if (_this.isPlaying) {
				audio.pause();
			} else {
				audio.play();
			}
		};
		//Khi song played
		audio.onplay = function () {
			_this.isPlaying = true;
			player.classList.add("playing");
			cdThumpAnimate.play();
			audio.volume = 1;
		};
		//Khi song paused
		audio.onpause = function () {
			_this.isPlaying = false;
			player.classList.remove("playing");
			cdThumpAnimate.pause();
		};
		//Thanh chạy khi song played
		audio.ontimeupdate = function () {
			if (audio.duration) {
				const progressPercent = (audio.currentTime / audio.duration) * 100;
				progress.value = progressPercent;
			}
		};
		//Khi tua song
		progress.oninput = function (e) {
			const seekTime = (e.target.value * audio.duration) / 100;
			audio.currentTime = seekTime;
		};

		//Khi next song
		nextBtn.onclick = function () {
			if (_this.isRandom) {
				_this.randomSong();
			} else {
				_this.nextSong();
			}
			audio.play();
			_this.render();
			_this.scrollToActiveSong();
		};

		//Khi prev song
		prevBtn.onclick = function () {
			if (_this.isRandom) {
				_this.randomSong();
			} else {
				_this.prevSong();
			}
			audio.play();
			_this.render();
			_this.scrollToActiveSong();
		};

		//Xử lý bật/ tắt random song
		randomBtn.onclick = function () {
			_this.isRandom = !_this.isRandom;
			_this.setConfig("isRandom", _this.isRandom);
			randomBtn.classList.toggle("active", _this.isRandom);
		};
		//Xử lý bật/ tắt repeat song

		repeatBtn.onclick = function () {
			_this.isRepeat = !_this.isRepeat;
			_this.setConfig("isRepeat", _this.isRepeat);
			repeatBtn.classList.toggle("active", _this.isRepeat);
		};

		//Xử lí khi chạy xong bài hát
		audio.onended = function () {
			if (_this.isRepeat) {
				audio.play();
			} else {
				nextBtn.click();
			}
		};
		//Xử lý khi click vào playlist
		playlist.onclick = function (e) {
			const songNode = e.target.closest(".song:not(.active)");
			if (songNode || e.target.closest(".option")) {
				if (songNode) {
					_this.currentIndex = Number(songNode.dataset.index);
					_this.loadCurrentSong();
					_this.render();
					audio.play();
				}
			}
		};

		//Xử lí volume
		tone.oninput = function (e) {
			audio.volume = e.target.value / 100;
			console.log(e.target.value);
			if (e.target.value == 0) {
				btnDown.classList.add("mute");
				btnUp.classList.remove("vol");
			} else {
				btnDown.classList.remove("mute");
				btnUp.classList.add("vol");
			}
		};
	},

	//Method
	scrollToActiveSong() {
		$(".song.active").scrollIntoView({
			behavior: "smooth",
			block: "end",
			inline: "start",
		});
	},

	loadCurrentSong() {
		heading.innerText = this.currentSong.name;
		cdThump.style.backgroundImage = `url(${this.currentSong.image})`;
		audio.src = this.currentSong.path;
	},

	loadConfig() {
		this.isRandom = this.config.isRandom;
		this.isRepeat = this.config.isRepeat;
		this.currentIndex = this.config.currentIndex;
	},

	nextSong() {
		this.currentIndex++;
		if (this.currentIndex >= this.songs.length) {
			this.currentIndex = 0;
		}
		this.loadCurrentSong();
	},

	prevSong() {
		this.currentIndex--;
		if (this.currentIndex < 0) {
			this.currentIndex = this.songs.length - 1;
		}
		this.loadCurrentSong();
	},

	randomSong() {
		let newIndex;
		do {
			newIndex = Math.floor(Math.random() * this.songs.length);
		} while (newIndex === this.currentIndex);
		this.currentIndex = newIndex;
		this.loadCurrentSong();
	},

	start() {
		//Load cấu hình
		this.loadConfig();
		//Định nghĩa các thuộc tính cho object
		this.defineProperty();

		//Lắng nghe và xử lý các sự kiện
		this.handleEvents();

		//Load bài hát đầu tiên vào UI khi chạy ứng dụng
		this.loadCurrentSong();

		//Render playlist
		this.render();

		//Hiển thị trang thái khi reload web
		repeatBtn.classList.toggle("active", this.isRepeat);
		randomBtn.classList.toggle("active", this.isRandom);
	},
};

app.start();
