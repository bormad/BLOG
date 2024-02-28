import styled from 'styled-components';
import React from 'react';
import { Icon } from '../../../components/header/components';
import { Comment } from './comment';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../../../selectors';
import { useServerRequest } from '../../../hooks';
import { addCommentAsync } from '../../../actions/add-comment-async';

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = React.useState('');
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onNewCommentAdd = (postId, userId, content) => {
		dispatch(addCommentAsync(requestServer, postId, userId, content));
		setNewComment('');
	};

	return (
		<div className={className}>
			<div className='new-comment'>
				<textarea
					name='comment'
					value={newComment}
					placeholder='Комментарий...'
					onChange={({ target }) => {
						setNewComment(target.value);
					}}
				></textarea>
				<Icon
					size='20px'
					id='fa-paper-plane-o'
					onClick={() => {
						onNewCommentAdd(postId, userId, newComment);
					}}
				/>
			</div>
			<div className='comments'>
				{comments.map(({ id, author, content, published_at }) => (
					<Comment
						id={id}
						key={id}
						author={author}
						content={content}
						publishedAt={published_at}
					/>
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	width: 580px;
	margin: 20px auto;

	& .new-comment {
		display: flex;
		gap: 10px;
		width: 100%;

		& textarea {
			width: 100%;
			height: 120px;
			resize: none;
			font-size: 18px;
		}
	}

	& .comments {
		margin-top: 14px;
	}
`;
