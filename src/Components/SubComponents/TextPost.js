import React from "react";

// MUi components
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";

// Mui Icons
import MoreVertIcon from "@material-ui/icons/MoreVertRounded";

import { Link } from "react-router-dom";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ScreamActions from "./ScreamActions";

import CommentField from "./CommentField";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 38,
    width: 38,
  },
  media: {
    height: "auto",
    minHeight: "50vw",
    width: "100%",
  },
}));

const Textpost = ({ post: scream }) => {
  const {
    post,
    postId,
    likeCount,
    commentCount,
    createdAt,
    imageUrl: userImg,
    handle,
  } = scream;

  dayjs.extend(relativeTime);

  const classes = useStyles();

  // const [commentNo, setCommentNo] = useState(commentCount);

  return (
    <div type="text">
      <Card>
        <CardHeader
          style={{ paddingLeft: 8, paddingRight: 8 }}
          avatar={
            <Avatar src={userImg ? userImg : null} className={classes.avatar} />
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <div>
              <Link style={{ color: "#000", fontWeight: "bold" }} to={handle}>
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

        {/* Card Actions */}
        <ScreamActions
          scream={scream}
          postId={postId}
          likeCount={likeCount}
          commentCount={commentCount}
        />
      </Card>

      {/* Comment Field  */}
      <CommentField setCommentNo={commentCount} postId={postId} />
    </div>
  );
};

export default Textpost;
