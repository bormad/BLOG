import React from 'react';
import { Icon } from '../../../components/header/components';
import styled from 'styled-components';
import { useServerRequest } from '../../../hooks';

const UserRowContainer = ({
	id,
	roles,
	login,
	registedAt,
	roleId: userRoleId,
	className,
	onUserRemove
}) => {
	const [initialRoleId, setInitialRoleId] = React.useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = React.useState(userRoleId);
	const requestServer = useServerRequest();

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};

	const onRoleSave = (userId, newUserRoleId) => {
		requestServer('updateUserRole', userId, newUserRoleId).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};

	const saveBtnDisabled = selectedRoleId === initialRoleId;

	return (
		<div className={className}>
			<div className='user-data'>
				<div className='login-column'>{login}</div>
				<div className='registered-at-column'>{registedAt}</div>
				<div className='select-column'>
					<select value={selectedRoleId} onChange={onRoleChange}>
						{roles
							.filter((role) => role.name !== 'Гость')
							.map(({ id: roleId, name: roleName }) => (
								<option key={roleId} value={roleId}>
									{roleName}
								</option>
							))}
					</select>
					<Icon
						id='fa-floppy-o'
						size='24px'
						margin='0 0 0 10px'
						disabled={saveBtnDisabled}
						onClick={() => onRoleSave(id, selectedRoleId)}
					/>
				</div>
			</div>
			<Icon
				id='fa-trash-o'
				size='24px'
				margin='0 0 0 10px'
				onClick={onUserRemove}
			/>
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 15px;
	& .user-data {
		padding: 4px 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 570px;
		border: 1px solid #000;
	}
`;
