import React, { useRef } from "react";
import { Grid } from "@material-ui/core";
import MultiPost from "./MultiPost";
import RefreshWrapper from "./RefreshWrapper";

function MultiPosts({ posts, onRefresh }) {
  const rootRef = useRef(null);
  return (
    <div ref={rootRef}>
      <RefreshWrapper onRefresh={onRefresh} rootRef={rootRef}>
        <Grid style={{ position: "absolute", paddingBottom: 230 }} container>
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
