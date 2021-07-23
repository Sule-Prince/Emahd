import React, { useState, useRef } from "react";
import {
  Grid,
  TextareaAutosize,
  makeStyles,
  Fab,
  ButtonBase,
} from "@material-ui/core";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SendIcon from "@material-ui/icons/Send";
import MicIcon from "@material-ui/icons/Mic";

import { useDispatch } from "react-redux";
import {
  updateChatMessages,
  updateLastMessage,
  setUserMsgsThunk,
} from "../../../redux/userChatsSlice";
import { audioRecorder } from "../../../utils/audioRecorder";
import CameraDevice from "../../SubComponents/CameraDevice";

const useStyles = makeStyles({
  textField: {
    background: "none",
    zIndex: 10,
    border: "none",
    minHeight: 22,
    width: "calc(100% - (58px + 2.5%))",
    maxHeight: 80,
    resize: "none",
    overflowY: "auto !important",
    padding: "0px 10px 5px 8px",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    "&:focus": {
      border: "none",
      outline: "none",
    },
  },
});

const TextBox = ({ userId, roomId, audioStream, setAudio }) => {
  const [message, setMessage] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  // const [recTime, setRecTime] = useState(0);

  const recorder = useRef(null);

  const dispatch = useDispatch();

  const classes = useStyles();

  const sendMessage = () => {
    if (!message.trim()) return;

    const createdAt = Date.now(),
      data = { sender: userId, message, type: "text", [userId]: createdAt };

    /* 
    TODO:: Update UI to give pending and done status 
           of messages to be delivered to other user
    */
    dispatch(setUserMsgsThunk({ roomId, data, createdAt }));

    dispatch(updateLastMessage({ message, createdAt, roomId }));
    setMessage("");
  };

  const recordAudio = () => {
    if (message.trim().length !== 0) return;

    audioRecorder(recorder, setAudio, setIsRecording, audioStream);
    setInterval(() => {}, 1000);
  };

  return (
    <Grid
      container
      alignItems="flex-end"
      style={{
        position: "fixed",
        bottom: 0,
        paddingBottom: 6,
        background: "linear-gradient(45deg, #ddd, #d8d8d8)",
      }}>
      <Grid
        alignItems="flex-end"
        container
        style={{
          background: "#fff",
          borderRadius: 20,
          width: "calc(100% - 58px)",
          padding: 4,
          margin: "0px 6px",
          fontSize: "calc(.8rem + .65vmin)",
          backgroundColor: "#f1f1f1",
          boxShadow:
            "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        }}>
        <div>
          <ButtonBase
            style={{
              borderRadius: "50%",
              padding: 5,
              background: "linear-gradient(45deg, #aa00ff, #6a1b9a)",
            }}
            onClick={() => {
              setShowCamera(true);
            }}>
            <CameraAltIcon
              style={{
                fontSize: "1.28rem",
                color: "#fff",
              }}
            />
          </ButtonBase>

          {showCamera && (
            <div
              style={{
                width: "100vw",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 1,
              }}>
              <CameraDevice />
            </div>
          )}
        </div>
        <TextareaAutosize
          className={classes.textField}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div>
          <ButtonBase style={{ borderRadius: "50%", padding: 5 }}>
            <AttachFileIcon
              style={{
                fontSize: "1.28rem",
                color: "#555",
                transform: "rotateZ(-45deg)",
              }}
            />
          </ButtonBase>
        </div>
      </Grid>
      <span>
        <Fab
          style={{
            height: 36,
            width: 36,
            color: "#fff",
            margin: "0px 8px 0px 2px",
            background: "linear-gradient(45deg, #aa00ff, #6a1b9a)",
          }}
          className={isRecording ? "animate-scale" : null}
          color="secondary"
          onTouchStart={recordAudio}
          onMouseDown={recordAudio}
          onMouseUp={() => {
            if (isRecording) recorder.current.stop();
            else sendMessage();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            if (isRecording) recorder.current.stop();
            else sendMessage();
          }}>
          {message.trim() !== "" ? (
            <SendIcon style={{ fontSize: "1.2rem" }} />
          ) : (
            <MicIcon
              style={{
                fontSize: "1.2rem",
                color: isRecording ? "#f00" : "inherit",
                transition: "all .5s ease-in-out",
              }}
            />
          )}
        </Fab>
      </span>
    </Grid>
  );
};

export default TextBox;
