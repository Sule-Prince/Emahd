import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Fab, Grid } from "@material-ui/core";

import Slideshow from "../../../SubComponents/Slideshow";
import FollowCardTwo from "../../../SubComponents/FollowCardTwo";

import {
  bannerPostsThunk,
  followSuggestThunk,
} from "../../../../redux/extraDataSlice";
import Loader from "../../../SubComponents/Loader";

import { AddRounded } from "@material-ui/icons";
import MediaUpload from "./MediaUpload";

import useStyles from "./styles";

const AddMedia = () => {
  const [styles, setStyles] = useState({
    fabOpacity: [1, 0],
    upperTranslate: [0, 0],
  });

  const dispatch = useDispatch();

  const followSuggest = useSelector((state) => state.extra.followSuggest);
  const bannerPosts = useSelector((state) => state.extra.bannerPosts);

  const classes = useStyles();

  useEffect(() => {
    if (followSuggest.users.length > 0) return;
    dispatch(followSuggestThunk());

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (bannerPosts.data.length > 0) return;

    dispatch(bannerPostsThunk());

    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <Grid
        container
        className={classes.mediaContainer}
        alignItems="center"
        justify="center"
        style={{
          transform: `translateY(${styles.upperTranslate[0]})`,
          transitionDelay: `${styles.upperTranslate[1]}s`,
        }}>
        <div
          style={{
            paddingBottom: "56.25%",
            position: "relative",
            width: "100%",
            marginBottom: 16,
          }}>
          <Slideshow
            slides={bannerPosts.data}
            style={{ position: "absolute" }}
          />

          {bannerPosts.isLoading && (
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: "50%",
                border: "1px solid #ddd",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}></div>
          )}
        </div>
        <Grid
          style={{
            borderBottom: "1px solid #ccc",
            maxHeight: 340,
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
      </Grid>
      <Grid container justify="center" className={classes.addRoot}>
        <label htmlFor="upload-media">
          <Fab
            component="span"
            style={{
              opacity: styles.fabOpacity[0],
              transitionDelay: `${styles.fabOpacity[1]}s`,
            }}
            className={classes.addFab}
            onClick={() => {
              setStyles((prev) => ({
                ...prev,
                fabOpacity: [0, 0],
                upperTranslate: ["-100vh", 0.5],
              }));
            }}>
            <AddRounded style={{ color: "#fff" }} />
          </Fab>
        </label>
      </Grid>

      <MediaUpload setStyles={setStyles} />
    </div>
  );
};

export default AddMedia;

const UtilsNavBar = ({ classes, users }) => {
  return (
    <div className={classes.utilsNavBar}>
      {users.map((user, i) => (
        <span key={user.handle} style={{ display: "inline-block" }}>
          <FollowCardTwo
            handle={user.handle}
            fullName={user.fullName}
            imageUrl={user.imageUrl}
            coverPhoto={user.coverPhoto}
            index={i}
          />
        </span>
      ))}
    </div>
  );
};
