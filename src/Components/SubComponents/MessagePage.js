import React, { useState } from "react";
import { Button, Grid, useTheme, Typography } from "@material-ui/core";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./Header";
import { openSnackBar } from "../../redux/userActionsSlice";

function MessagePage({
  button,
  header,
  mainText,
  commentSection,
  setDisplay,
  sendData,
}) {
  const [value, setValue] = useState("");
  const theme = useTheme();
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#f9f9f9",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: theme.zIndex.modal,
        }}
        initial={{
          y: "100vh",
        }}
        animate={{
          y: 0,
        }}
        exit={{
          y: "100vh",
        }}
        transition={{
          type: "tween",
          duration: 0.7,
        }}>
        <Grid container style={{ position: "relative" }} justify="center">
          <Grid item xs={12}>
            <Header data={header} setDisplay={setDisplay} />
          </Grid>

          <Grid
            item
            xs={11}
            style={{
              padding: "16px 0px",
            }}>
            <Typography variant="body2" gutterBottom>
              {mainText}
            </Typography>
          </Grid>

          <Grid
            container
            justify="center"
            item
            xs={12}
            style={{
              padding: "16px 0px",
            }}>
            <textarea
              style={{
                width: "80%",
                height: "40vh",
                maxHeight: 500,
                outline: 0,
                border: 0,
                padding: 8,
                boxShadow: theme.shadows[3],
                resize: "none",
              }}
              placeholder={commentSection}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Grid>

          <Grid
            container
            item
            justify="center"
            style={{
              padding: "16px 0px",
            }}>
            <Button
              style={{ width: "80%", maxWidth: 300 }}
              size="large"
              variant="contained"
              color="primary"
              onClick={() => {
                sendData(value).then(() => {
                  setDisplay(false);
                });
              }}>
              {button}
            </Button>
          </Grid>
        </Grid>
      </motion.div>
    </AnimatePresence>
  );
}

export default MessagePage;
