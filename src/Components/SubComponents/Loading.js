import React from "react";

import { CircularProgress, makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root: {
		height: "calc(100% - 48px)",
		backgroundColor: "#f9f9f9",
	},
}));

const Loading = () => {
	const classes = useStyles();

	return (
		<Grid
			container
			alignItems="center"
			justify="center"
			className={classes.root}
		>
			<CircularProgress thickness={5} size={50} color="primary" />
		</Grid>
	);
};

export default Loading;
