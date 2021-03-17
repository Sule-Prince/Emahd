import React, { useRef } from "react";
import { Grid } from "@material-ui/core";
import MultiPost from "./MultiPost";
import RefreshWrapper from "./RefreshWrapper";

function MultiPosts({ posts, onRefresh, style = {} }) {
  const rootRef = useRef(null);
  return (
    <div
      ref={rootRef}
      style={{
        height: "100%",
        ...style,
      }}>
      <RefreshWrapper onRefresh={onRefresh}>
        <Grid container>
          {posts
            ? posts.map((post) => (
                <MultiPost
                  key={post.postId}
                  mediaPost={post}
                  rootRef={rootRef}
                />
              ))
            : null}
        </Grid>
      </RefreshWrapper>
    </div>
  );
}

export default MultiPosts;
