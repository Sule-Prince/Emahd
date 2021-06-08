import React from "react";

import { Fade, Modal, Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: ({ width, height, bgColor }) => ({
    padding: theme.spacing(3),
    width,
    minHeight: height,
    backgroundColor: bgColor,
  }),
}));

const TransitionModal = ({
  open,
  setOpen,
  children,
  width = "80%",
  height = "150px",
  bgColor,
}) => {
  // const [open, setOpen] = useState(false);

  const classes = useStyles({ width, height, bgColor });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      style={{ border: "none" }}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition>
      <Fade in={open}>
        <Paper style={{ outline: "none" }} className={classes.paper}>
          {children}
        </Paper>
      </Fade>
    </Modal>
  );
};

export default TransitionModal;
