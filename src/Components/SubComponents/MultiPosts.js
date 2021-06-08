import React, { useRef } from "react";
import { Grid } from "@material-ui/core";
import MultiPost from "./MultiPost";

function MultiPosts({ posts, onRefresh, style = {}, userpost }) {
  const rootRef = useRef(null);
  return (
    <div
      ref={rootRef}
      style={{
        height: "100%",
        width: "100%",
        ...style,
      }}>
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
          <></>
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
    </div>
  );
}

export default MultiPosts;
