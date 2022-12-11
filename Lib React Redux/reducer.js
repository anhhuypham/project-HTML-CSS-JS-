const init = {
	cars: ["BMW"],
};

export default function reducer(state = init, action, args) {
	switch (action) {
		case "ADD":
			const [newCar] = args; // args trả về dạng Array nên phải dùng destructuring
			return {
				...state, // destructuring state cũ
				cars: [...state.cars, newCar], // state mới
			};
		default:
			return state;
	}
}
