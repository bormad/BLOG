import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from './index';

// const IconContainer = ({ className }) => (
// 	<div className={className}>
// 		<i className='fa fa-code' aria-hidden='true'></i>
// 	</div>
// );

// const Icon = styled(IconContainer)`
// 	font-size: 70px;
// 	margin-right: 10px;
// `;

const LargeText = styled.div`
	font-size: 48px;
	font-weight: 600;
	line-height: 48px;
	margin-top: 16px;
`;

const SmallText = styled.div`
	font-size: 18px;
	font-weight: bold;
`;

const LogoContainer = ({ className }) => {
	return (
		<Link className={className} to='/'>
			<Icon size='70px' margin='0 10px 0 0' id='fa-code' />
			<div>
				<LargeText>Блог</LargeText>
				<SmallText>веб-разработчика</SmallText>
			</div>
		</Link>
	);
};

export const Logo = styled(LogoContainer)`
	display: flex;
	margin-top: -21px;
`;
