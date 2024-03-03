import { addPost } from '../api/add-post';
import { updatePost } from '../api/update-post';
import { ROLE } from '../constants/role';
import { sessions } from '../sessions';

export const savePost = async (hash, newPostData) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null
		};
	}
	console.log(newPostData);
	const savedPost =
		newPostData.postId === ''
			? await addPost(newPostData)
			: await updatePost(newPostData);
	return {
		error: null,
		res: savedPost
	};
};
