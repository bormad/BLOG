import styled from 'styled-components';

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
