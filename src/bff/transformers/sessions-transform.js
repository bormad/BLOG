export const sessionsTransfom = (dbSession) => ({
	id: dbSession.id,
	hash: dbSession.hash,
	user: dbSession.user
});
