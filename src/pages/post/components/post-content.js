import styled from 'styled-components';
import { H2 } from '../../../components';
import { Icon } from '../../../components/header/components';

const PostContentContainer = ({ className, post }) => {
	const { content, imageUrl, title, publishedAt } = post;
	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<H2>{title}</H2>
			<div className='special-panel'>
				<div className='published-at'>
					<Icon id='fa-calendar-o' />
					{publishedAt}
				</div>
				<div className='btns'>
					<Icon size='20px' id='fa-pencil-square-o' />
					<Icon size='20px' id='fa-trash-o' />
				</div>
			</div>
			<div className='post-text'>{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .special-panel {
		display: flex;
		justify-content: space-between;
		margin: -20px 0 20px 0;
		font-size: 18px;
	}

	& .published-at {
		font-size: 18px;
		display: flex;
		gap: 8px;
	}

	& i {
		position: relative;
		top: -1px;
	}

	& .btns {
		display: flex;
		gap: 6px;
	}

	& .post-text {
		font-size: 18px;
	}
`;
