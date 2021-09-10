import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Paper,
  Portal,
  makeStyles,
  ClickAwayListener,
} from "@material-ui/core";
import MoveGesture from "./MoveGesture";

const useStyles = makeStyles((theme) => ({
  clickaway: {
    position: "fixed",
    zIndex: theme.zIndex.snackbar - 1,
  },
  root: {
    position: "fixed",
    zIndex: theme.zIndex.snackbar,
    width: "100%",
    padding: 0,
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

function BottomModal({ children, display, setDisplay, ...props }) {
  return (
    <Portal>
      {display && (
        <MountModal setDisplay={setDisplay} {...props}>
          {children}
        </MountModal>
      )}
    </Portal>
  );
}

export default BottomModal;

const MountModal = ({ setDisplay, children, ...props }) => {
  const [modalHeight, setModalHeight] = useState(0);
  const [shouldUnmount, setShouldUnmount] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    setModalHeight(modalRef.current.getBoundingClientRect().height);
  }, []);

  const classes = useStyles();
  return (
    <ClickAwayListener
      onClickAway={() => setDisplay(false)}
      className={classes.clickaway}>
      <MoveGesture
        setY={(yDiff) => {
          if (yDiff > 0) return;
          modalRef.current.style.transform = `translateY(${-yDiff}px)`;
        }}
        onMoveEnd={({ y }) => {
          if (y < -(modalHeight * 0.3)) {
            setShouldUnmount(true);
            modalRef.current.style.transition = "all .5s ease-out";
            modalRef.current.style.transform = `translateY(${
              modalHeight + 10
            }px)`;
          } else {
            setShouldUnmount(false);
            modalRef.current.style.transition = "all .3s ease-out";
            modalRef.current.style.transform = `translateY(0%)`;
          }
        }}>
        <div
          ref={modalRef}
          onTransitionEnd={() => {
            if (!shouldUnmount) return;
            setTimeout(() => {
              setDisplay(false);
            }, 500);
          }}
          className={classes.root}
          {...props}>
          <Paper elevation={4} className={classes.paper}>
            <div className={classes.handleBar} />
            {children}
          </Paper>
        </div>
      </MoveGesture>
    </ClickAwayListener>
  );
};
