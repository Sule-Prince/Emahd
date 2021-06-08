import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Paper, Portal, makeStyles } from "@material-ui/core";
import MoveGesture from "./MoveGesture";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    zIndex: theme.zIndex.snackbar,
    width: "100%",
    bottom: 0,
  },
  paper: {
    borderRadius: " 20px 20px 0px 0px",
    padding: theme.spacing(2, 1),
    position: "relative",
    width: "100%",
    minHeight: 100,
  },
  handleBar: {
    backgroundColor: "#b3b3b377",
    height: 3,
    width: 40,
    borderRadius: 8,
    position: "absolute",
    top: 4,
    left: "50%",
    transform: "translateX(-50%)",
  },
}));

function BottomModal({ children, styles = {}, display, setDisplay }) {
  const [dy, setDy] = useState(0);
  const [eventEnd, setEventEnd] = useState(false);

  console.log(dy);

  const modalVariant = {
    initial: {
      y: 30,
      opacity: 0.4,
    },
    animate: {
      y: -dy,
      opacity: [0.6, 0.8, 1],
      transition: {
        delay: 3,
        type: "spring",
        // stiffness: 100,
        // damping: 10,
      },
    },
    exit: {
      y: 30,
      opacity: [0.8, 0.6, 0],
      transition: {
        delay: 0,
        type: "spring",
      },
    },
  };

  const classes = useStyles();

  useEffect(() => {
    if (eventEnd !== true) return;

    if (dy > -50) setDisplay(false);

    //   eslint-disable-next-line
  }, [eventEnd, dy]);

  return (
    <>
      <AnimatePresence>
        {display && (
          <Portal container={document.body}>
            <motion.div
              variants={modalVariant}
              initial="initial"
              animate="animate"
              exit="exit"
              className={classes.root}
              style={styles}>
              <MoveGesture setY={setDy} setEventEnd={setEventEnd}>
                <Paper elevation={4} className={classes.paper}>
                  <div className={classes.handleBar} />
                  {children}
                </Paper>
              </MoveGesture>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
}

export default BottomModal;
