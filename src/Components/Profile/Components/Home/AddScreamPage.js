import React, { useState, useEffect, useContext } from "react";

import { IconButton, Grid, Paper, makeStyles } from "@material-ui/core";

import PhotoCamera from "@material-ui/icons/PhotoCamera";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";
import PostEdits from "../../../SubComponents/PostEdits";
import ImageEdits from "../../../../utils/ImageEditor";
import { StorageContext } from "../../Profile";

const useStyles = makeStyles((theme) => ({
  screamContainer: {
    zIndex: 1100,
    height: "100vh",
    width: "100vw",
    transition: "all .5s cubic-bezier(0, .4, .6, 1)",
    backgroundColor: "#fff",
    position: "absolute",
    top: 0,
  },
  textarea: {
    border: "none",
    resize: "none",
    flexGrow: 1,
    height: 120,
    marginTop: 0,
    paddingTop: "1rem",
    paddingLeft: "1rem",
    marginBottom: "1rem",
    "&:focus": {
      border: "none",
      outline: "none",
      backgroundColor: "#f1f1f1",
      boxShadow: theme.shadows[5],
    },
    transition: "all .5s ease-in",
  },
  inputDiv: {
    display: "flex",
    paddingRight: 10,
  },
  media: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
    objectFit: "cover",
  },
}));

const AddScreamPage = ({ styles, setStyles }) => {
  const classes = useStyles();

  const [scream, setScream] = useState("");

  const [postSettings, setPostSettings] = useState({ media: {}, text: {} });
  const [clearTransform, setClearTransform] = useState(false);

  const [textSettings, setTextSettings] = useState({
    text: "",
    style: {
      textAlign: "center",
      position: "absolute",
      fontSize: 12,
      color: "#fff",
      fontFamily: "Tahoma",
    },
  });

  const {
    fileCodec,
    mediaUrl,
    storeData,
    setMedia,
    setMediaUrl,
    setFileCodec,
  } = useContext(StorageContext);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (mediaUrl) URL.revokeObjectURL(mediaUrl);

    if (!file) return;
    e.target.value = "";
    const url = URL.createObjectURL(file);
    setMediaUrl(url);

    if (file.type.startsWith("image")) {
      setFileCodec("image");
      // return;
    } else {
      setFileCodec("video");
      setMedia(file);
    }
  };

  useEffect(() => {
    const editor = new ImageEdits();
    editor.computeAspectRatio(fileCodec, mediaUrl).then((result) => {
      setPostSettings((prev) => ({
        ...prev.text,
        media: { ...prev.media, aspectRatio: result },
      }));
    });
  }, [mediaUrl, fileCodec]);

  return (
    <div
      className={classes.screamContainer}
      style={{
        transform: `${clearTransform ? "none" : `translateY(${styles})`}`,
      }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          overflowY: "auto",
          padding: "10px 5px",
          paddingTop: 0,
        }}>
        <Header
          scream={scream}
          setScream={setScream}
          setMediaUrl={setMediaUrl}
          mediaUrl={mediaUrl}
          setStyles={setStyles}
          storeData={storeData}
          fileCodec={fileCodec}
          postSettings={postSettings}
        />

        <TextSection
          classes={classes}
          setScream={setScream}
          scream={scream}
          handleFileUpload={handleFileUpload}
        />

        {mediaUrl && (
          <DisplayMedia
            classes={classes}
            mediaUrl={mediaUrl}
            setMediaUrl={setMediaUrl}
            fileCodec={fileCodec}
            clear={setClearTransform}
            setTextSettings={setTextSettings}
          />
        )}
      </div>
    </div>
  );
};

export default AddScreamPage;

const Header = ({
  setStyles,
  setMediaUrl,
  setScream,
  scream,
  mediaUrl,
  storeData,
  fileCodec,
  postSettings,
}) => {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{
        backgroundColor: "#fff",
        padding: "5px 10px",
        paddingLeft: 0,
      }}>
      <Grid item>
        <IconButton
          color="primary"
          onClick={() => {
            setStyles("110vh");
            if (mediaUrl) URL.revokeObjectURL(mediaUrl);
            setMediaUrl(null);
            setScream("");
          }}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <Grid
        item
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "flex-end",
        }}>
        <IconButton
          disabled={scream.trim() ? false : true}
          color="primary"
          onClick={() => {
            setStyles("110vh");
            if (mediaUrl && fileCodec === "video")
              URL.revokeObjectURL(mediaUrl);
            setMediaUrl(null);
            setScream("");

            if (scream) {
              storeData("/scream", scream, fileCodec, postSettings);
            }
          }}>
          <SendIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

const TextSection = ({ classes, scream, setScream, handleFileUpload }) => {
  return (
    <div className={classes.inputDiv}>
      <textarea
        value={scream}
        className={classes.textarea}
        placeholder="Type something here...."
        onChange={(e) => {
          setScream(e.target.value);
        }}></textarea>
      <input
        type="file"
        id="upload-image"
        style={{ display: "none" }}
        accept="image/*, video/*"
        onChange={handleFileUpload}
      />
      <label htmlFor="upload-image" style={{ height: 48 }}>
        <IconButton color="primary" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    </div>
  );
};

const DisplayMedia = ({
  classes,
  mediaUrl,
  fileCodec,
  clear,
  setMediaUrl,
  setTextSettings,
}) => {
  return (
    <Grid container justify="center">
      <Grid item xs={12} style={{ padding: "1rem" }}>
        <Paper
          style={{
            padding: 10,
          }}
          elevation={3}>
          <div
            style={{
              overflow: "hidden",
              position: "relative",
            }}>
            {fileCodec === "image" ? (
              <>
                <PostEdits
                  src={mediaUrl}
                  setSrc={setMediaUrl}
                  clear={clear}
                  setTextSettings={setTextSettings}
                />

                <img className={classes.media} src={mediaUrl} alt="post" />
              </>
            ) : (
              <div
                style={{ overflow: "hidden", width: "100%", height: "100%" }}>
                <video
                  controls
                  className={classes.media}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                  src={mediaUrl}
                  alt="post"
                />
              </div>
            )}
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};
