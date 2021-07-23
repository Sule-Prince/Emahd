import React, { useState, useEffect, useRef } from "react";

import { Grid, IconButton, Typography } from "@material-ui/core";
import FlipCameraAndroidIcon from "@material-ui/icons/FlipCameraAndroid";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import useCamera, { useStyles } from "./CameraDevicesFuncs";
import RecordTimer from "./RecordTimer";

const CameraDevice = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const {
    getCameraAccess,
    changeView,
    getMediaStream,
    resetData,
    start,
    stop,
    metaData,
  } = useCamera();
  const videoRef = useRef(null);
  const imgRef = useRef(null);

  const classes = useStyles();

  useEffect(() => {
    videoRef.current.volume = 0;
    getCameraAccess(
      (cameraStream) => (videoRef.current.srcObject = cameraStream)
    );
    // eslint-disable-next-line
  }, []);

  const cancelRecorded = () => {
    setRecorded(false);
    setIsRecording(false);
    videoRef.current.volume = 0;
    videoRef.current.srcObject = getMediaStream();
    setOpacity(0);
    resetData();
    videoRef.current.src = null;
    imgRef.current.src = null;
  };

  return (
    <div className={classes.root}>
      <Header
        metaData={metaData}
        cancelRecorded={cancelRecorded}
        classes={classes}
        recorded={recorded}
        isRecording={isRecording}
        setRecorded={setRecorded}
        setIsRecording={setIsRecording}
      />
      <DisplayMedia
        videoRef={videoRef}
        imgRef={imgRef}
        type={metaData.type}
        view={metaData.view}
        opacity={opacity}
        setOpacity={setOpacity}
      />
      <Footer
        stop={stop}
        start={start}
        changeView={changeView}
        classes={classes}
        videoRef={videoRef}
        imgRef={imgRef}
        recorded={recorded}
        isRecording={isRecording}
        setOpacity={setOpacity}
        setRecorded={setRecorded}
        setIsRecording={setIsRecording}
      />
    </div>
  );
};
export default CameraDevice;

const Header = ({
  metaData: { timer, type, size },
  classes,
  recorded,
  isRecording,
  cancelRecorded,
}) => {
  const min = Math.floor(timer / 60)
      .toString()
      .padStart(2, 0),
    sec = (timer % 60).toString().padStart(2, 0);
  return (
    <>
      <Grid
        container
        justify="center"
        alignItems="flex-start"
        className={classes.headerRoot}>
        {isRecording && <RecordTimer min={min} sec={sec} />}
      </Grid>

      {recorded && (
        <Grid container className={classes.recordedRoot} direction="column">
          <Grid
            container
            item
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,.3) 45%, rgba(0,0,0,.0)) 100%",
            }}>
            <Grid item style={{ flexGrow: 1 }}>
              <IconButton
                style={{ color: "#fff" }}
                onClick={() => {
                  cancelRecorded();
                }}>
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton style={{ color: "#fff" }}>
                <DoneIcon />
              </IconButton>
            </Grid>
          </Grid>

          <Grid container item>
            {type !== "image" && (
              <Grid container item xs={6}>
                <Typography
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    backgroundColor: "rgba(90, 90, 90, .7)",
                    padding: "8px 15px",
                    borderRadius: "15px",
                  }}
                  variant="body2"
                  component="span">
                  {`${min} : ${sec}`}
                </Typography>
              </Grid>
            )}
            <Grid
              container
              item
              justify="flex-end"
              xs={type === "image" ? 12 : 6}>
              <Typography
                variant="body2"
                component="span"
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  backgroundColor: "rgba(90, 90, 90, .7)",
                  padding: "8px 10px",
                  borderRadius: "15px",
                }}>
                {`${Math.round(size)}mb`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

const DisplayMedia = ({
  videoRef,
  imgRef,
  view,
  type,
  opacity,
  setOpacity,
}) => {
  return (
    <Grid
      container
      style={{
        height: "100%",
      }}>
      <Grid item xs={12}>
        <img
          ref={imgRef}
          onLoad={() => {
            setOpacity(1);
            videoRef.current.srcObject = null;
          }}
          style={{
            maxWidth: "100vw",
            maxHeight: "100vh",
            width: "100%",
            height: "100%",
            opacity,
            display: type === "image" ? "initial" : "none",
            objectFit: "cover",
            transform: view === "user" ? "scaleX(-1)" : "scaleX(1)",
          }}
          alt="Feed from Device's camera"
        />

        <video
          ref={videoRef}
          // onCanPlay={}
          autoPlay
          loop
          style={{
            maxWidth: "100vw",
            maxHeight: "100vh",
            width: "100%",
            height: "100%",
            display: type === "video" ? "initial" : "none",
            objectFit: "cover",
            // opacity,
            transition: "all .5s cubic-bezier(0, .4, .6, 1)",
            transform: view === "user" ? "scaleX(-1)" : "scaleX(1)",
          }}></video>
      </Grid>
    </Grid>
  );
};

const Footer = ({
  classes,
  start,
  stop,
  changeView,
  videoRef,
  imgRef,
  recorded,
  setRecorded,
  setIsRecording,
}) => {
  const [bgColor, setBgColor] = useState("#fff");
  const [className, setClassName] = useState(`${classes.recordButton}`);
  const [scale, setScale] = useState({ scale: 1, yoyo: 1 });

  const dispatch = useDispatch();

  const startRecord = (e) => {
    start(() => {
      setBgColor("#f00");
      setClassName(`${classes.recordButton} bgPos`);
      setScale({ scale: [1.2, 1], yoyo: Infinity });
      setIsRecording(true);
      setRecorded(false);
    });
  };

  const stopRecord = (e) => {
    stop((type, blob) => {
      setBgColor("#fff");
      setClassName(`${classes.recordButton}`);
      setScale({ scale: [1, 1], yoyo: 1 });
      setIsRecording(false);
      setRecorded(true);

      let src;
      if (type === "image") {
        const canvas = document.createElement("canvas");
        const height = videoRef.current.videoHeight,
          width = videoRef.current.videoWidth;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(videoRef.current, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            src = URL.createObjectURL(blob);
            imgRef.current.src = src;
          },
          "image/jpeg",
          1
        );

        return;
      }
      src = URL.createObjectURL(blob);
      videoRef.current.volume = 1;
      videoRef.current.srcObject = null;
      videoRef.current.src = src;
      console.log(src);
    });
  };

  return (
    <div
      style={{ position: "absolute", bottom: 50, width: "100%", zIndex: 10 }}>
      <AnimatePresence>
        {!recorded && (
          <motion.div
            exit={{ opacity: 0, y: "40vh" }}
            transition={{ duration: 0.5 }}>
            <Grid
              container
              alignItems="center"
              justify="center"
              className={classes.footerRoot}>
              <motion.span
                className={className}
                animate={{ scale: scale.scale }}
                transition={{
                  duration: 0.7,
                  yoyo: scale.yoyo,
                  type: "spring",
                }}>
                <motion.div
                  animate={{ backgroundColor: bgColor }}
                  transition={{ duration: 0.5 }}
                  onTouchStart={startRecord}
                  onMouseDown={startRecord}
                  onTouchEnd={stopRecord}
                  onMouseUp={stopRecord}></motion.div>
              </motion.span>
              <IconButton
                style={{ color: "#fff", left: "75%" }}
                onClick={() =>
                  changeView(
                    (cameraStream) =>
                      (videoRef.current.srcObject = cameraStream)
                  )
                }>
                <FlipCameraAndroidIcon fontSize="large" />
              </IconButton>
            </Grid>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
