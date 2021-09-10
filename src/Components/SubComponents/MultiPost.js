import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardHeader,
  CardContent,
  Avatar,
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
import TextTruncate from "./TextTruncate";

import useExtraStyles from "./styles";

function MultiPost({ mediaPost, rootRef }) {
  const {
    mediaUrl: slides,
    multiple,
    post,
    userId,
    imageUrl: userImg,
    handle,
    postId,
    type,
    likeCount,
    commentCount,
    createdAt,
    section,
    postSettings,
  } = mediaPost;
  dayjs.extend(relativeTime);

  const [isLiked, setIsLiked] = useState(false);
  const [commentNo, setCommentNo] = useState(commentCount);

  const likeRef = useRef(null);
  const tappedRef = useRef(null);

  const classes = useExtraStyles();

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
      type,
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
              to={`/user/${handle}`}>
              {personalizedHandle || handle}
            </Link>
          }
        />
        {multiple ? (
          <Multiple
            isLiked={isLiked}
            likeRef={likeRef}
            slides={slides}
            tappedRef={tappedRef}
            settings={postSettings}
            postId={postId}
            type={type}
            classes={classes}
          />
        ) : (
          <CardActionArea
            component="div"
            onTouchStart={(e) => {
              if (!tappedRef.current) {
                //if tap is not set, set up single tap
                tappedRef.current = setTimeout(function () {
                  tappedRef.current = null;
                  //insert things you want to do when single tapped
                }, 300); //wait 300ms then run single click code
              } else {
                //tapped within 300ms of last tap. double tap
                clearTimeout(tappedRef.current); //stop single tap callback
                tappedRef.current = null;
                //insert things you want to do when double tapped
                if (isLiked) return;
                likeRef.current.click();
              }
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
            }}>
            <Single
              src={slides}
              aspectRatio={postSettings[0].aspectRatio}
              postId={postId}
              type={type}
              classes={classes}
            />
          </CardActionArea>
        )}

        {/* Card Actions */}
        <ScreamActions
          scream={mediaPost}
          postId={postId}
          likeRef={likeRef}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
          likeCount={likeCount}
          commentCount={commentNo}
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

          <Typography variant="caption" color="textSecondary" component="p">
            {dayjs(createdAt).fromNow()}
          </Typography>
        </CardContent>
      </Card>

      {/* Comment Field  */}
      <CommentField
        imageUrl={userImg}
        setCommentNo={setCommentNo}
        postId={postId}
      />
    </LazyLoad>
  );
}

export default MultiPost;

const Single = ({ src, aspectRatio, postId, type, classes }) => {
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

      {type === "video" ? (
        <video
          alt="A media post"
          className={classes.multiMedia}
          onCanPlayThrough={() => {
            setLoad(true);
            createData();
          }}
        />
      ) : (
        <img
          src={src}
          alt="A media post"
          className={classes.multiMedia}
          onLoad={() => {
            setLoad(true);
            createData();
          }}
        />
      )}
    </div>
  );
};

const Multiple = ({
  slides,
  settings,
  postId,
  type,
  tappedRef,
  isLiked,
  likeRef,
  classes,
}) => {
  const [index, setIndex] = useState(0);
  const aspectRatio = useState(() => {
    let aspRatio = 0;

    settings.forEach((setting) => {
      if (setting.aspectRatio > aspRatio) aspRatio = setting.aspectRatio;
    });

    return aspRatio;
  })[0];

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
      <CardActionArea
        component="div"
        onTouchStart={(e) => {
          if (!tappedRef.current) {
            //if tap is not set, set up single tap
            tappedRef.current = setTimeout(function () {
              tappedRef.current = null;
              //insert things you want to do when single tapped
            }, 300); //wait 300ms then run single click code
          } else {
            //tapped within 300ms of last tap. double tap
            clearTimeout(tappedRef.current); //stop single tap callback
            tappedRef.current = null;
            //insert things you want to do when double tapped
            if (isLiked) return;
            likeRef.current.click();
          }
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
        }}>
        <SwipeableViews
          enableMouseEvents
          index={index}
          onChangeIndex={(step) => setIndex(step)}>
          {slides.map((slide, i) => (
            <CarouselContent
              key={i}
              src={slide}
              index={i}
              type={type}
              classes={classes}
              setCreatedFile={setCreatedFile}
              aspectRatio={aspectRatio}
            />
          ))}
        </SwipeableViews>
      </CardActionArea>
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

const CarouselContent = ({
  src,
  aspectRatio,
  index,
  setCreatedFile,
  type,
  classes,
}) => {
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
      {/*  <img
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
 */}
      {type === "video" ? (
        <video
          alt="A media post"
          className={classes.media}
          onCanPlayThrough={() => {
            setLoad(true);
            createData();
          }}
        />
      ) : (
        <img
          src={src}
          alt="A media post"
          className={classes.multiMedia}
          onLoad={() => {
            setLoad(true);
            createData();
          }}
        />
      )}
    </div>
  );
};
