import React, { useState } from "react";
import { makeStyles, Grid, Typography } from "@material-ui/core";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import EventIcon from "@material-ui/icons/Event";
import { isEmpty } from "../../utils/validators";
import getData from "../../utils/getData";

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1.3),
    "& > * ": {
      width: "100%",
    },
  },
  button: {
    backgroundColor: theme.palette.primary["main"],
    color: "#fff",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    width: " 100% ",
  },
}));

export default ({ setGender, setDOB, gender, DOB, ...props }) => {
  const [error, setError] = useState({ message: "", hasError: false });

  const classes = useStyles();
  return (
    <form>
      <Grid container>
        {/* Gender Form */}
        <Grid container justify="center" item xs={12}>
          <Grid
            style={{ marginTop: 35, marginBottom: 10 }}
            justify="center"
            container
            item
            xs={12}>
            <Grid item style={{ textAlign: "center" }} xs={12}>
              <Typography
                style={{
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
                variant="body2">
                Select your gender
              </Typography>
            </Grid>

            <GenderForm
              gender={gender}
              setGender={setGender}
              classes={classes}
            />
          </Grid>
          {/* End of Gender Form */}

          {/* Date Form */}

          <Grid
            style={{ marginTop: 25, marginBottom: 10 }}
            justify="center"
            container
            item
            xs={12}>
            <Grid item style={{ textAlign: "center" }} xs={12}>
              <Typography
                style={{
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
                variant="body2">
                Select your Date Of Birth
              </Typography>
            </Grid>

            <DateForm DOB={DOB} setDOB={setDOB} error={error} />
            <div className="error">{error.message}</div>
          </Grid>

          {/* End of Date Form */}

          {/* Button */}
          <Grid item xs={10}>
            <input
              className={classes.button}
              page="6"
              onClick={(e) => {
                const DOB = getData("DOB");
                if (isEmpty(DOB)) {
                  setError({ message: "Must not be empty", hasError: true });
                  return;
                }

                setDOB(DOB);
                props.next(e);
              }}>
              Next
            </input>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

const GenderForm = ({ gender, setGender }) => {
  return (
    <Grid container item xs={10}>
      <FormControl style={{ width: "100%" }} component="fieldset">
        <RadioGroup
          aria-label="gender"
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}>
          <Grid
            style={{ paddingBottom: 5, borderBottom: "1px solid #ccc" }}
            container
            item
            xs={12}>
            <Typography
              style={{ alignSelf: "center", flexGrow: 1 }}
              variant="body2">
              Male
            </Typography>
            <FormControlLabel
              value="Male"
              control={<Radio color="primary" size="small" />}
            />
          </Grid>
          <Grid
            style={{ paddingBottom: 5, borderBottom: "1px solid #ccc" }}
            container
            item
            xs={12}>
            <Typography
              style={{ alignSelf: "center", flexGrow: 1 }}
              variant="body2">
              Female
            </Typography>

            <FormControlLabel
              value="Female"
              control={<Radio color="primary" size="small" />}
            />
          </Grid>
          <Grid
            style={{ paddingBottom: 5, borderBottom: "1px solid #ccc" }}
            container
            item
            xs={12}>
            <Typography
              style={{ alignSelf: "center", flexGrow: 1 }}
              variant="body2">
              Custom
            </Typography>

            <FormControlLabel
              value="Custom"
              control={<Radio color="primary" size="small" />}
            />
          </Grid>
        </RadioGroup>
      </FormControl>
    </Grid>
  );
};

const DateForm = ({ error, setDOB, DOB }) => {
  return (
    <Grid container item xs={10}>
      <Input
        id="DOB"
        name="DOB"
        type="date"
        value={DOB}
        error={error.hasError}
        onChange={(e) => setDOB(e.target.value)}
        style={{ width: "100%" }}
        endAdornment={
          <InputAdornment
            position="end"
            style={{ marginLeft: -50, zIndex: -1 }}>
            <IconButton aria-label="">
              <EventIcon color="primary" />
            </IconButton>
          </InputAdornment>
        }
      />
    </Grid>
  );
};
