import React from 'react';
import styled from 'styled-components';
import { Content, H2 } from '../../components';
import { UserRow } from './components/user-row';
import { useServerRequest } from '../../hooks';

const UsersContainer = ({ className }) => {
	const [users, setUsers] = React.useState([]);
	const [roles, setRoles] = React.useState([]);
	const [errorMessage, setErrorMessage] = React.useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = React.useState(false);
	const requestServer = useServerRequest();

	React.useEffect(() => {
		Promise.all([
			requestServer('fetchUsers'),
			requestServer('fetchRoles')
		]).then(([usersRes, rolesRes]) => {
			if (usersRes.error || rolesRes.error) {
				setErrorMessage(usersRes.error || rolesRes.error);
				return;
			}
			setUsers(usersRes.res);
			setRoles(rolesRes.res);
		});
	}, [shouldUpdateUserList, requestServer]);

	const onUserRemove = (userId) => {
		requestServer('removeUser', userId).then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList);
		});
	};

	return (
		<div className={className}>
			<Content error={errorMessage}>
				<H2>Пользователи</H2>
				<div>
					<div className='table-header'>
						<div className='login-column'>Логин</div>
						<div className='registered-at-column'>Дата регистрации</div>
						<div className='role-column'>Роль</div>
					</div>
					{users.map(({ id, login, registedAt, roleId }) => (
						<UserRow
							id={id}
							key={id}
							login={login}
							registedAt={registedAt}
							roleId={roleId}
							roles={roles}
							onUserRemove={() => onUserRemove(id)}
						/>
					))}
				</div>
			</Content>
		</div>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 570px;
	margin: 0 auto;
	font-size: 18px;

	& .table-header {
		display: flex;
		width: 570px;

		& .registered-at-column {
			margin-left: 16px;
			margin-right: 16px;
		}
	}

	& .select-column {
		display: flex;
	}

	& .login-column {
		width: 172px;
	}
	& .registered-at-column {
		width: 213px;
	}

	& .role-column {
		width: auto;
	}
`;
