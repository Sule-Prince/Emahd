import React, { useEffect, useRef } from "react";

import { makeStyles, Grid } from "@material-ui/core";

import Post from "../Home/Post";

import { useSelector, useDispatch } from "react-redux";
import { openSnackBar } from "../../../../redux/userActionsSlice";
import Header from "../../../SubComponents/Header";
import Loading from "../../../SubComponents/Loading";
import MultiPost from "../../../SubComponents/MultiPost";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    zIndex: theme.zIndex.appBar,
    // overflowY: "hidden",
    position: "absolute",
    top: 0,
  },
}));

const LikedPosts = ({ setDisplayPosts }) => {
  const classes = useStyles();

  const rootRef = useRef(null);

  const likedPosts = useSelector((state) => state.user.likedPosts);
  const dispatch = useDispatch();

  console.log(likedPosts.data);

  useEffect(() => {
    if (likedPosts.error)
      dispatch(
        openSnackBar({
          type: "error",
          duration: 4000,
          message: likedPosts.error,
        })
      );
  }, [likedPosts.error, dispatch]);

  /* Reverse the values of the array */
  const reArrangeArray = (array) => {
    const newArray = Array(array.length);
    for (let i = array.length - 1; i >= 0; i--) {
      newArray[array.length - 1 - i] = array[i];
    }
    return newArray;
  };

  return (
    <div className={classes.root} ref={rootRef}>
      <Grid container style={{ display: "initial", overflowY: "auto" }}>
        <Header setDisplay={setDisplayPosts} data="Liked Posts" />
        {likedPosts.isLoading ? (
          <Loading />
        ) : (
          likedPosts.data &&
          reArrangeArray(likedPosts.data).map((post) => {
            return post.section === "media" ? (
              <MultiPost key={post.postId} mediaPost={post} rootRef={rootRef} />
            ) : (
              <Post post={post} rootRef={rootRef} key={post.postId} />
            );
          })
        )}
      </Grid>
    </div>
  );
};

export default LikedPosts;
