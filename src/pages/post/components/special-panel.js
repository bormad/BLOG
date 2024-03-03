import styled from 'styled-components';
import { Icon } from '../../../components/header/components';

const SpecialPanelContainer = ({ className, publishedAt, editBnt }) => {
	return (
		<div className={className}>
			<div className='published-at'>
				<Icon id='fa-calendar-o' />
				{publishedAt}
			</div>
			<div className='btns'>
				{editBnt}
				<Icon size='20px' id='fa-trash-o' />
			</div>
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	margin: ${({ margin }) => margin};
	font-size: 18px;

	& .btns {
		display: flex;
		gap: 8px;
	}

	& .published-at {
		display: flex;
		gap: 8px;
	}
`;
