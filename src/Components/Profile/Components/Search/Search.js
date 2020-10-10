import React, { useState } from "react";
import {
	CircularProgress,
	Grid,
	makeStyles,
	Typography,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";

import SearchBar from "../../../SubComponents/SearchBar";
import UserInfo from "../../../SubComponents/UserInfo";

const useStyles = makeStyles(theme => ({
	root: {
		minHeight: "100vh",
		backgroundColor: "#f9f9f9",
	},
	searchBar: {
		padding: "5px 5px",
	},
}));

const Search = () => {
	const classes = useStyles();
	const [searchText, setSearchText] = useState("");
	const [result, setResult] = useState([]);
	const [loading, setLoading] = useState(false);
	return (
		<div className={classes.root}>
			<div className={classes.searchBar}>
				<SearchBar
					setSearchText={setSearchText}
					searchText={searchText}
					setResult={setResult}
					setLoading={setLoading}
					loading={loading}
				/>
			</div>
			<div style={{ position: "absolute", overflowY: "auto", height: "90%" }}>
				<Grid container>
					{result.length === 0 && (
						<Grid
							container
							alignItems="center"
							justify="center"
							direction="column"
							style={{
								height: "calc(90vh - 70px)",
								padding: "0px 12px",
							}}
						>
							{!loading && (
								<>
									<span>
										<SearchIcon
											style={{ height: 80, width: 80 }}
											color="action"
										/>
									</span>
									<Typography
										variant="h4"
										style={{ fontWeight: "bold" }}
										align="center"
										color="textSecondary"
									>
										Search and find friends and family on Emahd
									</Typography>
								</>
							)}
							{loading && (
								<div style={{ margin: "auto" }}>
									<CircularProgress thickness={6} />
								</div>
							)}
						</Grid>
					)}
					{result.length > 0 &&
						result.map(data => {
							return (
								<Grid
									key={data.result.userId}
									item
									xs={12}
									style={{ height: 68 }}
								>
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
