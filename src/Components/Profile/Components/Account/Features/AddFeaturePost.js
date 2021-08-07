import React, { useState } from "react";
import {
  ButtonBase,
  Grid,
  IconButton,
  CardActionArea,
  makeStyles,
  Typography,
  TextareaAutosize,
} from "@material-ui/core";

import AddRoundedIcon from "@material-ui/icons/AddRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import SendRoundedIcon from "@material-ui/icons/SendRounded";

import { TransitionWrapper } from "../../../../SubComponents";
import { useRef } from "react";
import { Fab } from "@material-ui/core";
import { useGetClientRect } from "../../../../../utils/customHooks/helperHooks";
import toFile from "../../../../../utils/toFile";
import { urlToBlob } from "../../../../../utils/helperFunctions";
import useStorage from "../../../../../utils/customHooks/useStorage";
import { axios } from "../../../../../config/axiosConfig";
import useStoreImage from "../../../../../utils/customHooks/useStoreImage";
import IDGenerator from "../../../../../utils/IDGenerator";
import eventManager from "../../../../../utils/EventPubSub";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    zIndex: theme.zIndex.drawer,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
  },
  flexGrow: {
    flexGrow: 1,
  },
  headerRoot: {
    background: "linear-gradient( rgba(0,0,0,.3), transparent)",
  },
  addIconRoot: {
    border: "3px dashed #3d3d3d",
    borderRadius: theme.spacing(1),
    "& > *": {
      padding: theme.spacing(3),
      width: "100%",
      height: "100%",
    },
  },
  media: {
    height: "auto",
    width: "100%",
    maxHeight: "100%",
    overflow: "hidden",
    objectFit: "cover",
  },
  textarea: {
    background: "none",
    flexGrow: 1,
    fontSize: theme.typography.body1,
    color: "#fff",
    border: "none",
    resize: "none",
    padding: "0px 4px",
    "&:focus": {
      border: "none",
      outline: "none",
    },
  },
}));
function AddFeaturePost({ setDisplay, featureId }) {
  const [mediaUrl, setMediaUrl] = useState("");
  const [fileCodec, setFileCodec] = useState("");
  const [fileType, setFileType] = useState("");

  const classes = useStyles();

  const addFeatureHandler = (e) => {
    const file = e.target.files[0];
    if (mediaUrl) URL.revokeObjectURL(mediaUrl);

    if (!file) return;
    e.target.value = "";
    setFileType(file.type);
    if (file.type.startsWith("image")) {
      setFileCodec("image");
    } else {
      setFileCodec("video");
    }
    const url = URL.createObjectURL(file);
    setMediaUrl(url);
  };

  const clearMediaUrl = (display) => {
    if (display) return;

    URL.revokeObjectURL(mediaUrl);
    setMediaUrl("");
  };
  return (
    <TransitionWrapper
      className={classes.root}
      setDisplay={setDisplay}
      header={(setDisplay) => (
        <Grid container className={classes.headerRoot}>
          <Grid item className={classes.flexGrow}>
            <IconButton onClick={() => setDisplay(false)}>
              <CloseRoundedIcon style={{ color: "#fff" }} />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton color="primary">
              <DeleteRoundedIcon />
            </IconButton>
          </Grid>
        </Grid>
      )}>
      {mediaUrl && (
        <FeatureUploadpage
          setDisplay={clearMediaUrl}
          fileCodec={fileCodec}
          fileType={fileType}
          mediaUrl={mediaUrl}
          classes={classes}
          featureId={featureId}
        />
      )}
      <Grid
        style={{
          width: "100%",
          height: "100%",
        }}
        container
        justify="center"
        alignItems="center">
        <Grid container item justify="center">
          <label htmlFor="upload-image">
            <Grid className={classes.addIconRoot} item>
              <ButtonBase component="span">
                <AddRoundedIcon color="primary" fontSize="large" />
              </ButtonBase>
            </Grid>
          </label>
          <Grid
            xs={12}
            item
            style={{
              padding: "16px 0px",
            }}>
            <Typography
              variant="h6"
              align="center"
              component="p"
              style={{ fontWeight: "bold" }}>
              Create Feature Post
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <input
        type="file"
        id="upload-image"
        style={{ display: "none" }}
        accept="image/*, video/*"
        onChange={addFeatureHandler}
      />
    </TransitionWrapper>
  );
}

export default AddFeaturePost;

const ID_PROP = IDGenerator();
const FeatureUploadpage = ({
  featureId,
  fileCodec,
  fileType,
  classes,
  mediaUrl,
  setDisplay,
}) => {
  const mediaRef = useRef();
  const headerRef = useRef();

  const { height } = useGetClientRect(headerRef);

  return (
    <TransitionWrapper
      idProp={ID_PROP}
      direction="horizontal"
      style={{ backgroundColor: "#000" }}
      className={classes.root}
      setDisplay={setDisplay}
      header={(setDisplay) => (
        <Grid container className={classes.headerRoot} ref={headerRef}>
          <Grid item className={classes.flexGrow}>
            <IconButton color="primary" onClick={() => setDisplay(false)}>
              <ArrowBackRoundedIcon style={{ color: "#fff" }} />
            </IconButton>
          </Grid>
        </Grid>
      )}>
      <Grid
        style={{
          width: "100%",
          height: "100%",
          maxHeight: `calc(100% - ${height}px)`,
          position: "relative",
        }}
        container
        alignItems="center">
        {fileCodec === "image" ? (
          <img className={classes.media} src={mediaUrl} alt="feature post" />
        ) : (
          <CardActionArea
            onClick={() => {
              if (mediaRef.current.paused) mediaRef.current.play();
              else mediaRef.current.pause();
            }}>
            <video
              ref={mediaRef}
              autoPlay
              loop
              className={classes.media}
              style={{ maxWidth: "100%" }}
              src={mediaUrl}
              alt="feature post"
            />
          </CardActionArea>
        )}
        <Footer
          classes={classes}
          mediaUrl={mediaUrl}
          fileType={fileType}
          fileCodec={fileCodec}
          featureId={featureId}
        />
      </Grid>
    </TransitionWrapper>
  );
};

const Footer = ({ classes, mediaUrl, fileType, fileCodec, featureId }) => {
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);

  const storeFile = useStorage();
  const storeImgFile = useStoreImage();
  const sendFeaturePost = async () => {
    let storageUrl = await new Promise(async (res, rej) => {
      if (fileCodec === "image")
        res(await storeImgFile(mediaUrl, { quality: 0.7 }, { setProgress }));

      if (fileCodec === "video") {
        const blob = await urlToBlob(mediaUrl),
          file = toFile(blob, fileType);
        res(
          await storeFile({
            file,
            fileName: file.name,
            setProgress,
          })
        );
      }
    });

    const data = {
      caption,
      mediaUrl: storageUrl,
      createdAt: Date.now(),
      id: featureId,
      type: fileCodec,
    };

    await axios.post("/extra/addfeaturedpost", data);
    eventManager.publish("transition-wrapper", {
      direction: "vertical",
      display: false,
      id: ID_PROP,
    });
  };

  return (
    <div style={{ position: "absolute", bottom: 15, width: "100%" }}>
      <div style={{ position: "relative" }}>
        <Grid
          container
          alignItems="center"
          style={{ backgroundColor: "rgba(0, 0, 0, .4)" }}>
          <ChevronRightRoundedIcon color="secondary" />
          <TextareaAutosize
            placeholder="Enter caption here..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className={classes.textarea}
            rowsMax={7}></TextareaAutosize>
        </Grid>
        <Fab
          style={{
            height: 50,
            width: 50,
            position: "absolute",
            right: "5%",
            top: -50,
            backgroundColor: "#2196f3",
            color: "#fff",
          }}
          onClick={sendFeaturePost}>
          <SendRoundedIcon fontSize="small" />
        </Fab>
      </div>
    </div>
  );
};
