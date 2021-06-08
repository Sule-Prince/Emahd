import React, { useEffect, useState, useRef } from "react";

import { Badge, CardActionArea, Grid, makeStyles } from "@material-ui/core";

import Header from "../SubComponents/Header";
import { useSelector } from "react-redux";
import Messages from "./Messages/Messages";
import UserInfo from "../SubComponents/UserInfo";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    zIndex: theme.zIndex.appBar,
    position: "fixed",
    top: 0,
    left: 0,
  },
  userInfoRoot: {
    display: "flex",
    justifyContent: "flex-start",
    "& > :nth-child(1)": {
      width: "auto",
      maxWidth: "100%",
    },
    "& > :nth-child(2)": {
      height: 65,
      display: "flex",
      width: 25,
      alignItems: "center",
      justifyContent: "center",
    },
  },
}));

const Chat = ({ setDisplay }) => {
  const [msgsData, setMsgsData] = useState({});
  const [displayMsg, setDisplayMsg] = useState(false);
  const [msgStyles, setMsgStyles] = useState("110vh");

  const audioStreamRef = useRef(null);

  const classes = useStyles();

  const userChats = useSelector((state) => state.chats.chats.data);
  const userMsgs = useSelector((state) => state.chats.messages.data);
  const { imageUrl } = useSelector((state) => state.user.data);

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

  return (
    <div className={classes.root}>
      <Grid container style={{ maxHeight: "100vh", overflow: "hidden auto" }}>
        <Grid item xs={12}>
          <Header
            data="Chats"
            setDisplay={setDisplay}
            avatar={true}
            imageUrl={imageUrl}
          />
        </Grid>

        {userChats.map((chat, i) => (
          <Grid
            container
            alignItems="center"
            item
            key={chat.socketId}
            onClick={() => {
              setMsgsData({
                socketId: chat.socketId,
                i,
                handle: chat.handle,
                imageUrl: chat.imageUrl,
              });
              setDisplayMsg(true);
              setMsgStyles("0px");
              // document.documentElement.requestFullscreen()
            }}>
            <CardActionArea className={classes.userInfoRoot}>
              <Grid
                item
                style={
                  userMsgs[chat.handle] &&
                  userMsgs[chat.handle].unread.length > 0
                    ? {
                        width: "calc(100% - 31px)",
                        fontWeight: "bold",
                        color: "#000",
                      }
                    : {
                        width: "100%",
                        color: "#0000008a",
                      }
                }>
                <UserInfo
                  imageUrl={chat.imageUrl}
                  header={chat.handle}
                  subheader={chat.lastMsg}
                />
              </Grid>
              {userMsgs[chat.handle] &&
                userMsgs[chat.handle].unread.length > 0 && (
                  <Grid item style={{ padding: "0px 3px" }}>
                    <Badge
                      badgeContent={userMsgs[chat.handle].unread.length || null}
                      color="primary"
                    />
                  </Grid>
                )}
            </CardActionArea>
          </Grid>
        ))}
        <Grid container item xs={12}>
          {displayMsg && (
            <Messages
              audioStream={audioStreamRef}
              setDisplay={setDisplayMsg}
              setStyles={setMsgStyles}
              styles={msgStyles}
              msgsData={msgsData}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
