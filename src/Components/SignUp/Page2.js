import React, { useState } from "react";
import { makeStyles, TextField, Grid, Typography } from "@material-ui/core";
import { isEmpty } from "../../utils/validators";

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
		width: `calc( 100% + ${theme.spacing(2.6)}px)`,
		color: "#fff",
		fontFamily: "Roboto, Helvetica, Arial, sans-serif",
	},
}));

// const getData = id => {
// 	const form = document.getElementsByTagName("form")[0];

// 	return form[id].value;
// };
export default ({
	setLastName,
	setFirstName,
	firstName,
	lastName,
	...props
}) => {
	const [error, setError] = useState({
		firstName: { message: "", hasError: false },
		lastName: { message: "", hasError: false },
	});

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
						<Grid item xs={12}>
							<Typography
								style={{
									fontWeight: "bold",
									textAlign: "center",
									display: "block",
									marginBottom: 10,
								}}
								variant="body2"
							>
								Enter your Full Name
							</Typography>
						</Grid>

						<Grid className={classes.textField} item xs={5}>
							<TextField
								name="firstName"
								error={error.firstName.hasError}
								value={firstName}
								label="First Name"
								onChange={e => setFirstName(e.target.value)}
							/>
							<div className="error">{error.firstName.message}</div>
						</Grid>

						<Grid className={classes.textField} item xs={5}>
							<TextField
								name="lastName"
								error={error.lastName.hasError}
								label="Last Name"
								value={lastName}
								onChange={e => setLastName(e.target.value)}
							/>
							<div className="error">{error.lastName.message}</div>
						</Grid>
					</Grid>
					<Grid style={{ marginRight: 14 }} item xs={10}>
						<input
							className={classes.button}
							type="button"
							value="Next"
							page="2"
							onClick={e => {
								if (isEmpty(firstName) && isEmpty(lastName)) {
									setError({
										lastName: { message: "Must not be empty", hasError: true },
										firstName: { message: "Must not be empty", hasError: true },
									});
									return;
								}

								if (isEmpty(firstName)) {
									setError({
										lastName: { message: "", hasError: false },
										firstName: { message: "Must not be empty", hasError: true },
									});
									return;
								}

								if (isEmpty(lastName)) {
									setError({
										firstName: { message: "", hasError: false },
										lastName: { message: "Must not be empty", hasError: true },
									});
									return;
								}


								if (firstName.length < 3 && lastName.length < 3) {
									setError({
										lastName: { message: "Name is too short", hasError: true },
										firstName: { message: "Name is too short", hasError: true },
									});
									return;
								}

								if (firstName.length < 3) {
									setError({
										lastName: { message: "", hasError: false },
										firstName: { message: "Name is too short", hasError: true },
									});
									return;
								}

								if (lastName.length < 3) {
									setError({
										firstName: { message: "", hasError: false },
										lastName: { message: "Name is too short", hasError: true },
									});
									return;
								}


									setError({
										firstName: { message: "", hasError: false },
										lastName: { message: "", hasError: false },
									});

									props.next(e);
								
							}}
						/>
					</Grid>
				</Grid>
			</Grid>
		</form>
	);
};
