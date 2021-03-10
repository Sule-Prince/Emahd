import React, { useState, useRef, createContext } from "react";

import { makeStyles, IconButton, Grid } from "@material-ui/core";
import PhotoLibraryRoundedIcon from "@material-ui/icons/PhotoLibraryRounded";

import StoryHeader from "./StoryHeader";
import PostEdits from "../../../../SubComponents/PostEdits";

export const MediaSelectContext = createContext();

const useStyles = makeStyles({
  root: {
    height: "100%",
    width: "100%",
    background: "linear-gradient(45deg, #fff, #888)",
  },
});

const MediaSelect = ({ setStyle, setDisplay }) => {
  const classes = useStyles();
  const [src, setSrc] = useState(null);
  const [imgStyles, setImgStyles] = useState({
    height: 0,
    width: 0,
  });

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

  const imgRef = useRef(null);

  const handleImageSelect = (e) => {
    if (src) URL.revokeObjectURL(src);
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);

    setSrc(url);
  };

  return (
    <div className={classes.root}>
      <StoryHeader
        setDisplay={setDisplay}
        setStyle={setStyle}
        // style={{ position: "absolute", zIndex: 10 }}
      >
        <label htmlFor="media-input">
          <IconButton color="primary" component="span">
            <PhotoLibraryRoundedIcon />
          </IconButton>{" "}
        </label>{" "}
      </StoryHeader>{" "}
      <input
        type="file"
        id="media-input"
        accept="image/*, video/*"
        style={{
          display: "none",
        }}
        onChange={handleImageSelect}
      />
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 1,
        }}>
        <div
          style={{
            position: "relative",
            marginTop: -23,
            // top: "calc(50% - 45px)",
            // left: "50%",
            // transform: `translate(-50%, -50%)`,
          }}>
          {src && (
            <>
              {" "}
              {imgStyles.height !== 0 && (
                <PostEdits
                  src={src}
                  setSrc={setSrc}
                  textSettings={textSettings}
                  setTextSettings={setTextSettings}
                />
              )}
              <img
                src={src}
                style={{
                  width: "100%",
                  height: "auto",
                }}
                ref={imgRef}
                onLoad={(e) => {
                  const height = e.target.naturalHeight;
                  const width = e.target.naturalWidth;

                  let scale = 1,
                    scaleX = window.innerWidth / width,
                    scaleY = (window.innerHeight - 95) / height;

                  if (scaleX > scaleY) scale = scaleY;
                  else scale = scaleX;
                  setImgStyles({
                    height: height * scale,
                    width: width * scale,
                  });
                }}
                alt="Story Media"
              />
            </>
          )}{" "}
        </div>{" "}
        <div style={textSettings.style}> {textSettings.text} </div>{" "}
      </Grid>{" "}
    </div>
  );
};

export default MediaSelect;
