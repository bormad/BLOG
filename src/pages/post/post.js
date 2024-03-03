import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { selectPost } from '../../selectors';
import { PostContent, Comments } from './components/index';
import { useMatch, useParams } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { loadPost } from '../../actions/load-post';
import { PostForm } from './components/post-form';
import { RESET_POST_DATA } from '../../actions';
import { initialPostState } from '../../reducers/post-reducer';

const PostContainer = ({ className }) => {
	const post = useSelector(selectPost);
	const dispatch = useDispatch();
	const params = useParams();
	const isCreating = useMatch('/post');
	const isEditing = useMatch('/post/:id/edit');

	const requestServer = useServerRequest();

	React.useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	React.useEffect(() => {
		if (!isCreating) {
			dispatch(loadPost(requestServer, params.id));
		}
	}, [params.id, requestServer, dispatch, isCreating]);
	return (
		<div className={className}>
			{isCreating || isEditing ? (
				<PostForm post={isCreating ? initialPostState : post} />
			) : (
				<>
					<PostContent post={post} />
					<Comments comments={post.comments} postId={post.id} />
				</>
			)}
		</div>
	);
};

export const Post = styled(PostContainer)`
	margin: 40px 0;
	padding: 0 80px;
`;
