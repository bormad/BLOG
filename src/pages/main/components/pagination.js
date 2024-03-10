import styled from 'styled-components';
import { Button } from '../../../components';
import PropTypes from 'prop-types';

const PaginationContainer = ({ className, page, setPage, lastPage }) => {
	return (
		<div className={className}>
			<Button disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</Button>
			<Button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
				Предыдущая
			</Button>
			<div className='current-page'>Текущая страница: {page}</div>
			<Button
				disabled={page === lastPage}
				onClick={() => setPage((prev) => prev + 1)}
			>
				Слудующая
			</Button>
			<Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				В конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	padding: 20px 0;
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 8px;

	& .current-page {
		text-align: center;
		font-size: 18px;
		width: 100%;
		height: 30px;
		border: 1px solid #000;
		background-color: #eee;
	}
`;

Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	lastPage: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired
};
