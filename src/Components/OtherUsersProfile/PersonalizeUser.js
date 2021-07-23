import React, { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { axios } from "../../config/axiosConfig";
import Header from "../SubComponents/Header";
import { closeSnackBar, openSnackBar } from "../../redux/userActionsSlice";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100%",
    backgroundColor: "#fff",
    position: "fixed",
    top: 0,
    zIndex: theme.zIndex.drawer,
  },
  contentWrapper: {
    paddingTop: theme.spacing(2),
  },
}));

function PersonalizeUser({ setDisplay, userId }) {
  const [handle, setHandle] = useState("");

  const dispatch = useDispatch();

  const classes = useStyles();

  const personalizeUser = () => {
    if (!handle.trim()) return;
    dispatch(
      openSnackBar({
        loading: true,
        message: `Please wait...`,
      })
    );
    axios
      .post("/extra/personalize", { userId, newHandle: handle })
      .then((res) => {
        dispatch(closeSnackBar());
        dispatch(
          openSnackBar({
            type: "success",
            message: `User has been personalized as ${handle} successfully`,
            duration: 3000,
          })
        );
      })
      .catch((error) => {
        dispatch(closeSnackBar());
        dispatch(
          openSnackBar({
            message: `Something went wrong, please try again later!`,
            duration: 3000,
            type: "error",
          })
        );
      });
  };

  return (
    <div className={classes.root}>
      <Header data="Personalize" setDisplay={setDisplay} />
      <Grid
        container
        justify="center"
        className={classes.contentWrapper}
        spacing={3}>
        <Grid item xs={10}>
          <Typography variant="body2">
            Please type in the new handle you want to reference this user by.
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <TextField
            label="Username"
            value={handle}
            id="handle"
            onChange={(e) => {
              const value = e.target.value;
              setHandle(value);
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={10}>
          <Button
            color="primary"
            variant="contained"
            style={{
              width: "100%",
              maxWidth: 350,
            }}
            onClick={personalizeUser}>
            Done
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default PersonalizeUser;
