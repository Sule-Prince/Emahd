import React, { useRef } from "react";
import { Grid } from "@material-ui/core";
import Post from "./Post";

import "./home.css";
import RefreshWrapper from "../../../SubComponents/RefreshWrapper";

const Posts = ({ posts, onRefresh }) => {
  const rootRef = useRef(null);

  return (
    <div ref={rootRef}>
      <RefreshWrapper rootRef={rootRef} onRefresh={onRefresh}>
        <Grid style={{ position: "absolute", paddingBottom: 230 }} container>
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
