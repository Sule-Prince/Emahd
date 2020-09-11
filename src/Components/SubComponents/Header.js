import React from "react";
import { Paper, Typography, Grid, IconButton } from "@material-ui/core"

import CloseIcon from "@material-ui/icons/Close";
import { useStyles } from "../Profile/Components/Account/styles";


const Header = ({ setDisplay, data }) => {
	const classes = useStyles();

	const handleCancelButton = () => {
		setDisplay(false);
	};
	return (
		<Paper style={{ borderBottom: "1px solid #aaa" }} square elevation={0}>
			<Grid className={classes.headerRoot} container>
				<Grid className={classes.headerNameContainer} item>
					<IconButton
						color="primary"
						onClick={handleCancelButton}
						style={{ marginRight: 5, marginLeft: "-1rem" }}
					>
						<CloseIcon />
					</IconButton>
					<Typography
						className={classes.headerName}
						variant="body2"
						component="span"
					>
						{data}
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default Header;