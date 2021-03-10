import React from "react";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: theme.zIndex.modal,
		backdropFilter: "blur(6px)",
	},
}));

const BlurBackDrop = ({ children, setDisplay }) => {
	const classes = useStyles();

	

	return (
		<div
			className={classes.root}
			
			onClick={e => {
				setDisplay(false)
			}}
		>
			{children}
		</div>
	);
};

export default BlurBackDrop;
