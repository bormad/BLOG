import { getComments } from '../api/get-comments';
import { getPosts } from '../api/get-posts';

export const fetchPosts = async (searchPhrase, page, limit) => {
	const [{ posts, links }, comments] = await Promise.all([
		getPosts(searchPhrase, page, limit),
		getComments()
	]);
	return {
		error: null,
		res: {
			posts: posts.map((post) => ({
				...post,
				commentsCount: comments.filter(({ post_id }) => post_id === post.id)
					.length
			})),
			links
		}
	};
};
