export const debounce = (fn, del) => {
	let timeoutId;

	return (...args) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(fn, del, ...args);
	};
};
