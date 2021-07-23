import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence } from "framer-motion";

import {
  Grid,
  Card,
  CardActionArea,
  Typography,
  IconButton,
  Divider,
  Button,
  CircularProgress,
  Avatar,
  Portal,
} from "@material-ui/core";

import SettingsIcon from "@material-ui/icons/Settings";
import EmailIcon from "@material-ui/icons/Email";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

import "./Account.css";

import { useStyles } from "./styles";
import useFileUpload from "../../../../utils/customHooks/useFileUpload";
import useRefresh from "../../../../utils/customHooks/useRefresh";
import { useDataStore } from "../../../../utils/customHooks/persist";

import {
  uploadCoverPhotoError,
  uploadedCoverPhoto,
  uploadingCoverPhoto,
} from "../../../../redux/userActionsSlice";
import { followSuggestThunk } from "../../../../redux/extraDataSlice";
import { userDataThunk } from "../../../../redux/userDataSlice";

import {
  BackDrop,
  HeaderBase,
  Loader,
  RefreshWrapper,
  FollowCard,
  UserBio,
} from "../../../SubComponents";

import { urlToBlob } from "../../../../utils/helperFunctions";
import toFile from "../../../../utils/toFile";

import ProfilePic from "./ProfilePic";
import UserPosts from "./UserPosts/UserPosts";
import Settings from "./Settings";
import Features from "./Features/Features";
import Chat from "../../../Chat/Chat";
import { HEADER_HEIGHT } from "../../../../utils/constants";
import FeaturedDisplay from "./Features/FeaturedDisplay";

const Account = () => {
  // Styles to be used by the settings Component to display the Settings
  const [styles, setStyles] = useState("110vw");
  const [displayChat, setDisplayChat] = useState(false);
  const [displayFeatured, setDisplayFeatured] = useState(false);

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
        {displayChat && <Chat setDisplay={setDisplayChat} />}
        {displayFeatured && <FeaturedDisplay setDisplay={setDisplayFeatured} />}

        <Grid container style={{ height: "100%", overflow: "hidden" }}>
          <Grid item xs={12} style={{ top: 0, zIndex: 10 }}>
            <Header
              classes={classes}
              handle={userData.handle}
              setStyles={setStyles}
            />
          </Grid>

          <Grid
            item
            xs={12}
            style={{ height: `calc(100% - ${HEADER_HEIGHT}px)` }}>
            <RefreshWrapper onRefresh={onRefresh}>
              <Grid style={{ width: "100%" }} item>
                <CoverPhoto
                  classes={classes}
                  coverPhoto={userData.coverPhoto}
                />
              </Grid>
              <Grid xs={12} item test="test">
                <ProfilePic classes={classes} imageUrl={userData.imageUrl} />
              </Grid>
              <Grid container item xs={12}>
                <UserBio data={userData} />
              </Grid>

              <Grid
                justify="space-around"
                container
                item
                xs={12}
                className={classes.btnWrapper}>
                <Grid item xs={6}>
                  <Button
                    variant="text"
                    size="small"
                    color="primary"
                    onClick={() => setDisplayChat(true)}
                    style={{
                      fontSize: ".72rem",
                      color: "#2196f3",
                    }}
                    fullWidth>
                    <span
                      style={{
                        paddingRight: 10,
                        lineHeight: 0,
                      }}>
                      <EmailIcon fontSize="small" />
                    </span>
                    Messages
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="text"
                    size="small"
                    color="primary"
                    onClick={() => setDisplayFeatured(true)}
                    className={classes.featureBtn}
                    fullWidth>
                    Featured
                  </Button>
                </Grid>
                <Grid
                  container
                  alignItems="flex-end"
                  item
                  xs={12}
                  style={{ height: 14 }}>
                  <Divider style={{ width: "100%" }} />
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <FeaturesTab classes={classes} />
              </Grid>

              <Grid container className={classes.followTab} item xs>
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
                    <UtilsNavBar
                      users={followSuggest.users}
                      classes={classes}
                    />
                  )
                )}
              </Grid>
              <Grid container item xs>
                <UserPosts posts={posts.userPost} rootRef={rootRef} />
              </Grid>
            </RefreshWrapper>
          </Grid>
        </Grid>
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

  const { setData } = useDataStore();

  const createData = async () => {
    if (!coverPhoto || typeof coverPhoto === "undefined") return;

    const blob = await urlToBlob(coverPhoto);

    const data = toFile(blob, blob.type);

    setData(
      { ref: "coverPhoto", data },
      { storeName: "image-store", dbName: "Emahd-image" }
    );
  };

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
                onLoad={createData}
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

const FeaturesTab = ({ classes }) => {
  const [display, setDisplay] = useState(false);

  const features = useSelector((state) => state.extra.features.data);

  return (
    <div style={{ padding: "16px 8px", width: "100%" }}>
      <Portal>
        <AnimatePresence>
          {display && <Features setDisplay={setDisplay} />}
        </AnimatePresence>
      </Portal>
      <Grid container style={{ overflowX: "auto" }}>
        <div className={classes.featuresWrapper}>
          <div>
            <Grid container className={classes.featureWrapper}>
              <Grid container justify="center" item xs={12}>
                <IconButton size="small" onClick={() => setDisplay(true)}>
                  <Avatar
                    className={`${classes.featureAvatar} ${classes.featureAdd}`}>
                    <AddRoundedIcon />
                  </Avatar>
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="caption"
                  component="p"
                  style={{
                    fontWeight: 500,
                    textAlign: "center",
                    fontSize: ".7rem",
                  }}>
                  Feature
                </Typography>
              </Grid>
            </Grid>
          </div>
          {features &&
            features.map((feature) => (
              <FeatureDisplay
                classes={classes}
                key={feature.createdAt}
                imageUrl={feature.imageUrl}
                featureName={feature.featureName}
              />
            ))}
        </div>
      </Grid>
    </div>
  );
};

const FeatureDisplay = ({ imageUrl, featureName, classes }) => {
  return (
    <div>
      <Grid container className={classes.featureWrapper}>
        <Grid container item justify="center" xs={12}>
          <IconButton size="small">
            <Avatar className={classes.featureAvatar} src={imageUrl} />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="caption"
            component="p"
            style={{
              paddingRight: 8,
              paddingLeft: 4,
              fontWeight: 500,
              textAlign: "center",
              overflow: "hidden",
              fontSize: ".7rem",
              textOverflow: "ellipsis",
            }}>
            {featureName}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

const FollowTab = () => {
  const [displayFollowers, setDisplayFollowers] = useState(false);
  const [displayFollowing, setDisplayFollowing] = useState(false);

  const {
    friends: following,
    followers,
    noOfPosts,
  } = useSelector((state) => state.user.data);

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
      {users.length > 0 &&
        users.map((user, i) => (
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
