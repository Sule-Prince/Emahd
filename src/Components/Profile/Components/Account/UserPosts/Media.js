import React from "react";

import { Grid, Typography, IconButton } from "@material-ui/core";

import NoPostUpload from "./NoPostUpload";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import MultiPosts from "../../../../SubComponents/MultiPosts";
import useRefresh from "../../../../../utils/customHooks/useRefresh";
import { screamsDataThunk } from "../../../../../redux/postsSlice";

const Media = ({ posts, error, otherUser }) => {
  const refresh = useRefresh(screamsDataThunk);
  return (
    <>
      {error ? (
        <Grid
          style={{ height: 300 }}
          container
          justify="center"
          alignItems="center">
          <Grid item xs={2}>
            <IconButton color="primary">
              <AutorenewIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      ) : posts.length === 0 ? (
        otherUser ? (
          <>
            <NoPostUpload>
              <PhotoCameraIcon color="primary" fontSize="large" />
              <Typography color="primary" variant="h5">
                No Media yet
              </Typography>
            </NoPostUpload>
          </>
        ) : (
          <NoPostUpload type="media">
            <div>
              <PhotoCameraIcon color="primary" fontSize="large" />
            </div>
            <Typography color="primary" variant="h4" component="div">
              Media
            </Typography>
            <Typography color="primary" align="center" variant="body2">
              When you upload Media they will appear here!!
            </Typography>
          </NoPostUpload>
        )
      ) : (
        <MultiPosts posts={posts} onRefresh={refresh} userpost />
      )}
    </>
  );
};

export default Media;
