import React from "react";
import { Snackbar, CircularProgress, makeStyles } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";
import { closeSnackBar } from "../../redux/userActionsSlice";

const useStyles = makeStyles({
  alert: {
    backgroundColor: "#aaa",
  },
  font: {
    fontSize: 12.5,
    paddingTop: 4,
    paddingBottom: 4,
  },
});

function SuccessAlert(props) {
  return (
    <MuiAlert elevation={6} variant="filled" severity="success" {...props} />
  );
}
function InfoAlert(props) {
  return <MuiAlert elevation={6} variant="filled" severity="info" {...props} />;
}

function ErrorAlert(props) {
  return (
    <MuiAlert elevation={6} variant="filled" severity="error" {...props} />
  );
}

const LoadingAlert = (props) => {
  return (
    <MuiAlert
      elevation={6}
      icon={<CircularProgress size={15} thickness={4} />}
      variant="filled"
      {...props}
    />
  );
};

const MySnackBar = () => {
  const open = useSelector((state) => state.userActions.snackBar.open);
  const duration = useSelector((state) => state.userActions.snackBar.duration);
  const snackBarInfo = useSelector(
    (state) => state.userActions.snackBar.message
  );
  const snackBarType = useSelector((state) => state.userActions.snackBar.type);
  const loading = useSelector((state) => state.userActions.snackBar.loading);
  const shouldClose = useSelector(
    (state) => state.userActions.snackBar.shouldClose
  );

  const classes = useStyles();
  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    if (!shouldClose) return;
    dispatch(closeSnackBar());
  };

  return (
    <Snackbar
      style={{ zIndex: 1300 }}
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}>
      {loading ? (
        <LoadingAlert
          onClose={handleClose}
          className={classes.alert + " " + classes.font}
          severity={snackBarType}>
          {snackBarInfo}
        </LoadingAlert>
      ) : (
        (snackBarType === "success" && (
          <SuccessAlert onClose={handleClose} className={classes.font}>
            {snackBarInfo}
          </SuccessAlert>
        )) ||
        (snackBarType === "error" && (
          <ErrorAlert onClose={handleClose} className={classes.font}>
            {snackBarInfo}
          </ErrorAlert>
        )) ||
        (snackBarType === "info" && (
          <InfoAlert onClose={handleClose} className={classes.font}>
            {snackBarInfo}
          </InfoAlert>
        ))
      )}
    </Snackbar>
  );
};

export default MySnackBar;
