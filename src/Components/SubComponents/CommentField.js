import React, { useState } from "react";

import {
  TextField,
  InputAdornment,
  makeStyles,
  IconButton,
  Avatar,
  Grid,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

import { handleAddComment } from "../../utils/handleComment";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  commentContainer: {
    padding: "10px 5px",
    paddingBottom: 12,
    width: "100%",
  },
  avatar: {
    height: "100%",
    width: "auto",
  },
});

const useMuiTextStyles = makeStyles(
  {
    root: {
      borderRadius: 26,
      backgroundColor: "#fff",
    },
  },
  { name: "MuiOutlinedInput" }
);

const CommentField = ({ postId, setCommentNo, imageUrl }) => {
  const classes = useStyles();
  const textClasses = useMuiTextStyles();

  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  return (
    <Grid container alignItems="center" className={classes.commentContainer}>
      <Grid item style={{ paddingLeft: 4, paddingRight: 8 }}>
        <Avatar src={imageUrl ? imageUrl : null} />
      </Grid>
      <Grid item xs>
        <TextField
          className={textClasses.root}
          label="add a comment"
          variant="outlined"
          value={comment}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  color="primary"
                  onClick={() => {
                    handleAddComment(comment, postId, dispatch, setCommentNo);
                    setComment("");
                  }}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
      </Grid>
    </Grid>
  );
};

export default CommentField;
