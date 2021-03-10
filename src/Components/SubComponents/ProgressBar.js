import React from "react";

import { makeStyles } from "@material-ui/core";

import { motion } from "framer-motion";

const useStyles = makeStyles(theme => ({
	progressBar: {
		height: theme.spacing(1),
		backgroundColor: theme.palette.primary["dark"],
		borderRadius: 20,
		margin: 0,
		marginLeft: -5,
		marginBottom: theme.spacing(1),
	},
}));
const ProgressBar = ({ progress }) => {
	console.log(progress)
	const classes = useStyles();
	return (
		<motion.div
			className={classes.progressBar}
			initial={{ width: 0 }}
			animate={{ width: `${progress +5}%` }}
            transition= {{ stiffness: 300, type: "spring" }}
		></motion.div>
	);
};

export default ProgressBar;
