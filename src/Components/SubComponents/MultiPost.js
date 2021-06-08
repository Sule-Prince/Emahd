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
  MobileStepper,
} from "@material-ui/core";

import { useSelector } from "react-redux";

import SwipeableViews from "react-swipeable-views";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import CommentField from "./CommentField";
import LazyLoad from "./LazyLoad";
import ScreamActions from "./ScreamActions";
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

  const [commentNo, setCommentNo] = useState(commentCount);

  const classes = useStyles();

  const user = useSelector((state) => state.user.data.handle);

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
            <PostOptions
              postId={postId}
              handle={handle}
              user={user === handle ? true : false}
            />
          }
          title={
            <Link
              style={{ color: "#000", fontWeight: "bold" }}
              to={`user/${handle}`}>
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
          commentCount={commentNo}
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
      <CommentField setCommentNo={setCommentNo} postId={postId} />
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
  const [index, setIndex] = useState(0);
  return (
    <>
      <SwipeableViews
        enableMouseEvents
        index={index}
        onChangeIndex={(step) => setIndex(step)}>
        {slides.map((slide, i) => (
          <CarouselContent
            key={i}
            src={slide}
            aspectRatio={settings[i].aspectRatio}
          />
        ))}
      </SwipeableViews>
      <MobileStepper
        position="static"
        variant="dots"
        activeStep={index}
        steps={slides.length}
        style={{
          justifyContent: "center",
          backgroundColor: "#fff",
          paddingTop: 10,
        }}></MobileStepper>
    </>
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
        paddingBottom: `${mediaPad}%`,
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
          position: "absolute",
        }}
      />
    </div>
  );
};
