import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	root: {
		height: 300,
		"& > *": {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
			"& > *": {
				
				fontWeight: "bold",
			},
		},
	},
});

const NoPostUpload = ({ children, type }) => {
    const classes = useStyles();
    
	return (
		<Grid
			container
			className={classes.root}
			justify="center"
			alignItems="center"
		>
        <Grid item  xs={11}>
           
			{children}
           
            </Grid>
		</Grid>
	);
};

export default NoPostUpload;
