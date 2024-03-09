export const getLastPage = (links) => {
	const res = links.match(/^.+_page=(\d{1,4})&_limit=9>; rel="last"$/);
	if (res) {
		return Number(res[1]);
	} else {
		return 1;
	}
};
