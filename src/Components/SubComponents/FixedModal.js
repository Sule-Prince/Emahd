import { motion } from "framer-motion";
import { Grid, Paper, Portal, useTheme, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "80%",
    maxHeight: "70%",
  },
  paper: {
    overflowY: "scroll",
    "& > *": {
      padding: theme.spacing(0, 3),
    },
  },
}));
function FixedModal({ children, color, style = {}, ...props }) {
  const theme = useTheme();

  const classes = useStyles();
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      style={{
        height: "100%",
        position: "fixed",
        zIndex: theme.zIndex.modal,
        top: 0,
        left: 0,
        ...style,
      }}
      {...props}>
      <motion.div
        className={classes.root}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}>
        <Paper
          elevation={3}
          className={classes.paper}
          style={{
            backgroundColor: color,
          }}>
          {children}
        </Paper>
      </motion.div>
    </Grid>
  );
}

export default FixedModal;
