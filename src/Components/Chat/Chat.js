import React, { useEffect, useState } from "react";

import { Grid, TextField, makeStyles } from "@material-ui/core";

import Header from "../SubComponents/Header";

const useStyles = makeStyles(theme => ({
	root: {
		height: "100vh",
		width: "100%",
		backgroundColor: theme.palette.background.paper,
		zIndex: 1000,
		overflowY: "auto",
		
		position: "absolute",
		top: 0,
		right: 0,
	},
}));


const Chat = ({ setDisplay }) => {
	const classes = useStyles();
	
	return (
		<div className={classes.root}>
			<Grid container>
				<Grid item xs={12}>
					<Header data="Messages" setDisplay={setDisplay} />
				</Grid>
				
			</Grid>
		</div>
	);
};

export default Chat;
