import React, { useState, useEffect } from "react";

// Hooks
import { useDispatch, useSelector } from "react-redux";

import {
  CardActions,
  IconButton,
  Typography,
  makeStyles,
  Portal,
} from "@material-ui/core";

import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";

import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import { handleLike, handleUnlike } from "../../utils/handleLike";

// Assets import
import likeSound from "../assets/audio/likeSound.mp3";
import Comments from "../Profile/Components/Home/Comments";
import { updatePost } from "../../redux/postsSlice";

const useStyles = makeStyles((theme) => ({
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
  },
  spanText: {
    paddingLeft: 4,
  },
}));

const ScreamActions = ({
  scream: { commentCount, postId, likeCount, handle, ...scream },
  likeRef,
  isLiked,
  setIsLiked,
}) => {
  const [likes, setLikes] = useState(likeCount);
  const [openComments, setOpenComments] = useState(false);

  const dispatch = useDispatch();
  const classes = useStyles();
  const likedPosts = useSelector((state) => state.user.likes);
  const userHandle = useSelector((state) => state.user.data.handle);

  // Update action data
  const user = handle === userHandle ? true : false,
    index = user ? scream.uIndex : scream.index,
    type = scream.section;

  useEffect(() => {
    if (likedPosts.indexOf(postId) !== -1) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [likedPosts, postId]);

  /* useEffect(() => {

  }, [initiateLike]); */

  const handleOpenComments = () => {
    setOpenComments(true);
  };

  return (
    <>
      <CardActions className={classes.cardActions}>
        <div>
          {isLiked ? (
            <IconButton
              size="small"
              style={{ color: "#f00" }}
              onClick={() => {
                dispatch(
                  updatePost({ user, index, type, likeCount: likeCount - 1 })
                );
                handleUnlike(postId, dispatch, setLikes);
              }}>
              <FavoriteRoundedIcon fontSize="small" />
            </IconButton>
          ) : (
            <IconButton
              size="small"
              ref={likeRef}
              onClick={() => {
                dispatch(
                  updatePost({ user, index, type, likeCount: likeCount + 1 })
                );
                handleLike(postId, dispatch, setLikes);
              }}>
              <FavoriteBorderRoundedIcon fontSize="small" />
            </IconButton>
          )}

          {/* Audio for Pop sound when a user likes a post */}

          <audio
            id="like-audio"
            style={{ display: "none" }}
            src={likeSound}></audio>
          {/* End of Audio component */}

          <Typography
            variant="caption"
            className={classes.spanText}
            component="span">
            {likes === 0 ? "no likes" : `${likes} likes`}
          </Typography>
        </div>
        <div>
          <IconButton onClick={handleOpenComments} size="small">
            <ChatBubbleOutlineRoundedIcon fontSize="small" />
          </IconButton>

          <Typography
            variant="caption"
            className={classes.spanText}
            component="span">
            {commentCount === 0 ? "no comments" : `${commentCount} comments`}
          </Typography>
        </div>
        <div>
          <IconButton size="small">
            <ShareOutlinedIcon fontSize="small" />
          </IconButton>
        </div>
      </CardActions>
      {openComments === true ? (
        <Portal container={document.body}>
          <Comments setOpenComments={setOpenComments} postId={postId} />
        </Portal>
      ) : null}
    </>
  );
};

export default ScreamActions;
