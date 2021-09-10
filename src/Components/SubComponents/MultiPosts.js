import React, { useRef } from "react";
import { Box, Grid } from "@material-ui/core";
import MultiPost from "./MultiPost";

function MultiPosts({ posts, userpost, ...props }) {
  const rootRef = useRef(null);
  return (
    <Box ref={rootRef} height="100%" width="100%">
      <Grid container {...props}>
        {posts
          ? posts.map((post) => (
              <MultiPost key={post.postId} mediaPost={post} />
            ))
          : null}
      </Grid>
    </Box>
  );
}

export default MultiPosts;
