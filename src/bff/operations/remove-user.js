import { deleteUser } from '../api/delete-user';
import { ROLE } from '../constants/role';
import { sessions } from '../sessions';

export const removeUser = async (userSession, userId) => {
	const accessRoles = [ROLE.ADMIN];

	if (!sessions.access(userSession, accessRoles)) {
		return {
			error: 'Доступ запрещен',
			res: null
		};
	}
	await deleteUser(userId);
	return {
		error: null,
		res: true
	};
};
