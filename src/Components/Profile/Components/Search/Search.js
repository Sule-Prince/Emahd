import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import SearchBar from "../../../SubComponents/SearchBar";

const useStyles = makeStyles(theme => ({
	root: {
		minHeight: "100vh",
		backgroundColor: "#f0f0f0",
	},
	searchBar: {
		padding: "5px 5px",
	},
}));

const Search = () => {
	const classes = useStyles();
	return (
		<Grid container className={classes.root} justify="center">
			<Grid className={classes.searchBar} item xs={12}>
				<SearchBar />
			</Grid>
		</Grid>
	);
};

export default Search;
