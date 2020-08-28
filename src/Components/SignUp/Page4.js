import React, { useState } from "react";
import { makeStyles, TextField, Grid, Typography } from "@material-ui/core";
import { isEmpty, isEmail } from "../../utils/validators";
const useStyles = makeStyles((theme) => ({
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

const getData = (name) => {
  const form = document.getElementsByTagName("form")[0];
  console.log(form[name].value);
  return form[name].value;
};


export default ({ setEmail, setPhoneNumber, ...props }) => {
  const classes = useStyles();
  const [loginPhone, setLoginPhone] = useState(false);
  const [loginType, setLoginType] = useState("email");
  const [error, setError] = useState({message: "", hasError: false});
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
            {loginPhone ? (
              <>
                <Grid item style={{ textAlign: "center" }} xs={12}>
                  <Typography
                    style={{
                      fontWeight: "bold",
                      marginBottom: 10,
                    }}
                    variant="body2"
                  >
                    Enter your phone number
                  </Typography>
                </Grid>

                <Grid className={classes.textField} item xs={10}>
                  <TextField name="phoneNumber" label="Phone Number" />
                </Grid>
              </>
            ) : (
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
                  <TextField name="email" error={error.hasError}  label="Email" />
                  <div className="error">{error.message}</div>
                </Grid>
              </>
            )}
          </Grid>
          <Grid item xs={10}>
            <input
              className={classes.button}
              type="button"
              value="Next"
              page="4"
              onClick={(e) => {
                if (loginPhone) {
                  setPhoneNumber(getData("phoneNumber"));
                } else {
                  const email = getData("email");
                  if (isEmpty(email)) setError({message: "Must not be empty", hasError: true});
                  else if (!isEmail(email)) {
                    setError({message: "Please input a valid email address", hasError: true});
                  } else {
                    setError({message: "", hasError: false});
                    setEmail(email);
                    props.next(e);
                  }
                }
              }}
            />
            {loginType === "email" ? (
              <Typography
                style={{
                  cursor: "pointer",
                  textAlign: "center",
                  display: "block",
                }}
                variant="caption"
                color="primary"
                onClick={() => {
                  setLoginType("phone");
                  setLoginPhone(true);
                }}
              >
                Use phone no instead?
              </Typography>
            ) : (
              <Typography
                style={{
                  cursor: "pointer",
                  textAlign: "center",
                  display: "block",
                }}
                variant="caption"
                color="primary"
                onClick={() => {
                  setLoginType("email");
                  setLoginPhone(false);
                }}
              >
                Use email instead?
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
