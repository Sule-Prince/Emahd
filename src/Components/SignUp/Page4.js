import React, { useState } from "react";
import {
  makeStyles,
  TextField,
  Grid,
  InputAdornment,
  Typography,
  InputBase,
  Button,
} from "@material-ui/core";

import LockIcon from "@material-ui/icons/Lock";

import { useDispatch } from "react-redux";

import { isEmpty, isEmail } from "../../utils/validators";

import { axios } from "../../config/axiosConfig";
import { closeSnackBar, openSnackBar } from "../../redux/userActionsSlice";

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1.3),
    "& > * ": {
      width: "100%",
    },
  },
  button: {
    width: " 100% ",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    color: "#fff",
  },
}));

export default ({ setEmail, email, handle, ...props }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [error, setError] = useState({ message: "", hasError: false });
  const [displayCodeInput, setDisplayCodeInput] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");

  const sendVerCode = (e) => {
    if (isEmpty(email))
      setError({ message: "Must not be empty", hasError: true });
    else if (!isEmail(email)) {
      setError({
        message: "Please input a valid email address",
        hasError: true,
      });
    } else {
      setError({ message: "", hasError: false });
      e.target.disabled = true;
      dispatch(
        openSnackBar({
          message: "Please wait...",
          loading: true,
        })
      );
      axios
        .post("/verifyemail", { handle, email })
        .then((res) => {
          dispatch(closeSnackBar());
          dispatch(
            openSnackBar({
              message: res.data.feedback,
              duration: 4000,
            })
          );
          setDisplayCodeInput(true);
          e.target.disabled = false;
        })
        .catch((err) => {
          dispatch(closeSnackBar());
          if (err.response) {
            setError({
              message: err.response.data.error,
              hasError: true,
            });
          } else {
            setError({
              message: "Make sure you have a healthy internet connection",
              hasError: true,
            });
          }

          e.target.disabled = false;
        });
    }
  };

  const verifyCode = (e) => {
    dispatch(
      openSnackBar({
        message: "Please wait...",
        loading: true,
      })
    );

    axios
      .post("/verifycode", { code, email })
      .then((res) => {
        dispatch(closeSnackBar());
        if (res.data.feedback.correct) return props.next(4);

        return setCodeError(res.data.feedback.message);
      })
      .catch((error) => {
        dispatch(closeSnackBar());

        if (!error.response) {
          dispatch(
            openSnackBar({
              type: "error",
              message: "You do not have a healthy network",
              duration: 3000,
            })
          );
          return;
        }

        dispatch(
          openSnackBar({
            type: "error",
            message: error.response.data.error,
            duration: 3000,
          })
        );
      });
  };
  const handleEmail = (e) => {
    e.persist();
    e.preventDefault();

    const textValue = e.target.value;
    if (textValue === "Send Verification Code") {
      sendVerCode(e);
    } else {
      verifyCode(e);
    }
  };

  return (
    <form>
      <Grid container>
        <Grid container justify="center" item xs={12}>
          <Grid
            style={{ marginTop: 35, marginBottom: 10, height: 120 }}
            justify="center"
            container
            item
            xs={12}>
            <>
              <Grid item style={{ textAlign: "center" }} xs={12}>
                <Typography
                  style={{
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                  variant="body2">
                  Enter your email address
                </Typography>
              </Grid>

              <Grid className={classes.textField} item xs={10}>
                <TextField
                  name="email"
                  value={email}
                  error={error.hasError}
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="error">{error.message}</div>
              </Grid>
            </>
          </Grid>
          {displayCodeInput ? (
            <Grid item xs={10}>
              <InputBase
                placeholder="Enter Code here"
                endAdornment={
                  <InputAdornment>
                    <LockIcon color="primary" />
                  </InputAdornment>
                }
                value={code}
                type="number"
                style={{
                  fontSize: "2rem",
                  letterSpacing: "3px",
                  padding: 20,
                  width: "100%",
                  margin: "8px 0px",
                  boxShadow:
                    "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                }}
                onChange={(e) => setCode(e.target.value)}
              />
              {codeError && <div className="error">{codeError}</div>}
            </Grid>
          ) : null}
          <Grid item xs={10}>
            <Button
              className={classes.button}
              variant="contained"
              size="small"
              color="primary"
              value={displayCodeInput ? "Verify" : "Send Verification Code"}
              onClick={handleEmail}>
              {displayCodeInput ? "Verify" : "Send Verification Code"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
