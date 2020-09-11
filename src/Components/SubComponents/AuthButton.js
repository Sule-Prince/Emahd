import React from "react";
import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import useAuth from "../../utils/customHooks/useAuth";

import { isEmpty } from "../../utils/validators";

const useStyles = makeStyles(theme => ({
	button: {
		// backgroundColor: theme.palette.primary["main"],
		display: "flex",
		fontWeight: theme.typography.fontWeightRegular,
		color: "#fff",
		letterSpacing: "1px",
		wordSpacing: "1px",
		textAlign: "center",
		width: " 100% ",
	},
}));

const AuthButton = ({ btnText, route, userDetails, history, setError, inputError }) => {
	const classes = useStyles();

	const [response, authenticateUser] = useAuth();

	return (
		<>
			<Button
				type="submit"
				color="primary"
				variant="contained"
				className={classes.button}
				disabled={response.isLoading}
				size="small"
				onClick={e => {
					e.preventDefault();
					localStorage.removeItem("tabNo")
					localStorage.removeItem("token")
					if (setError) {
						if (isEmpty(userDetails.password) && isEmpty(userDetails.email)) {
							setError({
								email: { message: "Must not be empty", hasError: true },
								password: { message: "Must not be empty", hasError: true },
							});
							return;
						}
						if (isEmpty(userDetails.password)) {
							setError({
								email: { message: "", hasError: false },
								password: { message: "Must not be empty", hasError: true },
							});
							return;
						}
						if (isEmpty(userDetails.email)) {
							setError({
								password: { message: "", hasError: false },
								email: { message: "Must not be empty", hasError: true },
							});
							return;
						}
						if (!isEmpty(userDetails.password) && !isEmpty(userDetails.email)) {
							setError({
								email: { message: "", hasError: false },
								password: { message: "", hasError: false },
							});
						}
					}

					authenticateUser(route, userDetails, history);
				}}
			>
				{response.isLoading ? (
					<CircularProgress color="primary" thickness={5} size={25} />
				) : (
					btnText
				)}
			</Button>

			<div className="extraInfo">
				{response.feedback ||
					(response.error &&
						response.error.map(
							(error, i) =>
								(inputError.email.hasError || inputError.password.hasError) || (
									<div
										style={{ paddingBottom: 0, paddingTop: 3 }}
										key={i}
										className="error"
									>
										{error}
									</div>
								)
						))}
			</div>
		</>
	);
};

export default AuthButton;
