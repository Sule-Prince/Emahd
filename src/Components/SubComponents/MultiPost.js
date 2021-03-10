import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVertRounded";

import { Carousel } from "react-responsive-carousel";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import CommentField from "./CommentField";
import LazyLoad from "./LazyLoad";
import ScreamActions from "./ScreamActions";

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

function MultiPost({ mediaPost, rootRef }) {
  const {
    mediaUrl: slides,
    multiple,
    post,
    imageUrl,
    handle,
    scream,
    postId,
    likeCount,
    commentCount,
    createdAt,
    postSettings,
  } = mediaPost;
  dayjs.extend(relativeTime);

  const classes = useStyles();

  console.log(slides);

  return (
    <LazyLoad rootRef={rootRef}>
      <Card style={{ width: "100%" }}>
        <CardHeader
          style={{ paddingLeft: 8, paddingRight: 8 }}
          avatar={
            <Avatar
              src={imageUrl ? imageUrl : null}
              className={classes.avatar}
            />
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <Link style={{ color: "#000", fontWeight: "bold" }} to={handle}>
              {handle}
            </Link>
          }
        />
        <CardActionArea component="div">
          {multiple ? (
            <Multiple slides={slides} settings={postSettings} />
          ) : (
            <Single src={slides} aspectRatio={postSettings[0].aspectRatio} />
          )}
        </CardActionArea>

        {/* Card Actions */}
        <ScreamActions
          scream={scream}
          postId={postId}
          likeCount={likeCount}
          commentCount={commentCount}
        />

        <CardContent>
          <Typography variant="body2" color="textPrimary" component="div">
            {post}
          </Typography>
          <Typography variant="caption" color="textSecondary" component="p">
            {dayjs(createdAt).fromNow()}
          </Typography>
        </CardContent>
      </Card>

      {/* Comment Field  */}
      <CommentField setCommentNo={commentCount} postId={postId} />
    </LazyLoad>
  );
}

export default MultiPost;

const Single = ({ src, aspectRatio }) => {
  const [load, setLoad] = useState(false);

  const mediaPad = useState(() => {
    return 100 / aspectRatio;
  })[0];

  return (
    <div
      style={{
        position: "relative",
        paddingBottom: `${mediaPad}%`,
      }}>
      {!load && (
        <div
          style={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            border: "1px solid #ddd",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}></div>
      )}

      <img
        src={src}
        alt="A post slide"
        onLoad={() => {
          setLoad(true);
        }}
        style={{
          width: "100%",
          height: "auto",
          position: "absolute",
          zIndex: 1,
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
};

const Multiple = ({ slides, settings }) => {
  return (
    <Carousel showArrows={false} emulateTouch dynamicHeight showThumbs={false}>
      {slides.map((slide, i) => (
        <CarouselContent
          key={i}
          src={slide}
          aspectRatio={settings[i].aspectRatio}
        />
      ))}
    </Carousel>
  );
};

const CarouselContent = ({ src, aspectRatio }) => {
  const [load, setLoad] = useState(false);

  const mediaPad = useState(() => {
    return 100 / aspectRatio;
  })[0];

  return (
    <div
      style={{
        position: "relative",
        paddingBottom: mediaPad,
        backgroundColor: "#fff",
      }}>
      {!load && (
        <div
          style={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            border: "1px solid #ddd",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}></div>
      )}
      <img
        src={src}
        alt="A post slide"
        onLoad={() => {
          setLoad(true);
        }}
        style={{
          width: "100%",
          height: "auto",
          position: "absolute",
          zIndex: 1,
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
};
