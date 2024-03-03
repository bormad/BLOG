import styled from 'styled-components';
import { H2 } from '../../../components';
import { SpecialPanel } from './special-panel';
import { Icon } from '../../../components/header/components/icon';
import { useNavigate } from 'react-router-dom';

const PostContentContainer = ({ className, post }) => {
	const { id, content, imageUrl, title, publishedAt } = post;
	const navigate = useNavigate();
	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<H2>{title}</H2>
			<SpecialPanel
				publishedAt={publishedAt}
				margin={'-20px 0 20px 0'}
				editBnt={
					<Icon
						size='20px'
						id='fa-pencil-square-o'
						onClick={() => {
							navigate(`/post/${id}/edit`);
						}}
					/>
				}
			/>
			<div className='post-text'>{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& i {
		position: relative;
		top: -1px;
	}

	& .post-text {
		font-size: 18px;
		white-space: pre-line;
	}
`;
