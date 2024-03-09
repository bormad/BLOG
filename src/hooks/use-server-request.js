import { useSelector } from 'react-redux';
import { server } from '../bff';
import { selectUserSession } from '../selectors';
import React from 'react';
export const useServerRequest = () => {
	const session = useSelector(selectUserSession);

	return React.useCallback(
		(operation, ...params) => {
			const request = [
				'register',
				'authorize',
				'fetchPost',
				'fetchPosts'
			].includes(operation)
				? params
				: [session, ...params];
			return server[operation](...request);
		},
		[session]
	);
};
