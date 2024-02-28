import styled from 'styled-components';
import { Icon } from '../../../components/header/components';

const CommentContainer = ({ className, id, author, publishedAt, content }) => {
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
			<Icon size='20px' id='fa-trash-o' />
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
