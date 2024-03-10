import styled from 'styled-components';
import PropTypes from 'prop-types';

const IconContainer = ({ className, id, ...props }) => (
	<div className={className} {...props}>
		<i className={`fa ${id}`} aria-hidden='true'></i>
	</div>
);

export const Icon = styled(IconContainer)`
	font-size: ${({ size }) => size};
	margin: ${({ margin }) => margin};

	&:hover {
		cursor: pointer;
	}

	color: ${({ disabled }) => (disabled ? '#ccc' : '#000')};
`;

Icon.propTypes = {
	id: PropTypes.string.isRequired
};
