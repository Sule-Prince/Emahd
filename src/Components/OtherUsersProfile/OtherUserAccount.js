import React, { useRef } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Avatar,
  IconButton,
} from "@material-ui/core";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import { useSelector, useDispatch } from "react-redux";

import { useHistory, useParams } from "react-router-dom";

import "../Profile/Components/Account/Account.css";

import UserPosts from "../Profile/Components/Account/UserPosts/UserPosts";
import Loading from "../SubComponents/Loading";

import { useState } from "react";
import { useStyles } from "../Profile/Components/Account/styles";
import { useEffect } from "react";

import { otherUsersThunk } from "../../redux/otherUserSlice";
import { axios } from "../../config/axiosConfig";
import { addFriend, removeFriend } from "../../redux/userDataSlice";
import FollowTab from "../SubComponents/FollowTab";

export default ({ setSelectedTab }) => {
  const classes = useStyles();

  const rootRef = useRef(null);

  const user = useParams().user;
  const dispatch = useDispatch();

  const mainUser = useSelector((state) => state.user.data.handle);

  const { push } = useHistory();
  useEffect(() => {
    if (user === mainUser) {
      setSelectedTab(0);
      push("/");
      return;
    }
    dispatch(otherUsersThunk(user));

    // document.getElementsByTagName("title")[0].innerHTML = user;

    // eslint-disable-next-line
  }, [mainUser]);

  const { userData, screams, isLoading } = useSelector(
    (state) => state.otherUser
  );

  const error = useSelector((state) => state.otherUser.error.trim());

  const { coverPhoto, imageUrl, noOfPosts, friends, followers } = userData;

  if (isLoading) {
    return (
      <Grid
        container
        className={classes.root}
        style={{
          position: "fixed",
          top: 0,
          backgroundColor: "#fff",
          zIndex: 1000,
          height: "100vh",
        }}>
        <Grid item xs={12}>
          <Header classes={classes} handle={user} />
        </Grid>
        <Loading />
      </Grid>
    );
  }
  return (
    <div
      className={classes.root}
      style={{
        position: "fixed",
        top: 0,
        backgroundColor: "#fff",
        zIndex: 1000,
      }}>
      <Grid direction="column" container>
        <Grid xs={12} item>
          <Header classes={classes} handle={user} />
        </Grid>
        <Grid xs={12} item>
          <CoverPhoto classes={classes} coverPhoto={coverPhoto} />
        </Grid>
        <Grid xs={12} item>
          <ProfilePic classes={classes} friend={user} imageUrl={imageUrl} />
        </Grid>
        <Grid container item xs={12}>
          <Bio data={userData} />
        </Grid>
        <Grid container className={classes.followTab} item xs={12}>
          <FollowTab
            friends={friends}
            noOfPosts={noOfPosts}
            followers={followers}
          />
        </Grid>

        <Grid container item xs>
          <UserPosts
            posts={screams}
            otherUser={true}
            error={error}
            rootRef={rootRef}
          />
        </Grid>
      </Grid>
      <div style={{ height: 70, width: "100%" }} />
    </div>
  );
};

const Header = ({ classes, handle }) => {
  const { push } = useHistory();
  const handleBackButton = () => {
    push("/");
  };
  return (
    <Paper style={{ borderBottom: "1px solid #aaa" }} elevation={0}>
      <Grid className={classes.headerRoot} container>
        <Grid className={classes.headerNameContainer} item>
          <IconButton
            color="primary"
            onClick={handleBackButton}
            style={{ marginRight: 5, marginLeft: "-1rem" }}>
            <KeyboardBackspaceIcon />
          </IconButton>
          <Typography
            className={classes.headerName}
            variant="body2"
            component="span">
            {handle}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

const CoverPhoto = ({ classes, coverPhoto }) => {
  return (
    <Grid item>
      {coverPhoto ? (
        <img className={classes.coverPhoto} src={coverPhoto} alt="cover" />
      ) : (
        <div className={classes.coverPhoto}></div>
      )}
    </Grid>
  );
};

const ProfilePic = ({ classes, friend, imageUrl }) => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.user.data.friends);
  const [value, setValue] = useState("Follow");

  const handleFollowReq = (friend) => {
    if (value.toLowerCase() === "follow") {
      axios.post("/user/followrequest", { friend }).then(() => {
        setValue("Unfollow");
        dispatch(addFriend(friend));
      });
    } else {
      axios.post("/user/unfollowrequest", { friend }).then(() => {
        setValue("Follow");
        dispatch(removeFriend(friend));
      });
    }
  };

  useEffect(() => {
    if (friends) {
      if (friends.includes(friend)) setValue("Unfollow");
      else setValue("Follow");
    }
  }, [friends, friend]);

  return (
    <Grid container>
      <Grid
        xs={5}
        justify="center"
        container
        className={classes.avatarContainer}
        item>
        <Avatar
          className={classes.avatar}
          src={imageUrl ? imageUrl : null}></Avatar>
      </Grid>

      <Grid
        container
        justify="center"
        style={{ paddingLeft: "3vw", paddingTop: "3vmin" }}
        xs={7}
        item>
        <Grid style={{ minWidth: "90%" }} item>
          <Button
            color="primary"
            style={{ fontSize: ".7rem", minWidth: "100%" }}
            size="small"
            variant="contained"
            onClick={() => {
              handleFollowReq(friend);
            }}>
            {value}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Bio = ({ data }) => {
  return (
    <Grid style={{ paddingLeft: "8px", marginTop: -10 }} container xs={12} item>
      {data.fullName && (
        <Grid item xs={10}>
          <Typography
            style={{ fontWeight: "bold", fontSize: "1.1rem" }}
            variant="caption">
            {data.fullName}
          </Typography>
        </Grid>
      )}
      {data.course && (
        <Grid item xs={10}>
          <Typography style={{ fontWeight: "bold" }} variant="caption">
            {data.course}
          </Typography>
        </Grid>
      )}
      {data.university && (
        <Grid item xs={10}>
          <Typography style={{ fontWeight: "bold" }} variant="caption">
            {data.university}
          </Typography>
        </Grid>
      )}
      {data.bio && (
        <Grid item xs={10}>
          <Typography style={{ fontWeight: "bold" }} variant="caption">
            {data.bio}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
