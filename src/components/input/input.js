import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

const InputContainer = React.forwardRef(
	({ className, width, ...props }, ref) => {
		return <input className={className} {...props} ref={ref} />;
	}
);

export const Input = styled(InputContainer)`
	height: 40px;
	width: ${({ width = '100%' }) => width};
	padding: 0 0 0 10px;
	font-size: 18px;
	border: 1px solid #000;
`;

Input.propTypes = {
	width: PropTypes.string
};
