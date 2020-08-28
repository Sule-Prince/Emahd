import React from "react";
import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import useAuth from "../../utils/customHooks/useAuth";

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

const AuthButton = ({btnText, route, userDetails, history }) => {
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
					authenticateUser(route, userDetails, history);
				}}
			>
				{response.isLoading ? (
					<CircularProgress color="primary" thickness={5} size={25} />
				) : (
					btnText
				)}
			</Button>
			
			<div className= "extraInfo">
				{response.feedback ||
					(response.error &&
						response.error.map((error, i) => (
							<div key={i} className="error">
								{error}
							</div>
						)))}
			</div>
		</>
	);
};

export default AuthButton;
