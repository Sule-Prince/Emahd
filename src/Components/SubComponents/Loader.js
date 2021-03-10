import React from "react";
import { Divider, Grid, makeStyles } from "@material-ui/core";
import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  suggestionTab: {
    height: 100,
    "& > span": {
      height: 20,
      width: 20,
      borderRadius: "50%",
    },
  },
}));

const Loader = () => {
  const loadVariant = {
    animate: {
      x: [-80, 80],
      y: [0, -60],
      backgroundColor: ["#2196f3", "#ff5722", "#c6ff00", "#ff1744", "#d500f9"],
      transition: {
        x: {
          yoyo: Infinity,
          duration: 3,
        },
        y: {
          yoyo: Infinity,
          duration: 0.4,
          ease: "easeOut",
        },
        backgroundColor: {
          yoyo: Infinity,
          duration: 4,
          ease: "easeInOut",
        },
      },
    },
  };

  const classes = useStyles();

  return (
    <>
      <Divider />
      <Grid
        container
        item
        justify="center"
        alignItems="flex-end"
        className={classes.suggestionTab}
        style={{ height: 100 }}>
        <motion.span
          variants={loadVariant}
          animate="animate"
          style={{ backgroundColor: "#2196f3" }}></motion.span>
      </Grid>
    </>
  );
};

export default Loader;
