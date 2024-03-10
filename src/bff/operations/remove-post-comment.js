import { deleteComment } from '../api/delete-comment';
import { getComments } from '../api/get-comments';
import { getPost } from '../api/get-post';
import { getUsers } from '../api/get-users';
import { ROLE } from '../constants/role';
import { sessions } from '../sessions';

export const removePostComment = async (hash, postId, idComment) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null
		};
	}

	await deleteComment(idComment);

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
		res: {
			...post,
			comments: commentsWithAuthor
		}
	};
};
