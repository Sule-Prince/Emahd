import React, { useState } from "react";
import {
  Grid,
  IconButton,
  makeStyles,
  Typography,
  Avatar,
} from "@material-ui/core";

import DoneIcon from "@material-ui/icons/Done";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useDispatch, useSelector } from "react-redux";

import PostSlideShow from "../../../SubComponents/PostSlideShow";
import { dataStoreThunk } from "../../../../redux/userPostSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#fff",
    position: "fixed",
    zIndex: 1100,
  },
  headerRoot: {
    height: 48,
  },
  textContainer: {
    flexGrow: 1,
    paddingLeft: "1rem",
  },
  textarea: {
    border: "none",
    resize: "none",
    width: "100%",
    height: 80,
    marginTop: 0,
    paddingTop: 6,
    paddingLeft: 6,
    "&:focus": {
      border: "none",
      outline: "none",
      backgroundColor: "#f1f1f1",
      boxShadow: theme.shadows[5],
    },
    transition: "all .5s ease-in",
  },
}));

function UploadPage({
  setDisplay,
  setStyles,
  setMediaUrls,
  mediaUrls,
  postSettings,
  multiple,
}) {
  const [caption, setCaption] = useState("");

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header
        classes={classes}
        setStyles={setStyles}
        setDisplay={setDisplay}
        setMediaUrls={setMediaUrls}
        mediaUrls={mediaUrls}
        caption={caption}
        postSettings={postSettings}
        multiple={multiple}
      />
      <AddCaption classes={classes} caption={caption} setCaption={setCaption} />
      <Media classes={classes} mediaUrls={mediaUrls} />
    </div>
  );
}

export default UploadPage;

const Header = ({
  setStyles,
  setDisplay,
  setMediaUrls,
  mediaUrls,
  classes,
  caption,
  multiple,
  postSettings,
}) => {
  const dispatch = useDispatch();
  return (
    <Grid container item alignItems="center" className={classes.headerRoot}>
      <Grid item style={{ flexGrow: 1 }}>
        <IconButton
          onClick={() => {
            setDisplay(false);
          }}
          style={{ marginRight: 4 }}>
          <KeyboardBackspaceIcon style={{ color: "#000" }} />
        </IconButton>
        <Typography
          variant="body1"
          component="span"
          style={{ fontWeight: "bold" }}>
          New Post
        </Typography>
      </Grid>
      <Grid item style={{ paddingRight: 5 }}>
        <IconButton
          onClick={() => {
            let data = {
              route: "/scream",
              post: caption,
              mediaType: "image",
              postSettings,
              multiple,
            };
            dispatch(
              dataStoreThunk({ section: "media", media: mediaUrls, data })
            );

            setStyles((prev) => ({
              ...prev,
              fabOpacity: [1, 0],
              upperTranslate: [0, 0],
            }));

            setDisplay(false);
            setMediaUrls([]);
          }}>
          <DoneIcon color="primary" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

const AddCaption = ({ classes, caption, setCaption }) => {
  const imageUrl = useSelector((state) => state.user.data.imageUrl);

  return (
    <div style={{ padding: "6px 8px", margin: "1rem 0px" }}>
      <Grid container>
        <Grid item>
          <Avatar
            style={{ width: "12vmin", height: "12vmin" }}
            src={imageUrl}
          />
        </Grid>
        <Grid item className={classes.textContainer}>
          <textarea
            value={caption}
            className={classes.textarea}
            placeholder="Write caption here...."
            onChange={(e) => {
              setCaption(e.target.value);
            }}></textarea>
        </Grid>
      </Grid>
    </div>
  );
};

const Media = ({ mediaUrls, classes }) => {
  return (
    <div
      style={{
        marginTop: 20,
      }}>
      <PostSlideShow slides={mediaUrls} className={classes.imgSlide} />
    </div>
  );
};
