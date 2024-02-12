import styled from 'styled-components';
import { Icon } from './index';
import { Link, useNavigate } from 'react-router-dom';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const StyledLink = styled(Link)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	width: 100px;
	height: 30px;
	border: 1px solid #000;
	background-color: #eee;
`;

const StyledBtn = styled.div`
	&:hover {
		cursor: pointer;
	}
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	return (
		<div className={className}>
			<RightAligned>
				<StyledLink to='/login'>Войти</StyledLink>
			</RightAligned>
			<RightAligned>
				<StyledBtn onClick={() => navigate(-1)}>
					<Icon id='fa-backward' size='24px' margin='10px 0' />
				</StyledBtn>
				<Link to='/post'>
					<Icon id='fa-file-text-o' size='24px' margin='10px 15px' />
				</Link>

				<Link to='/users'>
					<Icon id='fa-users' size='24px' margin='10px 0' />
				</Link>
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)``;
