import styled from 'styled-components';
import { Icon } from '../../../components/header/components';
import { useDispatch } from 'react-redux';
import { useServerRequest } from '../../../hooks';
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../actions';
import { useNavigate } from 'react-router-dom';

const SpecialPanelContainer = ({ className, id, publishedAt, editBnt }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const navigate = useNavigate();

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить пост?',
				onConfirm: () => {
					dispatch(removePostAsync(requestServer, id)).then(() =>
						navigate('/')
					);
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL)
			})
		);
	};

	return (
		<div className={className}>
			<div className='published-at'>
				{publishedAt ? <Icon id='fa-calendar-o' /> : null}
				{publishedAt}
			</div>
			<div className='btns'>
				{editBnt}

				{publishedAt ? (
					<Icon size='20px' id='fa-trash-o' onClick={() => onPostRemove(id)} />
				) : null}
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
