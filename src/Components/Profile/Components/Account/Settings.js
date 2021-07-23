import React from "react";

import {
  Grid,
  Typography,
  Divider,
  Button,
  makeStyles,
  IconButton,
  Portal,
} from "@material-ui/core";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import { useState } from "react";
import LikedPosts from "./LikedPosts";
import { useDispatch, useSelector } from "react-redux";
import { userLikedPostsThunk } from "../../../../redux/userDataSlice";
import PersonalInfo from "./PersonalInfo";
import MessagePage from "../../../SubComponents/MessagePage";
import { axios } from "../../../../config/axiosConfig";
import {
  closeSnackBar,
  openSnackBar,
} from "../../../../redux/userActionsSlice";
import { projectAuth } from "../../../../firebase/FBConfig";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    zIndex: theme.zIndex.drawer,
    overflowY: "auto",
    transition: "all .5s cubic-bezier(0, .4, .6, 1)",
    position: "absolute",
    top: 0,
  },
}));

const Settings = ({ styles, setStyles }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const likesArray = useSelector((state) => state.user.likes);

  const [openFeedback, setOpenFeedback] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [displayPosts, setDisplayPosts] = useState(false);
  const [displayPersonalInfo, setDisplayPersonalInfo] = useState(false);

  const sendData = (type, response) => {
    return (message) => {
      dispatch(
        openSnackBar({
          message: "Sending...",
          shouldClose: false,
          loading: true,
        })
      );
      return axios.post("/user/feedback", { type, message }).then(() => {
        dispatch(closeSnackBar());
        dispatch(
          openSnackBar({
            message: response,
            duration: 3000,
          })
        );
      });
    };
  };
  const sendReport = sendData("report", "Report sent successfully.");
  const sendFeedback = sendData("feedback", "Feedback sent successfully.");

  const logout = async () => {
    await projectAuth.signOut();

    localStorage.removeItem("token");
    window.location.reload();
  };

  const showLikedPosts = () => {
    setDisplayPosts(true);
    dispatch(userLikedPostsThunk(likesArray));
  };

  const openPersonalInfo = () => {
    setDisplayPersonalInfo(true);
  };

  return (
    <>
      <div
        className={classes.root}
        style={{
          transform: `translateX(${styles})`,
        }}>
        <Grid container>
          <Header setStyles={setStyles} />
          <Grid item xs={12}>
            <Button
              style={{
                padding: 8,
                textTransform: "capitalize",
                justifyContent: "flex-start",
              }}
              fullWidth
              onClick={showLikedPosts}>
              Posts you've Liked
            </Button>
            {displayPosts ? (
              <LikedPosts setDisplayPosts={setDisplayPosts} />
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <Divider style={{ width: "100%" }} />
          </Grid>

          <Grid item xs={12}>
            <Button
              style={{
                padding: 8,
                textTransform: "capitalize",
                justifyContent: "flex-start",
              }}
              fullWidth
              onClick={openPersonalInfo}>
              Personal Information
            </Button>
            {displayPersonalInfo ? (
              <PersonalInfo setOpenInfo={setDisplayPersonalInfo} />
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <Divider style={{ width: "100%" }} />
          </Grid>

          {/*  <Grid item xs={12}>
          <Button
            style={{
              padding: 8,
              textTransform: "capitalize",
              justifyContent: "flex-start",
            }}
            fullWidth
            // onClick={openPersonalInfo}
          >
            Images Quality
          </Button>
        </Grid> 
        
         <Grid item xs={12}>
          <Button
            style={{
              padding: 8,
              textTransform: "capitalize",
              justifyContent: "flex-start",
            }}
            fullWidth
            // onClick= {openPersonalInfo}
          >
            Change Password
          </Button>
         
        </Grid>
        */}

          <Grid item xs={12}>
            <Button
              style={{
                padding: 8,
                textTransform: "capitalize",
                justifyContent: "flex-start",
              }}
              fullWidth
              onClick={() => {
                setOpenFeedback(true);
              }}>
              Send Us Feedback
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Divider style={{ width: "100%" }} />
          </Grid>

          <Grid item xs={12}>
            <Button
              style={{
                padding: 8,
                textTransform: "capitalize",
                justifyContent: "flex-start",
              }}
              fullWidth
              onClick={() => {
                setOpenReport(true);
              }}>
              Report a problem
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Divider style={{ width: "100%" }} />
          </Grid>

          <Grid item xs={12}>
            <Button
              style={{ padding: 8, justifyContent: "flex-start" }}
              fullWidth
              onClick={logout}
              color="primary">
              Log Out
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Divider style={{ width: "100%" }} />
          </Grid>
        </Grid>
      </div>

      {openFeedback && (
        <Portal container={document.body}>
          <MessagePage
            button="Send Feeback"
            header="Send us feedback"
            mainText="Are you happy about the user experience of the app, or see where we can improve the app? Send us a feedback and we'll review your thoughts."
            commentSection="Type your feedback here."
            setDisplay={setOpenFeedback}
            sendData={sendFeedback}
          />
        </Portal>
      )}

      {openReport && (
        <Portal container={document.body}>
          <MessagePage
            button="Send Report"
            header="Report a problem"
            mainText="Is there a problem? Feel free to report it here"
            commentSection="Type your issue here."
            setDisplay={setOpenReport}
            sendData={sendReport}
          />
        </Portal>
      )}
    </>
  );
};

export default React.memo(Settings);

const Header = ({ setStyles }) => {
  const handleBackButton = () => {
    setStyles("110vw");
  };
  return (
    <Grid
      style={{
        height: "45px",
        alignItems: "center",
        borderBottom: "1px solid #aaa",
      }}
      container>
      <Grid style={{ flexGrow: 1, paddingLeft: "1rem" }} item>
        <IconButton
          color="primary"
          onClick={handleBackButton}
          style={{ marginRight: 5, marginLeft: "-1rem" }}>
          <KeyboardBackspaceIcon />
        </IconButton>
        <Typography
          style={{ fontWeight: "bold" }}
          variant="body1"
          component="span">
          Settings
        </Typography>
      </Grid>
    </Grid>
  );
};
