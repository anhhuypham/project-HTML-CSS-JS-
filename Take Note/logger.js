export default function withLogger(reducer) {
	return (prevState, action, args) => {
		console.group(action);
		console.log("PrevState: " + JSON.stringify(prevState));
		console.log("Actions Arguments: " + args);
		const nextState = reducer(prevState, action, args);
		console.log("Next State: " + JSON.stringify(nextState));
		console.groupEnd();
		return nextState;
	};
}
