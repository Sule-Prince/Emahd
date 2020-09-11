import React, { useState } from "react";
import { makeStyles, TextField, Grid, Typography } from "@material-ui/core";
import { isEmpty, isEmail } from "../../utils/validators";

import getData from "../../utils/getData";

const useStyles = makeStyles(theme => ({
	textField: {
		margin: theme.spacing(1.3),
		"& > * ": {
			width: "100%",
		},
	},
	button: {
		backgroundColor: theme.palette.primary["main"],
		width: " 100% ",
		fontFamily: "Roboto, Helvetica, Arial, sans-serif",
		color: "#fff",
	},
}));

export default ({ setEmail, email, ...props }) => {
	const classes = useStyles();

	const [error, setError] = useState({ message: "", hasError: false });
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
						<>
							<Grid item style={{ textAlign: "center" }} xs={12}>
								<Typography
									style={{
										fontWeight: "bold",
										marginBottom: 10,
									}}
									variant="body2"
								>
									Enter your email address
								</Typography>
							</Grid>

							<Grid className={classes.textField} item xs={10}>
								<TextField
									name="email"
									value={email}
									error={error.hasError}
									label="Email"
									onChange= {e => setEmail(e.target.value)}
								/>
								<div className="error">{error.message}</div>
							</Grid>
						</>
					</Grid>
					<Grid item xs={10}>
						<input
							className={classes.button}
							type="button"
							value="Next"
							page="4"
							onClick={e => {
								
								if (isEmpty(email))
									setError({ message: "Must not be empty", hasError: true });
								else if (!isEmail(email)) {
									setError({
										message: "Please input a valid email address",
										hasError: true,
									});
								} else {
									setError({ message: "", hasError: false });
									props.next(e);
								}
							}}
						/>
					</Grid>
				</Grid>
			</Grid>
		</form>
	);
};
