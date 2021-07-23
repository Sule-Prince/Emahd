import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Paper,
  Portal,
  makeStyles,
  ClickAwayListener,
} from "@material-ui/core";

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

function BottomModal({ children, display, setDisplay, ...props }) {
  return (
    <Portal>
      <AnimatePresence>
        {display && (
          <MountModal setDisplay={setDisplay} {...props}>
            {children}
          </MountModal>
        )}
      </AnimatePresence>
    </Portal>
  );
}

export default BottomModal;

const MountModal = ({ setDisplay, children, ...props }) => {
  const [modalHeight, setModalHeight] = useState(0);
  const dy = useRef(0);
  const modalRef = useRef(null);
  const dragRef = useRef(0);

  const modalVariant = {
    initial: {
      y: 0,
    },
    animate: {
      y: 0,
      transition: {
        // stiffness: 50,
        type: "spring",
      },
    },
    exit: {
      y: modalHeight,
      transition: {
        type: "spring",
      },
    },
  };

  useEffect(() => {
    setModalHeight(modalRef.current.getBoundingClientRect().height);
  }, []);

  const classes = useStyles();
  return (
    <ClickAwayListener onClickAway={() => setDisplay(false)}>
      <motion.div
        ref={modalRef}
        drag="y"
        dragConstraints={dragRef}
        dragElastic={0.1}
        onDragStart={(e) => (dy.current = e.y)}
        onDragEnd={(e) => {
          if (e.y - dy.current > 0) setDisplay(false);
        }}
        variants={modalVariant}
        initial="initial"
        animate="animate"
        exit="exit"
        className={classes.root}
        {...props}>
        <Paper elevation={4} className={classes.paper}>
          <div className={classes.handleBar} />
          {children}
        </Paper>
        <div
          ref={dragRef}
          style={{
            position: "fixed",
            bottom: -100,
            height: modalHeight + 100,
          }}></div>
      </motion.div>
    </ClickAwayListener>
  );
};
