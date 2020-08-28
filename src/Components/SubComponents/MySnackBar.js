import React from "react";
import { Snackbar, CircularProgress, makeStyles } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";
import { closeSnackBar } from "../../redux/userActionsSlice";

const useStyles = makeStyles({
	alert: {
		backgroundColor: "#aaa",
	},
});

function Alert({ loading, severity, className, ...props }) {
	if (!loading)
		return (
			<MuiAlert elevation={6} severity={severity} variant="filled" {...props} />
		);
	else
		return (
			<MuiAlert
				elevation={6}
				className={className}
				icon={<CircularProgress size={20} thickness={6} />}
				variant="filled"
				{...props}
			/>
		);
}

const MySnackBar = () => {
	const open = useSelector(state => state.userActions.snackBar.open);
	const duration = useSelector(state => state.userActions.snackBar.duration);
	const snackBarInfo = useSelector(state => state.userActions.snackBar.message);
	const snackBarType = useSelector(state => state.userActions.snackBar.type);
	const loading = useSelector(state => state.userActions.snackBar.loading);

	const classes = useStyles();
	const dispatch = useDispatch();
	const handleClose = (event, reason) => {
		dispatch(closeSnackBar());
	};

	return (
		<Snackbar
			style={{ zIndex: 10000 }}
			open={open}
			autoHideDuration={duration}
			onClose={handleClose}
		>
			<Alert
				onClose={handleClose}
				className={classes.alert}
				severity={snackBarType}
				loading={loading}
			>
				{snackBarInfo}
			</Alert>
		</Snackbar>
	);
};

export default MySnackBar;
