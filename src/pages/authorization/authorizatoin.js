import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff/server';
import { Input, Button, H2 } from '../../components';
import styled from 'styled-components';
import { Link, Navigate } from 'react-router-dom';
import { setUser } from '../../actions';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../bff/constants/role';

const authFormShema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/\w+$/, 'Неверный логин. Допускаются только буквы и цифры')
		.min(3, 'Минимум 3 символа для логина')
		.max(15, 'Недопускается больше 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(/^[\w#%]+$/, 'Некорректный пароль')
		.min(6, 'Минимум 6 символа для пароля')
		.max(20, 'Недопускается больше 20 символов')
});

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	margin-top: 4px;
	font-size: 18px;
	&:hover {
		cursor: pointer;
	}
`;

const ErrorMessage = styled.div`
	font-size: 18px;
	padding: 5px 0;
	text-align: center;
	background-color: #fcadad;
`;

const AuthorizatoinContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			login: '',
			password: ''
		},
		resolver: yupResolver(authFormShema)
	});

	const roleId = useSelector(selectUserRole);

	const dispatch = useDispatch();

	const [serverError, setServerError] = React.useState(null);

	const store = useStore();

	React.useEffect(() => {
		let currentWasLogout = store.getState().app.wasLogout;

		return store.subscribe(() => {
			let prevWasLogout = currentWasLogout;
			currentWasLogout = store.getState().app.wasLogout;

			if (currentWasLogout !== prevWasLogout) {
				reset();
			}
		});
	}, [reset, store]);

	const onSubmit = ({ login, password }) => {
		server.authorize(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(error);
				return;
			}

			dispatch(setUser(res));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;

	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to='/' />;
	}

	return (
		<div className={className}>
			<H2>Авторизация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type='text'
					placeholder='Логин...'
					{...register('login', {
						onChange: () => {
							setServerError(null);
						}
					})}
				/>
				<Input
					type='password'
					placeholder='Пароль...'
					{...register('password', {
						onChange: () => {
							setServerError(null);
						}
					})}
				/>
				<Button type='submit' disabled={!!formError}>
					Авторизоваться
				</Button>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				<StyledLink to='/register'>Регистрация</StyledLink>
			</form>
		</div>
	);
};

export const Authorizatoin = styled(AuthorizatoinContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
		gap: 10px;
	}
`;
