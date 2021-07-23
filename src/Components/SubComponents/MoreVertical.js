import React from "react";
import { Grid, IconButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pin: {
    width: 0,
    marginTop: 1,
    padding: 1.5,
    borderRadius: "50%",
    backgroundColor: "#ededed",
    border: "2px solid #333",
  },
}));

function MoreVertical(props) {
  const classes = useStyles();
  return (
    <IconButton {...props} size="small">
      <Grid
        container
        direction="column"
        alignItems="center"
        style={{
          width: 10,
        }}>
        <CircularPins classes={classes} />
        <CircularPins classes={classes} />
        <CircularPins classes={classes} />
      </Grid>
    </IconButton>
  );
}

export default MoreVertical;

const CircularPins = ({ classes }) => <div className={classes.pin}></div>;
