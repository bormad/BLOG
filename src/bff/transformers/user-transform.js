export const userTransform = (dbUser) => ({
	id: dbUser.id,
	login: dbUser.login,
	registedAt: dbUser.registed_at,
	roleId: dbUser.role_id,
	password: dbUser.password
});
