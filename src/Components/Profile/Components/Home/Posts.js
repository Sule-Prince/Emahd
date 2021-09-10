import React, { useRef } from "react";
import { Grid } from "@material-ui/core";
import Post from "./Post";

import "./home.css";

const Posts = ({ posts, style = {} }) => {
  const rootRef = useRef(null);

  return (
    <div
      style={{
        height: "100%",
        ...style,
      }}
      ref={rootRef}>
      <Grid
        container
        style={{
          paddingBottom: 26,
        }}>
        {posts
          ? posts.map((post) => <Post post={post} key={post.postId} />)
          : null}
      </Grid>
    </div>
  );
};

export default Posts;
