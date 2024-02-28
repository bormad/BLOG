import React from 'react';
import { H2 } from '../../components';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { selectPost } from '../../selectors';
import { PostContent, Comments } from './components/index';
import { useParams } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { loadPost } from '../../actions/load-post';

const PostContainer = ({ className }) => {
	const post = useSelector(selectPost);
	const dispatch = useDispatch();
	const params = useParams();
	const requestServer = useServerRequest();

	React.useEffect(() => {
		dispatch(loadPost(requestServer, params.id));
	}, [params.id, requestServer, dispatch]);
	return (
		<div className={className}>
			<PostContent post={post} />
			<Comments comments={post.comments} postId={post.id} />
			<H2>Пользователи</H2>
			<div></div>
		</div>
	);
};

export const Post = styled(PostContainer)`
	margin: 40px 0;
	padding: 0 80px;
`;
