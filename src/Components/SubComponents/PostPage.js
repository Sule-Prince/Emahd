import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { axios } from "../../config/axiosConfig";

import { Grid, Divider, Typography } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import { MultiPost } from ".";

import Post from "../Profile/Components/Home/Post";
import Header from "./Header";
import Comment from "../Profile/Components/Home/Comment";

function PostPage() {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const { postId } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    const getPost = async (postId) => {
      setIsLoading(true);

      try {
        const { post, comments } = (await axios.get(`/get/scream/${postId}`))
          .data;

        if (typeof post !== "object") return;
        setPost(post);
        setComments(comments);
        setError(false);
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    };

    getPost(postId);
  }, [postId]);

  const cancelHandler = () => {
    push("/");
  };
  return (
    <Grid
      container
      direction="column"
      style={{ height: "100vh", overflow: "hidden auto" }}
      wrap={"nowrap"}>
      <Grid item style={{ width: "100%" }}>
        <Header
          data="Post"
          sticky={true}
          backBtn={<KeyboardBackspaceIcon />}
          setDisplay={cancelHandler}
        />
      </Grid>

      <Grid item style={{ width: "100%" }}>
        {!isLoading && !error && (
          <>
            {post.section === "scream" ? (
              <Post post={post} />
            ) : (
              <MultiPost mediaPost={post} />
            )}
            <Grid item style={{ padding: "0px 3px" }}>
              <Divider />
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                align="center"
                color="textSecondary"
                style={{ fontWeight: "bold" }}>
                Recent Comments
              </Typography>
            </Grid>
            <Grid item>
              {comments.map((comment) => (
                <Comment key={comment.commentId} data={comment} />
              ))}
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default PostPage;
