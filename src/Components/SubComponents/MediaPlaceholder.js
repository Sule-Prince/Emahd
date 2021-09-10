import React from "react";
import { Grid, Typography } from "@material-ui/core";

function MediaPlaceholder({ imageUrl, caption }) {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      style={{
        padding: "0px 16px",
        height: "100%",
      }}>
      <Grid item style={{ padding: "10px 0px" }}>
        <img
          style={{ width: "100%", maxHeight: "50vh" }}
          src={imageUrl}
          alt="Media placeholder"
        />
      </Grid>
      <Grid item>
        <Typography
          variant="h5"
          style={{ fontWeight: "bold" }}
          align="center"
          color="textSecondary">
          {caption}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default MediaPlaceholder;
