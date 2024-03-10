import styled from 'styled-components';
import { Icon } from '../../../components/header/components';
import { removeCommentAsync } from '../../../actions/remove-comment-async';
import { useDispatch, useSelector } from 'react-redux';
import { useServerRequest } from '../../../hooks';
import { CLOSE_MODAL, openModal } from '../../../actions';
import { selectUserRole } from '../../../selectors';
import { ROLE } from '../../../bff/constants/role';
import PropTypes from 'prop-types';

const CommentContainer = ({
	className,
	id,
	author,
	publishedAt,
	content,
	postId
}) => {
	const requestServer = useServerRequest();
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);

	const onCommentRemove = (idComment) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(requestServer, postId, idComment));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL)
			})
		);
	};

	return (
		<div className={className}>
			<div className='comment'>
				<div className='information-panel'>
					<div className='author'>
						<Icon size='18px' id='fa-user-circle-o' margin='0 6px 0 0' />
						{author}
					</div>

					<div className='published-at'>
						{publishedAt}
						<Icon size='18px' id='fa-calendar-o' />
					</div>
				</div>
				<div className='comment-text'>{content}</div>
			</div>
			{[ROLE.ADMIN, ROLE.MODERATOR].includes(roleId) && (
				<Icon size='20px' id='fa-trash-o' onClick={() => onCommentRemove(id)} />
			)}
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	justify-content: space-between;
	margin-top: 10px;

	& .comment {
		border: 1px solid #000;
		padding: 6px;
		max-width: 550px;
		width: 100%;

		& i {
			position: relative;
			top: -2px;
		}
	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
	}

	& .author {
		display: flex;
		justify-content: space-between;
	}

	& .published-at {
		display: flex;
		justify-content: space-between;
		gap: 6px;
		& i {
			position: relative;
			top: -2px;
		}
	}
`;

Comment.propTypes = {
	id: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	postId: PropTypes.string.isRequired
};
