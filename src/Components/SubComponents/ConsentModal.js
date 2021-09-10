import React from "react";

import {
  Button,
  Typography,
  Portal,
  Backdrop,
  makeStyles,
  Grid,
} from "@material-ui/core";
import FixedModal from "./FixedModal";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.modal - 1,
  },
  headerText: {
    fontWeight: "bold",
    margin: theme.spacing(1, 0),
  },
  mainText: {
    fontWeight: 500,
    marginBottom: theme.spacing(1),
  },
  btn: {
    margin: "4px 0px",
    width: "100%",
  },
}));

const ConsentModal = ({ headerText, consentText, consentBtns, hide }) => {
  const classes = useStyles();
  return (
    <Portal container={document.body}>
      <Backdrop open={!hide} className={classes.backdrop}>
        <FixedModal
          style={
            hide
              ? {
                  visibility: "hidden",
                  position: "absolute",
                  zIndex: -1000,
                }
              : {}
          }>
          {headerText && (
            <Typography
              variant="h5"
              align="center"
              className={classes.headerText}>
              {headerText}
            </Typography>
          )}
          <Typography
            variant="body2"
            align="center"
            className={classes.mainText}>
            {consentText}
          </Typography>
          {consentBtns.map(({ text, ...props }) => (
            <Grid container justify="center" key={text}>
              <Button variant="text" className={classes.btn} {...props}>
                {text}
              </Button>
            </Grid>
          ))}
        </FixedModal>
      </Backdrop>
    </Portal>
  );
};

export default ConsentModal;
