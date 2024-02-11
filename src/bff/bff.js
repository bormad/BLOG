import { addUser } from './add-user';
import { getUser } from './get-user';
import { createSession } from './create-session';

export const server = {
	async authorize(authLogin, authPassword) {
		const user = getUser(authLogin);

		if (!user) {
			return {
				error: 'Такой пользователь не найден',
				res: null
			};
		}

		if (authPassword !== user.password) {
			return {
				error: 'Неверный логин или пароль',
				res: null
			};
		}

		return {
			error: null,
			res: createSession(user.role_id)
		};
	},
	async register(regLogin, regPassword) {
		const user = getUser(regLogin);

		if (user) {
			return {
				error: 'Такое имя пользователя уже занято',
				res: null
			};
		}

		addUser(regLogin, regPassword);

		return {
			error: null,
			res: createSession(user.role_id)
		};
	}
};
