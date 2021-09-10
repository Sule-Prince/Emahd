import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardActionArea,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
} from "@material-ui/core";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { useSelector } from "react-redux";

import ScreamActions from "./ScreamActions";
import CommentField from "./CommentField";
import LazyLoadMedia from "./LazyLoadMedia";
import PostOptions from "./PostOptions";
import { useDataStore } from "../../utils/customHooks/persist";
import toFile from "../../utils/toFile";
import { urlToBlob } from "../../utils/helperFunctions";
import TextTruncate from "./TextTruncate";
import useExtraStyles from "./styles";

const MediaPost = ({ post: scream, rootRef }) => {
  const {
    mediaUrl,
    userId,
    post,
    postId,
    likeCount,
    commentCount,
    createdAt,
    imageUrl: userImg,
    section,
    handle,
    thumb,
    postSettings,
    mediaType,
  } = scream;

  const [isLiked, setIsLiked] = useState(false);
  const [commentNo, setCommentNo] = useState(commentCount);
  const [mediaLoaded, setMediaLoaded] = useState(false);

  const likeRef = useRef(null);

  dayjs.extend(relativeTime);

  const classes = useExtraStyles();

  // const [commentNo, setCommentNo] = useState(commentCount);

  const user = useSelector((state) => state.user.data.handle);
  const personalizedHandle = useSelector((state) => {
    if (state.user.personalized[userId])
      return state.user.personalized[userId].handle;
    else return null;
  });
  const { setData, exists } = useDataStore();

  useEffect(() => {
    const storeLoadedData = () => {
      const data = {
        post,
        postId,
        likeCount,
        commentCount,
        createdAt,
        userImg,
        userId,
        section,
        handle,
        postSettings,
        mediaType,
      };

      setData(
        { ref: postId, data },
        { storeName: "postData", dbName: "Emahd-post" }
      );
    };
    storeLoadedData();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!mediaLoaded) return;

    const createData = async () => {
      const isPresent = await exists(postId, {
        storeName: "image-store",
        dbName: "Emahd-image",
      });

      if (isPresent) return;
      const blob = await urlToBlob(mediaUrl);

      const data = toFile(blob, blob.type);

      setData(
        { ref: postId, data },
        { storeName: "image-store", dbName: "Emahd-image" }
      );
    };

    createData();

    // eslint-disable-next-line
  }, [mediaLoaded]);

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
              section={section}
              postId={postId}
              handle={handle}
              user={user === handle ? true : false}
            />
          }
          title={
            <div>
              <Link
                style={{ color: "#000", fontWeight: "bold" }}
                to={`/user/${handle}`}>
                {personalizedHandle || handle}
              </Link>
              <Typography variant="caption" color="textSecondary" component="p">
                {dayjs(createdAt).fromNow()}
              </Typography>
            </div>
          }
        />
        <CardContent className={classes.cardContent}>
          <TextTruncate
            width={
              window.innerWidth -
              16 * 2 /* Padding of both sides of the card content */
            }
            lineNo={2}
            text={post}
          />
        </CardContent>

        <LazyLoadMedia
          thumb={thumb}
          src={mediaUrl}
          type={mediaType}
          rootRef={rootRef}
          dbTapped={() => {
            if (isLiked) return;
            likeRef.current.click();
          }}
          mediaLoaded={mediaLoaded}
          settings={postSettings.media}
          setMediaLoaded={setMediaLoaded}
          ActionComponent={CardActionArea}
        />

        {/* Card Actions */}
        <ScreamActions
          likeRef={likeRef}
          isLiked={isLiked}
          scream={scream}
          setIsLiked={setIsLiked}
        />
      </Card>
      {/* Comment Field  */}
      <CommentField
        imageUrl={userImg}
        setCommentNo={setCommentNo}
        postId={postId}
      />
    </div>
  );
};

export default MediaPost;
