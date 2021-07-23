import React, { useRef } from "react";
import { Box, Grid } from "@material-ui/core";
import MultiPost from "./MultiPost";

function MultiPosts({ posts, userpost, ...props }) {
  const rootRef = useRef(null);
  return (
    <Box ref={rootRef} height="100%" width="100%" {...props}>
      {userpost ? (
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
      ) : (
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
      )}
    </Box>
  );
}

export default MultiPosts;
