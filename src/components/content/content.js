import styled from 'styled-components';
import { H2 } from '../h2/h2';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import PropTypes from 'prop-types';

const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Content = ({ children, access, error }) => {
	const userRole = useSelector(selectUserRole);
	const accessError = access.includes(userRole);

	if (!accessError) {
		return (
			<Div>
				<H2>Ошибка</H2>
				Доступа
			</Div>
		);
	}

	return (
		<>
			{error ? (
				<Div>
					<H2>Ошибка</H2>
					{error}
				</Div>
			) : (
				[children]
			)}
		</>
	);
};
