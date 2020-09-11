import React, { useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import SearchBar from "../../../SubComponents/SearchBar";
import UserInfo from "../../../SubComponents/UserInfo";

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
	const [searchText, setSearchText] = useState("");
	const [result, setResult] = useState([]);
	return (
		<div className={classes.root}>
			<div className={classes.searchBar}>
				<SearchBar
					setSearchText={setSearchText}
					searchText={searchText}
					setResult={setResult}
				/>
			</div>
			<div
				style={{ position: "absolute", overflowY: "auto", maxHeight: "90%" }}
			>
				<Grid container>
					{result.length > 0 &&
						result.map(data => {
							return (
								<Grid key= {data.result.userId} item xs={12} style={{ height: 68 }}>
									<UserInfo userData={data.result} />
								</Grid>
							);
						})}
				</Grid>
				<div className="positionFix"></div>
			</div>
		</div>
	);
};

export default Search;
