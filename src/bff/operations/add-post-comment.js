import { addComment } from '../api/add-comment';
import { getComments } from '../api/get-comments';
import { getPost } from '../api/get-post';
import { getUsers } from '../api/get-users';
import { ROLE } from '../constants/role';
import { sessions } from '../sessions';

export const addPostComment = async (hash, postId, userId, content) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER];

	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null
		};
	}

	await addComment(postId, userId, content);

	const post = await getPost(postId);

	const comments = await getComments(postId);

	const users = await getUsers();

	const commentsWithAuthor = comments.map((comment) => {
		const user = users.find(({ id }) => id === comment.author_id);

		return {
			...comment,
			author: user?.login
		};
	});

	return {
		error: null,
		res: { ...post, comments: commentsWithAuthor }
	};
};
