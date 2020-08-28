import React from "react";
import { makeStyles, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import AuthButton from "../SubComponents/AuthButton";

const useStyles = makeStyles(theme => ({
	textField: {
		margin: theme.spacing(1.3),
		"& > * ": {
			width: "100%",
			display: "block",
		},
	},
}));
export default ({ userDetails, history, ...props }) => {
	const classes = useStyles();
	return (
		<form action="">
			<Grid container>
				<Grid container justify="center" item xs={12}>
					<Grid
						style={{ marginTop: 35, marginBottom: 10, height: 120 }}
						justify="center"
						container
						item
						xs={12}
					>
						<Grid
							item
							className={classes.textField}
							style={{ textAlign: "center" }}
							xs={12}
						>
							<Typography
								style={{
									fontWeight: "bold",
									marginBottom: 15,
								}}
								variant="body1"
							>
								Finish setting up
							</Typography>
							<Typography variant="body2">
								By signing up you agree to our{" "}
								<Link to="/" style={{ color: "#2196f3" }}>
									Terms Of Service,
								</Link>{" "}
								<Link to="/" style={{ color: "#2196f3" }}>
									Data Policy,
								</Link>{" "}
								and{" "}
								<Link to="/" style={{ color: "#2196f3" }}>
									Cookie Policy
								</Link>
							</Typography>
							<Typography style={{ margin: "5px" }} variant="body2">
								You can begin exploring!!!
							</Typography>
						</Grid>
						<Grid container justify="center" item xs={10}>
							<AuthButton
								btnText="Sign Up"
								route="/signupusers"
								userDetails={userDetails}
								history={history}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</form>
	);
};
