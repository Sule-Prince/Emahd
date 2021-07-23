import { makeStyles } from "@material-ui/core";

import { useState, useRef } from "react";

// Styles for the Camera functionality
// Located at the CameraDevices component

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    backgroundColor: "#000",
    position: "relative",
    "& > *": {
      position: "absolute",
    },
  },
  headerRoot: {
    height: "auto",
    top: 15,
    zIndex: 1000,
    "& > *": {
      color: "#fff",
      fontWeight: "bold",
      backgroundColor: "rgba(90, 90, 90, .7)",
      padding: "10px 25px",
      borderRadius: "20px",
    },
  },
  recordedRoot: {
    height: "auto",
    top: 0,
    zIndex: 1000,
    "& > *": {
      padding: 10,
      paddingTop: 0,
    },
  },
  footerRoot: {
    height: "calc(15vmin + 30px)",
    position: "relative",
    bottom: 0,
    background:
      "linear-gradient(0deg, rgba(0,0,0, 0), rgba(0,0,0,.3), rgba(0,0,0, 0))",
    "& > *": {
      position: "absolute",
    },
  },
  recordButton: {
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, .4)",
    borderRadius: "50%",
    "& > *": {
      width: "13vmin",
      height: "13vmin",
      maxHeight: 70,
      maxWidth: 70,
      minHeight: 35,
      minWidth: 35,
      backgroundColor: "#fff",
      borderRadius: "50%",
    },
  },
}));

const useCamera = () => {
  const [timer, setTimer] = useState(0),
    [size, setSize] = useState(0),
    [data, setData] = useState(null),
    [view, setView] = useState("user"),
    [type, setType] = useState("video"),
    videoConstraint = {
      video: { facingMode: "user", width: 4096, height: 4096 },
      audio: true,
    };

  let startTime;

  const recorderStream = useRef(null),
    cameraStream = useRef(null),
    chunks = useRef([]),
    typeRef = useRef("video"),
    intervalId = useRef(null);

  const getCameraAccess = async (callback) => {
    cameraStream.current = await navigator.mediaDevices.getUserMedia(
      videoConstraint
    );
    recorderStream.current = new MediaRecorder(cameraStream.current);
    if (!callback) return;
    callback(cameraStream.current);
  };

  const start = (callback) => {
    if (!cameraStream.current) return;
    chunks.current = [];
    setTimer(0);
    setSize(0);
    setData(null);

    if (recorderStream.current.state === "recording")
      recorderStream.current.stop();
    recorderStream.current.onstart = () => {
      if (callback) callback();
    };
    recorderStream.current.ondataavailable = (e) => {
      chunks.current.push(e.data);
    };

    recorderStream.current.start();
    startTime = Date.now();
    intervalId.current = setInterval(() => {
      setTimer((prev) => (prev += 1));
    }, 1000);

    return { timer, size };
  };

  const stop = (callback) => {
    if (recorderStream.current.state !== "recording") return;
    clearInterval(intervalId.current);

    recorderStream.current.onstop = () => {
      const blob = new Blob(chunks.current, { type: "video/mp4" });

      setSize(blob.size / 1048576);
      const timeDiff = (Date.now() - startTime) / 1000;
      if (timeDiff <= 0.6) setType("image");
      if (callback) callback(typeRef.current, blob);
      chunks.current = [];
    };

    setType("video");
    const timeDiff = (Date.now() - startTime) / 1000;

    /*  if (timeDiff < 0.3) {
      setTimeout(() => {
        recorderStream.current.stop();
        setType("image");
      }, 120);

      return;
    } */
    if (timeDiff <= 0.6) {
      setType("image");
      typeRef.current = "image";
      recorderStream.current.stop();
      return;
    }
    recorderStream.current.stop();
  };

  const getMediaStream = () => {
    return cameraStream.current;
  };
  const resetData = () => {
    setTimer(0);
    setSize(0);
    setData(null);
    setType("video");
  };

  const changeView = (callback) => {
    if (videoConstraint.video.facingMode === "user") {
      setView("environment");
      videoConstraint.video.facingMode = "environment";
    } else {
      videoConstraint.video.facingMode = "user";
      setView("user");
    }
    if (cameraStream.current) {
      const tracks = cameraStream.current.getTracks();
      tracks.forEach((track) => track.stop());
    }
    if (!callback) return;
    getCameraAccess(callback);
    return view;
  };

  return {
    getCameraAccess,
    getMediaStream,
    start,
    stop,
    resetData,
    changeView,
    metaData: { view, type, size, timer },
  };
};

export default useCamera;
