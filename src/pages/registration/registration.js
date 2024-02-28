import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff/server';
import { Input, Button, H2, AuthError } from '../../components';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import { setUser } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../bff/constants/role';
import { useResetForm } from '../../hooks';

const regFormShema = yup.object().shape({
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
		.max(20, 'Недопускается больше 20 символов'),
	passcheck: yup
		.string()
		.required('Заполните поле')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают')
});

const RegistrationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: ''
		},
		resolver: yupResolver(regFormShema)
	});

	const [serverError, setServerError] = React.useState(null);
	const roleId = useSelector(selectUserRole);
	const dispatch = useDispatch();

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		server.register(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(error);
				return;
			}

			dispatch(setUser(res));
			sessionStorage.setItem('userData', JSON.stringify(res));
		});
	};

	const formError =
		errors?.login?.message ||
		errors?.password?.message ||
		errors?.passcheck?.message;

	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to='/' />;
	}

	return (
		<div className={className}>
			<H2>Регистрация</H2>
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
				<Input
					type='password'
					placeholder='Проверка пароля...'
					{...register('passcheck', {
						onChange: () => {
							setServerError(null);
						}
					})}
				/>
				<Button type='submit' disabled={!!formError}>
					Зарегистрироваться
				</Button>
				{errorMessage && <AuthError>{errorMessage}</AuthError>}
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
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
