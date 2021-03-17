import { motion } from "framer-motion";
import { Grid, Paper, Portal, useTheme } from "@material-ui/core";
import React from "react";

function FixedModal({ children, color }) {
  const theme = useTheme();

  return (
    <Portal container={document.body}>
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
        }}>
        <motion.div
          style={{
            maxWidth: "80%",
            maxHeight: "70%",
          }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}>
          <Paper
            elevation={3}
            style={{
              padding: "6px 8px",
              backgroundColor: color,
            }}>
            {children}
          </Paper>
        </motion.div>
      </Grid>
    </Portal>
  );
}

export default FixedModal;
