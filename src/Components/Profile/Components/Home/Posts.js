import React, { useRef } from "react";
import { Grid } from "@material-ui/core";
import Post from "./Post";

import "./home.css";
import RefreshWrapper from "../../../SubComponents/RefreshWrapper";

const Posts = ({ posts, onRefresh, style = {} }) => {
  const rootRef = useRef(null);

  return (
    <div
      style={{
        height: "100%",
        style,
      }}
      ref={rootRef}>
      <RefreshWrapper onRefresh={onRefresh}>
        <Grid container>
          {posts
            ? posts.map((post) => (
                <Post post={post} rootRef={rootRef} key={post.postId} />
              ))
            : null}
        </Grid>
      </RefreshWrapper>
    </div>
  );
};

export default Posts;
