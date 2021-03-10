import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.primary["main"],
    color: "#fff",
    width: "74%",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  },
}));
export default (props) => {
  const classes = useStyles();
  return (
    <>
      <div style={{ marginTop: "25vmin", textAlign: "center" }}>
        <Typography
          style={{ paddingBottom: "5vmin", fontWeight: "bold", color: "#000" }}
          variant="h4">
          Join EMahd
        </Typography>
        <Typography variant="body2">
          We'll help you create a new account in few easy steps
          <span aria-label="Winking emoji" role="img">
            &#128521;&#128521;
          </span>
        </Typography>
        <button
          className={classes.button}
          style={{ marginTop: "10vmin" }}
          page="1"
          onClick={props.next}>
          Next
        </button>
      </div>
      <Typography
        style={{
          display: "block",
          marginTop: "25vmin",
          textAlign: "center",
          cursor: "pointer",
        }}>
        <Link to="/" color="red">
          Already have an account?
        </Link>
      </Typography>
    </>
  );
};
