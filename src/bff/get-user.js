import { getUsers } from './get-users';

export const getUser = async (logitToFind) => {
	const users = await getUsers();
	return users.find(({ login }) => login === logitToFind);
};
