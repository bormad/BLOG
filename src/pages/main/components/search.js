import styled from 'styled-components';
import { Input } from '../../../components';
import { Icon } from '../../../components/header/components';
import PropTypes from 'prop-types';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input
				value={searchPhrase}
				onChange={onChange}
				placeholder='Поиск по заголовкам...'
			/>
			<Icon id='fa fa-search' size='21px' />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	position: relative;
	display: flex;
	margin: 0 auto;
	margin-bottom: 20px;

	align-items: center;
	justify-content: center;
	width: 340px;
	height: 40px;
	gap: 6px;

	& input {
		padding-right: 32px;
	}

	& i {
		position: absolute;
		right: 16px;
		top: 8px;
	}
`;

Search.propTypes = {
	searchPhrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
};
