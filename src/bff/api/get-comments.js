export const getComments = (postId) => {
	const url =
		postId === undefined
			? 'http://localhost:3005/comments'
			: `http://localhost:3005/comments/?post_id=${postId}`;
	return fetch(url).then((loadedComments) => loadedComments.json());
};
