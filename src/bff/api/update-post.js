export const updatePost = ({ postId, imageUrl, title, content }) =>
	fetch(`http://localhost:3005/posts/${postId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify({
			image_url: imageUrl,
			title,
			content
		})
	}).then((loadedPost) => loadedPost.json());
