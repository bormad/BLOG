import { useSelector } from 'react-redux';
import { Button } from '../button/button';
import styled from 'styled-components';
import {
	selectModalIsOpen,
	selectModalOnConfirm,
	selectModalOnCancel,
	selectModalText
} from '../../selectors';

const ModalContainer = ({ className }) => {
	const isOpen = useSelector(selectModalIsOpen);
	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);

	if (!isOpen) {
		return null;
	}

	return (
		<div className={className}>
			<div className='owerlay'></div>
			<div className='box'>
				<h3>{text}</h3>
				<div className='buttons'>
					<Button width='120px' onClick={onConfirm}>
						Да
					</Button>
					<Button width='120px' onClick={onCancel}>
						Отмена
					</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 30;

	& .owerlay {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.7);
		width: 100%;
		min-height: 100%;
	}

	& .box {
		text-align: center;
		position: relative;
		width: 400px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;
		border: 2px solid;
		padding: 0 20px 20px;
		z-index: 30;

		& .buttons {
			display: flex;
			justify-content: space-around;
		}
	}
`;
