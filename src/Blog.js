import { Route, Routes } from 'react-router-dom';
import { styled } from 'styled-components';
import { Header, Footer, Modal } from './components';
import { Authorizatoin, Post, Registration, Users } from './pages';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './actions';

const AppColumn = styled.div`
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	height: 100%;

	margin: 0 auto;
	background-color: #fff;
`;

const Page = styled.div`
	padding: 120px 0 0 20px;
`;

export const Blog = () => {
	const dispatch = useDispatch();

	React.useLayoutEffect(() => {
		const correntUserDataJSON = sessionStorage.getItem('userData');

		const correntUserData = JSON.parse(correntUserDataJSON);

		if (!correntUserData) {
			return;
		}

		dispatch(
			setUser({ ...correntUserData, roleId: Number(correntUserData.roleId) })
		);
	}, [dispatch]);

	return (
		<AppColumn>
			<Header />

			<Page>
				<Routes>
					<Route path='/' element={<div>Главная страница</div>} />
					<Route path='/register' element={<Registration />} />
					<Route path='/login' element={<Authorizatoin />} />
					<Route path='/users' element={<Users />} />
					<Route path='/post' element={<div>Новая статья</div>} />
					<Route path='/post/:id' element={<Post />} />
					<Route path='*' element={<div>Ошибка</div>} />
				</Routes>
			</Page>
			<Modal />
			<Footer />
		</AppColumn>
	);
};
