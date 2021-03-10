import React from "react";

import {
  Grid,
  Typography,
  Divider,
  Button,
  makeStyles,
  IconButton,
} from "@material-ui/core";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import { useState } from "react";
import LikedPosts from "./LikedPosts";
import { useDispatch, useSelector } from "react-redux";
import { userLikedPostsThunk } from "../../../../redux/userDataSlice";
import PersonalInfo from "./PersonalInfo";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    zIndex: 1200,
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

  const [displayPosts, setDisplayPosts] = useState(false);
  const [displayPersonalInfo, setDisplayPersonalInfo] = useState(false);

  const logout = () => {
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

        <Grid item xs={12}>
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
          {/* {displayPersonalInfo ? (
            <PersonalInfo setOpenInfo={setDisplayPersonalInfo} />
          ) : null} */}
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
          {/* {
						displayPersonalInfo ? <PersonalInfo setOpenInfo= {setDisplayPersonalInfo} /> : null
					} */}
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
