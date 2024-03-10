import styled from 'styled-components';
import { Icon } from '../../../components/header/components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PostCardContainer = ({
	className,
	id,
	title,
	publishedAt,
	imageUrl,
	commentsCount
}) => {
	return (
		<div className={className}>
			<Link to={`/post/${id}`}>
				<div className='wrapper'>
					<img src={imageUrl} alt={title} />
					<div className='post-card-footer'>
						<h3>{title}</h3>
						<div className='post-card-info'>
							<div className='published-at'>
								{publishedAt ? <Icon id='fa-calendar-o' /> : null}
								{publishedAt}
							</div>
							<div className='comment-count'>
								<Icon id='fa-comment-o' />
								{commentsCount}
							</div>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const PostCard = styled(PostCardContainer)`
	max-width: 280px;

	& .post-card-info {
		display: flex;
		justify-content: space-between;
	}

	& .comment-count,
	.published-at {
		display: flex;
		gap: 8px;

		& i {
			position: relative;
			top: -1px;
		}
	}
`;

Icon.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string,
	publishedAt: PropTypes.string,
	imageUrl: PropTypes.string,
	commentsCount: PropTypes.number
};
