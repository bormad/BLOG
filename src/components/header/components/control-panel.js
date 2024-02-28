import styled from 'styled-components';
import { Icon } from './index';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../index';
import { ROLE } from '../../../bff/constants/role';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectUserRole,
	selectUserLogin,
	selectUserSession
} from '../../../selectors';
import { logout } from '../../../actions/logout';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

const UserName = styled.div`
	font-size: 18px;
	font-weight: bold;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const session = useSelector(selectUserSession);
	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(logout(session));
		sessionStorage.removeItem('userData');
	};

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to='/login'>Войти</Link>
					</Button>
				) : (
					<>
						<UserName>{login}</UserName>
						<Icon
							id='fa-sign-out'
							size='24px'
							margin='0 0 0 10px'
							onClick={onLogout}
						/>
					</>
				)}
			</RightAligned>
			<RightAligned>
				<Icon
					id='fa-backward'
					size='24px'
					margin='10px 0'
					onClick={() => navigate(-1)}
				/>
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
