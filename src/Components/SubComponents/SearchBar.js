import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { Paper } from "@material-ui/core";
import { axios } from "../../config/axiosConfig";

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(1, 0, 1, 0),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.9),
		},
	},
	grow: {
		flexGrow: 1,
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 1),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.9),
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		color: theme.palette.primary["main"],
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
		display: "flex",
		flex: 1,
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 1),

		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
	},
}));

let timeoutId;

export default function SearchBar({ setSearchText, searchText, setResult }) {
	const classes = useStyles();
	
	return (
		<>
			<Paper className={classes.root}>
				<div className={classes.grow}>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search…"
							value={searchText}
							onChange={e => {
								console.log(timeoutId)
								setSearchText(e.target.value);
								clearTimeout(timeoutId);
								
								timeoutId = setTimeout(() => {
									axios
										.post("/search", { text: searchText })
										.then(response => setResult(response.data))
										.catch(err => console.log(err));
								}, 2500);
								
							}}
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ "aria-label": "search" }}
						/>
					</div>
				</div>
			</Paper>
			
		</>
	);
}
