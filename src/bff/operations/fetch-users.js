import { getUsers } from '../api/get-users';
import { sessions } from '../sessions';
import { ROLE } from '../constants/role';

export const fetchUsers = async (hash) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);
	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null
		};
	}

	const users = await getUsers();

	return {
		error: null,
		res: users
	};
};
