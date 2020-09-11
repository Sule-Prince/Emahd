import React, { useState } from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import PswInput from "../SubComponents/PswInput";
import { isEmpty } from "../../utils/validators";

import getData from "../../utils/getData";

const useStyles = makeStyles(theme => ({
	textField: {
		margin: theme.spacing(1.3),
	},
	button: {
		backgroundColor: theme.palette.primary["main"],
		width: " 100% ",
		fontFamily: "Roboto, Helvetica, Arial, sans-serif",
		color: "#fff",
	},
}));

export default ({ setPassword, ...props }) => {
	const [psw, setPsw] = useState("");
	const [error, setError] = useState({ message: "", hasError: false });

	const classes = useStyles();
	return (
		<form>
			<Grid container>
				<Grid container justify="center" item xs={12}>
					<Grid
						style={{ marginTop: 35, marginBottom: 10, height: 120 }}
						justify="center"
						container
						item
						xs={12}
					>
						<Grid item style={{ textAlign: "center" }} xs={12}>
							<Typography
								style={{
									fontWeight: "bold",
									marginBottom: 10,
								}}
								variant="body2"
							>
								Enter your Password
							</Typography>
						</Grid>
						<Grid className={classes.textField} item xs={10}>
							<PswInput password={psw} error={error} setPassword={setPsw} />
							<div className="error">{error.message}</div>
						</Grid>
					</Grid>
					<Grid item xs={10}>
						<input
							className={classes.button}
							type="button"
							value="Next"
							page="5"
							onClick={e => {
								if (isEmpty(psw)) {
									setError({ message: "Must not be empty", hasError: true });
									return;
								}
								props.next(e);
								setPassword(getData("psw"));
							}}
						/>
					</Grid>
				</Grid>
			</Grid>
		</form>
	);
};
