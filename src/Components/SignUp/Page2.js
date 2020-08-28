import React from "react";
import { makeStyles, TextField, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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

const getData = (id) => {
  const form = document.getElementsByTagName("form")[0]
  console.log(form[id].value)
  return form[id].value
}
export default ({setLastName, setFirstName, ...props}) => {
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
            <TextField id="firstName" label="First Name" />
          </Grid>
          <Grid className={classes.textField} item xs={5}>
            <TextField id="lastName" label="Last Name" />
          </Grid>
        </Grid>
        <Grid style={{ marginRight: 14 }} item xs={10}>
          <input
            className={classes.button}
            type="button"
            value="Next"
            page="2"
            onClick={(e)=> {
              props.next(e)
              setFirstName(getData('firstName'))
              setLastName(getData('lastName'))
            }}
          />
        </Grid>
      </Grid>
    </Grid>
    </form>
  );
};
