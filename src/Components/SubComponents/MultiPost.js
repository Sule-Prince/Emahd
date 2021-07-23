import React, { useEffect, useState } from "react";
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
import { replaciveMerge, urlToBlob } from "../../utils/helperFunctions";
import toFile from "../../utils/toFile";
import { useDataStore } from "../../utils/customHooks/persist";

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
    userId,
    imageUrl: userImg,
    handle,
    postId,
    likeCount,
    commentCount,
    createdAt,
    section,
    postSettings,
  } = mediaPost;
  dayjs.extend(relativeTime);

  const [commentNo, setCommentNo] = useState(commentCount);

  const classes = useStyles();

  const user = useSelector((state) => state.user.data.handle);
  const personalizedHandle = useSelector((state) => {
    if (state.user.personalized[userId])
      return state.user.personalized[userId].handle;
    else return null;
  });
  const { setData } = useDataStore();

  const storeLoadedData = () => {
    const data = {
      multiple,
      post,
      userImg,
      handle,
      userId,
      postId,
      section,
      likeCount,
      commentCount,
      createdAt,
      postSettings,
    };

    setData(
      { ref: postId, data },
      { storeName: "postData", dbName: "Emahd-post" }
    );
  };

  return (
    <LazyLoad rootRef={rootRef} onLoad={storeLoadedData}>
      <Card style={{ width: "100%" }}>
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
            <Link
              style={{ color: "#000", fontWeight: "bold" }}
              to={`user/${handle}`}>
              {personalizedHandle || handle}
            </Link>
          }
        />
        <CardActionArea component="div">
          {multiple ? (
            <Multiple slides={slides} settings={postSettings} postId={postId} />
          ) : (
            <Single
              src={slides}
              aspectRatio={postSettings[0].aspectRatio}
              postId={postId}
            />
          )}
        </CardActionArea>

        {/* Card Actions */}
        <ScreamActions
          scream={mediaPost}
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

const Single = ({ src, aspectRatio, postId }) => {
  const [load, setLoad] = useState(false);

  const mediaPad = useState(() => {
    return 100 / aspectRatio;
  })[0];

  const { setData, exists } = useDataStore();

  const createData = async () => {
    const isPresent = await exists(postId, {
      storeName: "image-store",
      dbName: "Emahd-image",
    });

    if (isPresent) return;
    const blob = await urlToBlob(src);

    const data = toFile(blob, blob.type);

    setData(
      { ref: postId, data },
      { storeName: "image-store", dbName: "Emahd-image" }
    );
  };

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
          createData();
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

const Multiple = ({ slides, settings, postId }) => {
  const [index, setIndex] = useState(0);
  const [createdFile, setCreatedFile] = useState(Array.from(slides).fill(""));

  const { setData, getData } = useDataStore();
  useEffect(() => {
    const storeData = async () => {
      const dbData = await getData(postId, {
        storeName: "image-store",
        dbName: "Emahd-image",
      });
      if (dbData && !dbData.includes("")) return;
      if (dbData && dbData.includes("")) {
        const mergedFiles = replaciveMerge([dbData, createdFile]);
        setData(
          { ref: postId, data: mergedFiles },
          { storeName: "image-store", dbName: "Emahd-image" }
        );

        return;
      }
      setData(
        { ref: postId, data: createdFile },
        { storeName: "image-store", dbName: "Emahd-image" }
      );
    };
    storeData();

    // eslint-disable-next-line
  }, [createdFile]);
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
            index={i}
            setCreatedFile={setCreatedFile}
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

const CarouselContent = ({ src, aspectRatio, index, setCreatedFile }) => {
  const [load, setLoad] = useState(false);

  const mediaPad = useState(() => {
    return 100 / aspectRatio;
  })[0];

  const createData = async () => {
    const blob = await urlToBlob(src);

    const data = toFile(blob, blob.type);
    setCreatedFile((prev) => {
      const fileArr = [...prev];
      fileArr[index] = data;
      return fileArr;
    });
  };

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
          createData();
        }}
        style={{
          width: "100%",
          position: "absolute",
        }}
      />
    </div>
  );
};
