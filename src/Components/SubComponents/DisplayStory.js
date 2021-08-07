import React from "react";

import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mediaRoot: {
    height: "100%",
    position: "relative",
    "& > *": {
      width: "100%",
      height: "auto",
      maxHeight: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
  },
}));

export default function DisplayStory({ story }) {
  const { type, mediaUrl, caption, style: settings } = story;

  const classes = useStyles();
  return (
    <Grid container alignItems="center" className={classes.mediaRoot}>
      {type === "video" && (
        <>
          <video autoPlay src={mediaUrl} />
          <DisplayText text={caption} settings={settings} />
        </>
      )}
      {type === "image" && (
        <>
          <img src={mediaUrl} alt="media for story" />
          <DisplayText text={caption} settings={settings} />
        </>
      )}
      {type === "text" && <DisplayText text={caption} settings={settings} />}
    </Grid>
  );
}

const DisplayText = ({ text, settings }) => {
  return (
    <div
      style={{
        color: "#fff",
        width: "100%",
        padding: "8px 16px",
        position: "fixed",
        bottom: "8vh",
        backgroundColor: "rgba(0, 0, 0, .6)",
      }}>
      <Typography align="center" variant="body2" style={settings}>
        {text}
      </Typography>
    </div>
  );
};
