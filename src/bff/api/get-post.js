import { postTransform } from '../transformers';

export const getPost = async (postId) =>
	fetch(`http://localhost:3005/posts/${postId}`)
		.then((res) => {
			if (res.ok) {
				return res;
			}

			if (res.status === 404) {
				return Promise.reject('Такая станица не существует');
			}

			return Promise.reject('Что то пошло не так');
		})
		.then((loadedPost) => loadedPost.json())
		.then((loadedPost) => loadedPost && postTransform(loadedPost));
