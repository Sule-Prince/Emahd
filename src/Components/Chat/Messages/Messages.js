import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Typography, makeStyles, Avatar } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import ContentLoader from "react-content-loader";

import {
  markRead,
  createRoomThunk,
  updateChatMessages,
  clearRead,
} from "../../../redux/userChatsSlice";

import TextBox from "./TextBox";
import MyAudio from "../../SubComponents/MyAudio";
import ScrollToBottom from "../../SubComponents/Scroll-To-Bottom";
import { projectFirestore } from "../../../firebase/FBConfig";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100vw",
    position: "fixed",
    top: 0,
    zIndex: 10,
    background: "linear-gradient(45deg, #ddd, #ddd, #fff)",
    transition: "all .5s cubic-bezier(0, .4, .6, 1)",
  },
  wrapper: {
    height: "100%",
    paddingBottom: 40,
    overflowY: "auto",
  },
  adminMsg: {
    backgroundColor: "rgba(50, 50, 50, .8)",
    borderRadius: 10,
    padding: "3px 16px",
    color: "#eee",
    margin: "6px 0px",
    maxWidth: "90%",
    boxShadow: theme.shadows[3],
    alignSelf: "center",
  },
  userMsgs: {
    // background: "linear-gradient(45deg, #e040fb, #aa00ff)",
    backgroundColor: "#ccc",
    borderRadius: 10,
    padding: "6px 12px",
    margin: "3px 0px",
    maxWidth: "90%",
    boxShadow: theme.shadows[3],
    alignSelf: "flex-end",
  },
  otherMsgs: {
    // background: "linear-gradient(45deg, #fffdd0, #fdfff5)",
    backgroundColor: "#fdfff5",
    borderRadius: 10,
    padding: "6px 12px",
    margin: "3px 0px",
    maxWidth: "90%",
    boxShadow: theme.shadows[3],
    alignSelf: "flex-start",
  },
}));

const Messages = ({
  msgsData: {
    roomId,
    imageUrl,
    type = "private",
    userId: otherUserId,
    handle: otherUserHandle,
  },
  setDisplay,
  setStyles,
  styles,
}) => {
  const [audio, setAudio] = useState({ size: 0, src: "" });
  const [modRoomId, setModRoomId] = useState(roomId);

  const audioStreamRef = useRef(null);

  const classes = useStyles();
  const dispatch = useDispatch();

  const messages = useSelector((state) => state.chats.messages.data[modRoomId]);
  const { imageUrl: userImageUrl, userId } = useSelector(
    (state) => state.user.data
  );

  useEffect(() => {
    if (!userId || !otherUserId) return;
    if (roomId) return;

    let length =
      userId.length > otherUserId.length ? otherUserId.length : userId.length;

    for (let i = 0; i < length; i++) {
      if (userId[0] > otherUserId[0]) setModRoomId(`${userId}-${otherUserId}`);
      else if (otherUserId[0] > userId[0])
        setModRoomId(`${otherUserId}-${userId}`);
    }
  }, [roomId, userId, otherUserId]);

  useEffect(() => {
    const getAudioStream = async () => {
      const constraint = {
        video: false,
        audio: true,
      };
      const audioStream = await navigator.mediaDevices.getUserMedia(constraint);

      audioStreamRef.current = audioStream;
    };

    getAudioStream();
  }, []);

  useEffect(() => {
    if (roomId || !modRoomId) return;

    dispatch(
      createRoomThunk({
        roomId: modRoomId,
        type,
        handle: otherUserHandle,
      })
    );

    // eslint-disable-next-line
  }, [roomId, modRoomId]);

  useEffect(() => {
    if (!messages) return;
    if (messages.unread.length === 0) return;
    dispatch(markRead(modRoomId));

    // eslint-disable-next-line
  }, [messages ? messages.unread : null]);

  useEffect(() => {
    if (!modRoomId) return;

    const unsubscribe = projectFirestore
      .collection("messages")
      .doc(modRoomId)
      .collection("messages")
      .onSnapshot((doc) => {
        const data = [];
        doc.docChanges().forEach((docs) => data.push(docs.doc.data()));

        dispatch(
          updateChatMessages({
            roomId: modRoomId,
            data,
          })
        );
      });

    return () => {
      dispatch(clearRead(modRoomId));
      unsubscribe();
    };

    // eslint-disable-next-line
  }, [modRoomId]);

  return (
    <div
      className={classes.root}
      onTransitionEnd={() => {
        if (styles === "110vh") {
          setDisplay(false);
        }
      }}
      style={{ transform: `translateY(${styles})` }}>
      <div className={classes.wrapper}>
        <Header
          setStyles={setStyles}
          handle={otherUserHandle}
          imageUrl={imageUrl}
        />

        <Grid
          container
          direction="column"
          style={{
            padding: 8,
            paddingTop: 57,
            minHeight: "100%",
            flexWrap: "nowrap",
            overflowY: "auto",
          }}
          justify="flex-end">
          <ScrollToBottom>
            {messages &&
              messages.read.map((data, i) =>
                data.sender === "admin" ? (
                  <div key={i} className={classes.adminMsg}>
                    <Typography variant="body2" component="span">
                      {data.message}
                    </Typography>
                  </div>
                ) : data.sender === userId ? (
                  <div key={i} className={classes.userMsgs}>
                    <Typography variant="body2" component="span">
                      {data.message}
                    </Typography>
                  </div>
                ) : (
                  <div key={i} className={classes.otherMsgs}>
                    <Typography variant="body2" component="span">
                      {data.message}
                    </Typography>
                  </div>
                )
              )}
            {messages &&
              messages.unread.map((data, i) =>
                data.sender === userId ? (
                  <div key={i} className={classes.userMsgs}>
                    <Typography variant="body2" component="span">
                      {data.message}
                    </Typography>
                  </div>
                ) : (
                  <div key={i} className={classes.otherMsgs}>
                    <Typography variant="body2" component="span">
                      {data.message}
                    </Typography>
                  </div>
                )
              )}
          </ScrollToBottom>
          <div
            className={classes.userMsgs}
            style={{ width: "90%", maxWidth: 245, padding: "6px 3px" }}>
            <MyAudio audio={audio} imageUrl={userImageUrl} />
          </div>
        </Grid>

        <TextBox
          userId={userId}
          roomId={modRoomId}
          setAudio={setAudio}
          audioStream={audioStreamRef}
        />
      </div>
    </div>
  );
};

export default Messages;

const Header = ({ setStyles, handle, imageUrl }) => {
  const handleBackButton = () => {
    setStyles("110vh");
  };
  return (
    <Grid
      style={{
        borderBottom: "1px solid #aaa",
        color: "#fff",
        position: "fixed",
        top: 0,
        background: "linear-gradient(45deg, #aa00ff, #2196f3)",
      }}
      alignItems="center"
      container>
      <Grid
        onClick={handleBackButton}
        style={{ padding: "0px 12px 0px 4px", height: 24 }}
        item>
        <KeyboardBackspaceIcon />
      </Grid>
      <Grid item style={{ marginRight: 8, padding: "8px 0px" }}>
        <Avatar src={imageUrl} style={{ height: 35, width: 35 }} />
      </Grid>
      <Grid item>
        <Typography
          style={{ fontWeight: "bold" }}
          variant="caption"
          component="span">
          {handle}
        </Typography>
      </Grid>
    </Grid>
  );
};

const CleanChat = (props) => {
  return (
    <ContentLoader viewBox="0 0 400 160" height={160} width={400} {...props}>
      <rect x="0" y="12" rx="5" ry="5" width="220" height="10" />
      <rect x="0" y="29" rx="5" ry="5" width="220" height="10" />
      <rect x="179" y="76" rx="5" ry="5" width="220" height="10" />
      <rect x="179" y="58" rx="5" ry="5" width="220" height="10" />
      <rect x="0" y="104" rx="5" ry="5" width="220" height="10" />
      <rect x="0" y="122" rx="5" ry="5" width="220" height="10" />
    </ContentLoader>
  );
};

const sortMsgs = (array) => {
  const sortedArr = array.sort();
};
