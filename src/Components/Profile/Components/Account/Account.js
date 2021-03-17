import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  Typography,
  IconButton,
  Card,
  CardActionArea,
  Divider,
  // Button,
  CircularProgress,
} from "@material-ui/core";

import SettingsIcon from "@material-ui/icons/Settings";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

import FollowCard from "../../../SubComponents/FollowCard";

import { useSelector, useDispatch } from "react-redux";

import "./Account.css";

import { useStyles } from "./styles";
import ProfilePic from "./ProfilePic";
import UserPosts from "./UserPosts/UserPosts";
import useFileUpload from "../../../../utils/customHooks/useFileUpload";
import Settings from "./Settings";
// import Chat from "../../../Chat/Chat";
import { followSuggestThunk } from "../../../../redux/extraDataSlice";
import HeaderBase from "../../../SubComponents/HeaderBase";
import Loader from "../../../SubComponents/Loader";
import {
  uploadCoverPhotoError,
  uploadedCoverPhoto,
  uploadingCoverPhoto,
} from "../../../../redux/userActionsSlice";
import BackDrop from "../../../SubComponents/BackDrop";
import RefreshWrapper from "../../../SubComponents/RefreshWrapper";
import useRefresh from "../../../../utils/customHooks/useRefresh";
import { userDataThunk } from "../../../../redux/userDataSlice";

const Account = () => {
  // Styles to be used by the settings Component to display the Settings
  const [styles, setStyles] = useState("110vw");
  // const [display, setDisplay] = useState(false);

  const rootRef = useRef(null);

  const dispatch = useDispatch();

  const classes = useStyles();

  const userData = useSelector((state) => state.user.data);
  // const isLoading = useSelector(state => state.user.isLoading);

  const posts = useSelector((state) => state.posts.posts);
  const followSuggest = useSelector((state) => state.extra.followSuggest);

  const onRefresh = useRefresh(userDataThunk);

  useEffect(() => {
    if (followSuggest.users.length > 0) return;

    dispatch(followSuggestThunk());

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className={classes.root} ref={rootRef}>
        <Settings styles={styles} setStyles={setStyles} />

        <Grid container style={{ height: "100%" }}>
          <Grid item style={{ width: "100%", top: 0, zIndex: 10 }}>
            <Header
              classes={classes}
              handle={userData.handle}
              setStyles={setStyles}
            />
          </Grid>

          {/* <RefreshWrapper onRefresh={onRefresh}> */}
          <Grid style={{ width: "100%" }} item>
            <CoverPhoto classes={classes} coverPhoto={userData.coverPhoto} />
          </Grid>
          <Grid xs={12} item test="test">
            <ProfilePic classes={classes} imageUrl={userData.imageUrl} />
          </Grid>
          <Grid container item xs={12}>
            <Bio data={userData} />
          </Grid>
          <Grid justify="center" container item xs={12}>
            {/* {display && <Chat setDisplay={setDisplay} />}
              <Button
                variant="contained"
                size="small"
                onClick={() => setDisplay(true)}
                style={{
                  width: "92%",
                  fontSize: ".72rem",
                  color: "#2196f3",
                  marginTop: "1rem",
                }}
                fullWidth>
                Messages
              </Button> */}
            <Grid
              container
              alignItems="flex-end"
              item
              xs={12}
              style={{ height: 14 }}>
              <Divider style={{ width: "100%" }} />
            </Grid>
          </Grid>
          <Grid container className={classes.followTab} item xs={12}>
            <FollowTab />
          </Grid>

          <Grid
            style={{
              borderBottom: "1px solid #ccc",
              maxHeight: 230,
              overflow: "hidden",
            }}
            xs={12}
            item>
            {followSuggest.isLoading ? (
              <Loader />
            ) : (
              followSuggest.users.length > 0 && (
                <UtilsNavBar users={followSuggest.users} classes={classes} />
              )
            )}
          </Grid>
          <Grid container item xs>
            <UserPosts posts={posts.userPost} rootRef={rootRef} />
          </Grid>
          {/* </RefreshWrapper> */}
        </Grid>
        <div className="positionFix"></div>
      </div>
    </>
  );
};

export default React.memo(Account);

const Header = ({ classes, handle, setStyles }) => {
  const openSettings = () => {
    setStyles("0px");
  };

  return (
    <HeaderBase elevation={0}>
      <Grid className={classes.headerRoot} container>
        <Grid className={classes.headerNameContainer} item>
          <Typography className={classes.headerName} variant="body2">
            {handle}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={openSettings}>
            <SettingsIcon color="primary" className={classes.settings} />
          </IconButton>
        </Grid>
      </Grid>
    </HeaderBase>
  );
};

const CoverPhoto = ({ classes, coverPhoto }) => {
  const fileUpload = useFileUpload("coverPhoto", {
    uploadedMedia: uploadedCoverPhoto,
    uploadingMedia: uploadingCoverPhoto,
    uploadError: uploadCoverPhotoError,
  });

  const isLoading = useSelector(
    (state) => state.userActions.uploadCoverPhoto.isLoading
  );

  return (
    <Grid item>
      <Card square color="primary">
        <label htmlFor="upload-cover-photo">
          <CardActionArea
            component="div"
            style={{
              position: "relative",
            }}>
            {coverPhoto ? (
              <img
                className={classes.coverPhoto}
                src={coverPhoto}
                alt="cover"
              />
            ) : (
              <div className={classes.coverPhoto}>
                <PhotoCameraIcon style={{ marginRight: 5 }} color="action" />
                <Typography variant="body2" component="span">
                  Add a cover photo
                </Typography>
              </div>
            )}
            {isLoading && (
              <BackDrop>
                <CircularProgress color="primary" thickness={5} size={25} />
              </BackDrop>
            )}
            <div
              style={{
                width: "100%",
                height: 70,
                position: "absolute",
                bottom: 0,
                background: "linear-gradient(0deg, #fff, #fff0)",
                borderRadius: "10px 10px 0px 0px",
              }}></div>
          </CardActionArea>
        </label>
      </Card>
      <input
        type="file"
        id="upload-cover-photo"
        accept="image/*"
        style={{ display: "none" }}
        onChange={fileUpload}
      />
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

const FollowTab = () => {
  const [displayFollowers, setDisplayFollowers] = useState(false);
  const [displayFollowing, setDisplayFollowing] = useState(false);

  const { friends: following, followers, noOfPosts } = useSelector(
    (state) => state.user.data
  );

  let noOfFollowers, noOfFollowing;
  if (following && followers) {
    noOfFollowers = followers.length;
    noOfFollowing = following.length;
  }

  const displayPage = (setDisplay) => {
    setDisplay(true);
  };
  return (
    <>
      {/* Followers and Following Page */}
      {/* 
			{displayFollowers && (
				<DisplayCardList
					data="Followers"
					dataList={followers}
					setDisplay={setDisplayFollowers}
				/>
			)}
			{displayFollowing && (
				<DisplayCardList
					data="Following"
					dataList={following}
					setDisplay={setDisplayFollowing}
				/>
			)} */}

      <Grid item xs={4}>
        <Typography variant="body2" component="span">
          {noOfPosts >= 0 ? noOfPosts : "_ _"}
        </Typography>
        <Typography variant="caption" color="textSecondary" component="div">
          Posts
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body2" component="span">
          {noOfFollowers >= 0 ? noOfFollowers : "_ _"}
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          style={{ cursor: "pointer" }}
          component="div"
          onClick={() => {
            displayPage(setDisplayFollowers);
          }}>
          Followers
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body2" component="span">
          {noOfFollowing >= 0 ? noOfFollowing : "_ _"}
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          style={{ cursor: "pointer" }}
          component="div"
          onClick={() => {
            displayPage(setDisplayFollowing);
          }}>
          Following
        </Typography>
      </Grid>
    </>
  );
};

const UtilsNavBar = ({ classes, users }) => {
  return (
    <div className={classes.utilsNavBar}>
      {users.map((user, i) => (
        <span
          key={user.handle}
          style={{ display: "inline-block", margin: "8px 16px" }}>
          <FollowCard
            handle={user.handle}
            fullName={user.fullName}
            imageUrl={user.imageUrl}
            index={i}
          />
        </span>
      ))}
    </div>
  );
};
