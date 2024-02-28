import styled from 'styled-components';
import { ControlPanel, Logo } from './components';

const Discription = styled.div`
	font-style: italic;
`;

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Logo />
		<Discription>
			Веб-технологии
			<br />
			Написание кода
			<br />
			Разбор ошибок
		</Discription>
		<ControlPanel />
	</header>
);

export const Header = styled(HeaderContainer)`
	position: fixed;
	display: flex;
	justify-content: space-between;
	top: 0px;
	height: 120px;
	width: 1000px;
	padding: 20px 40px;
	box-shadow: 0px -2px 15px #000;
	background-color: #fff;
	z-index: 10;
`;
