import { setPostData } from './set-post-data';

export const removeCommentAsync =
	(requestServer, postId, idComment) => (dispatch) => {
		requestServer('removePostComment', postId, idComment).then((postData) => {
			dispatch(setPostData(postData.res));
		});
	};
