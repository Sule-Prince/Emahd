import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardActionArea,
  CardHeader,
  CardContent,
  Avatar,
  makeStyles,
  Typography,
} from "@material-ui/core";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { useSelector } from "react-redux";

import ScreamActions from "./ScreamActions";
import CommentField from "./CommentField";
import LazyLoadMedia from "./LazyLoadMedia";
import PostOptions from "./PostOptions";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 38,
    width: 38,
  },
  commentContainer: {
    padding: "10px 5px",
    paddingBottom: 12,
  },
  media: {
    height: "auto",
    width: "100%",
  },
}));

const MediaPost = ({ post: scream, rootRef }) => {
  const {
    mediaUrl,
    post,
    postId,
    likeCount,
    commentCount,
    createdAt,
    imageUrl: userImg,
    handle,
    thumb,
    postSettings,
    mediaType,
  } = scream;

  const [commentNo, setCommentNo] = useState(commentCount);

  dayjs.extend(relativeTime);

  const classes = useStyles();

  // const [commentNo, setCommentNo] = useState(commentCount);

  const user = useSelector((state) => state.user.data.handle);

  return (
    <div>
      <Card>
        <CardHeader
          style={{ paddingLeft: 8, paddingRight: 8 }}
          avatar={
            <Avatar src={userImg ? userImg : null} className={classes.avatar} />
          }
          action={
            <PostOptions
              postId={postId}
              handle={handle}
              user={user === handle ? true : false}
            />
          }
          title={
            <div>
              <Link
                style={{ color: "#000", fontWeight: "bold" }}
                to={`user/${handle}`}>
                {handle}
              </Link>
              <Typography variant="caption" color="textSecondary" component="p">
                {dayjs(createdAt).fromNow()}
              </Typography>
            </div>
          }
        />
        <CardContent>
          <Typography variant="body2" color="textPrimary" component="div">
            {post}
          </Typography>
        </CardContent>
        <CardActionArea>
          <LazyLoadMedia
            type={mediaType}
            src={mediaUrl}
            rootRef={rootRef}
            thumb={thumb}
            settings={postSettings.media}
          />
        </CardActionArea>

        {/* Card Actions */}
        <ScreamActions
          scream={scream}
          postId={postId}
          likeCount={likeCount}
          commentCount={commentNo}
        />
      </Card>
      {/* Comment Field  */}
      <CommentField setCommentNo={setCommentNo} postId={postId} />
    </div>
  );
};

export default MediaPost;
