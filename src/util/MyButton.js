import React from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const MyButton = ({ children, onClick, tip, btnClassName, tipClassName, placement }) => (
	<Tooltip title={tip} className={tipClassName} placement={placement}>
		<IconButton onClick={onClick} className={btnClassName}>
			{children}
		</IconButton>
	</Tooltip>
);
export default MyButton;
