// const heading = document.createElement("h1");
// heading.title = "Hello";
// heading.className = "heading";
// heading.textContent = "Hello guys!";
//React createElement
const h1React = React.createElement(
	"h1",
	{
		title: "Hello",
		className: "heading",
	},
	"Hello guys!"
);
// const list = document.createElement("ul");
// const item1 = document.createElement("li");
// const item2 = document.createElement("li");
// item1.innerText = "Javascript";
// item2.innerText = "ReacJS";
// list.appendChild(item1);
// list.appendChild(item2);
// document.body.appendChild(heading);
// document.body.appendChild(list);

const itemReact1 = React.createElement("li", null, "Javascripts");
const itemReact2 = React.createElement("li", { style: { color: "red" } }, "Javascripts");
const listReact = React.createElement("ul", null, itemReact1, itemReact2);
console.log(listReact);

const divReact = React.createElement(
	"div",
	{ className: "post-item" },
	React.createElement("h2", { title: "Học React tại F8" }, "Học ReactJS"),
	React.createElement("p", null, "Học ReactJS từ cơ bản tới nâng cao")
);
const root = document.getElementById("root");
// ReactDOM.render(divReact, root);
// Ver18
// const rootReact = ReactDOM.createRoot(root);
// rootReact.render([divReact, listReact]);
const courses = [
	{
		name: "HTML,CSS",
	},
	{
		name: "Responsive web design",
	},
	{
		name: "React JS",
	},
];

// const ulReact = React.createElement(React.Fragment, null, React.createElement("h1", null, "Heading"), React.createElement("h1", null, "Heading"));
const ulReact = (
	<React.Fragment>
		<ul>
			{courses.map((course, index) => (
				<li style={{ color: "red" }} key={index}>
					{course.name}
				</li>
			))}
		</ul>
	</React.Fragment>
);

function Header() {
	return <h1>Hello World</h1>;
}
class Footer extends React.Component {
	render() {
		return <h2>Good Bye!</h2>;
	}
}

// const app = (
// 	<React.Fragment>
// 		<Header />
// 		<Footer />
// 	</React.Fragment>
// );
// console.log(app);
// ReactDOM.render(app, root);
// function MyApp() {
// 	return <h1>Hello, world!</h1>;
// }
// ReactDOM.render(MyApp(), root);

function PostItem({ title = "Test Title", desc = "Test desc", published = "Test Pub" }) {
	return (
		<div className="post-item">
			<h2 className="heading">{title}</h2>
			<p className="desc">{desc}</p>
			<p className="published">{published}</p>
		</div>
	);
}
function App() {
	return (
		<div className="post-list">
			<PostItem title="Hello" desc="Anh Huy" published="1 month ago" />
			<PostItem />
			<PostItem />
			<PostItem />
			<PostItem />
		</div>
	);
}

// ReactDOM.render(<App />, root);
const data = [
	{
		id: 15,
		title: "HTML CSS Pro",
		slug: "htmlcss",
		description: "Từ cơ bản tới chuyên sâu, thực hành 8 dự án, hàng trăm bài tập, trang hỏi đáp riêng, cấp chứng chỉ sau khóa học và mua một lần học mãi mãi.",
		image: "courses/15/62f13d2424a47.png",
		icon: "courses/15/62385d6c63dfa.png",
		video_type: "upload",
		video: null,
		old_price: 2499000,
		price: 1299000,
		pre_order_price: 699000,
		students_count: 2208,
		is_pro: true,
		is_coming_soon: false,
		is_selling: true,
		published_at: "2022-08-18T17:00:00.000000Z",
		is_registered: true,
		user_progress: 49,
		last_completed_at: "2022-12-06 13:09:13",
		image_url: "https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png",
		icon_url: "https://files.fullstack.edu.vn/f8-prod/courses/15/62385d6c63dfa.png",
		video_url: "",
		landing_page_url: "/landing/htmlcss",
		is_pre_order: false,
		is_published: true,
	},
	{
		id: 19,
		title: "JavaScript Pro",
		slug: "javascript-pro",
		description: "Khóa học JavaScript Pro",
		image: "courses/19/62f13cb607b4b.png",
		icon: "courses/19/62f13cb685c81.png",
		video_type: "upload",
		video: null,
		old_price: 0,
		price: 0,
		pre_order_price: 0,
		students_count: 0,
		is_pro: true,
		is_coming_soon: true,
		is_selling: false,
		published_at: "2023-01-31T17:00:00.000000Z",
		is_registered: false,
		user_progress: 0,
		last_completed_at: null,
		image_url: "https://files.fullstack.edu.vn/f8-prod/courses/19/62f13cb607b4b.png",
		icon_url: "https://files.fullstack.edu.vn/f8-prod/courses/19/62f13cb685c81.png",
		video_url: "",
		landing_page_url: "/landing/javascript-pro",
		is_pre_order: false,
		is_published: false,
	},
	{
		id: 20,
		title: "ReactJS Pro",
		slug: "reactjs-pro",
		description: "Khóa học ReactJS Pro",
		image: "courses/20/62f13dded314e.png",
		icon: "courses/20/62f13ddf5e7f9.png",
		video_type: "upload",
		video: null,
		old_price: 0,
		price: 0,
		pre_order_price: 0,
		students_count: 0,
		is_pro: true,
		is_coming_soon: true,
		is_selling: false,
		published_at: "2023-05-31T17:00:00.000000Z",
		is_registered: false,
		user_progress: 0,
		last_completed_at: null,
		image_url: "https://files.fullstack.edu.vn/f8-prod/courses/20/62f13dded314e.png",
		icon_url: "https://files.fullstack.edu.vn/f8-prod/courses/20/62f13ddf5e7f9.png",
		video_url: "",
		landing_page_url: "/landing/reactjs-pro",
		is_pre_order: false,
		is_published: false,
	},
];

// function CourseItem({ course, onClick }) {
// 	return (
// 		<div className="item">
// 			<img src={course.image_url} alt="" />
// 			<h1 onClick={() => onClick(course)}>{course.title}</h1>
// 			<p>{course.description}</p>
// 		</div>
// 	);
// }

function Button({ title, href, onClick }) {
	let Component = "button";
	let options = {};
	if (href) {
		options.href = href;
		Component = "a";
	}
	if (onClick) options.onClick = onClick;
	console.log(options);
	return (
		<Component className="btn" {...options}>
			{title}
		</Component>
	);
}
function List({ data }) {
	return (
		<ul>
			{data.map((item) => (
				<li key={item}>{item}</li>
			))}
		</ul>
	);
}
function App() {
	//useCallback
	const handleClick = () => {
		console.log(Math.random());
	};

	const cars = ["BMW", "Mescerdes", "Porsche"];

	return (
		<div className="list">
			<List data={cars} />
		</div>
	);
}

ReactDOM.render(<App />, root);
