import React, { useState, useEffect, useRef } from "react";

import { IconButton, makeStyles } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

const useStyles = makeStyles({
  root: {
    height: 0,
    position: "relative",
    "& > *": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
    },
    "& > span": {
      width: "auto",
      top: "50%",
      left: "50%",
      borderRadius: "50%",
      backgroundColor: "rgba(255, 255, 255, .4)",
      transform: "translate(-50%, -50%)",
    },
  },
  thumb: {
    filter: "blur(2vw)",
  },
  img: {
    transition: "opacity .5s ease-in",
    willChange: "opacity",
  },
});

const LazyLoadMedia = ({
  type,
  src,
  thumb,
  rootRef,
  settings,
  mediaLoaded,
  setMediaLoaded,
}) => {
  const mediaPad = useState(() => {
    return 100 / settings.aspectRatio;
  })[0];

  const [showThumb, setShowThumb] = useState(true);
  const [playOpacity, setPlayOpacity] = useState(1);

  const mediaRef = useRef(null);
  const thumbRef = useRef(null);
  const timeoutId = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    const mediaElem = mediaRef.current;
    if (type === "image") {
      const thumbConfig = {
        root: (rootRef && rootRef.current) || null,
        threshold: 0.01,
        rootMargin: "150px 0px",
      };
      const thumbObserver = new IntersectionObserver(
        observeElement,
        thumbConfig
      );
      thumbObserver.observe(thumbRef.current);
    }

    const mediaConfig = {
      root: (rootRef && rootRef.current) || null,
      threshold: [0.01, 1],
      rootMargin: "50px 0px",
    };

    const mediaObserver = new IntersectionObserver(observeElement, mediaConfig);

    mediaObserver.observe(mediaElem);

    function observeElement(entry) {
      entry = entry[0];
      if (entry.intersectionRatio <= 0) return;

      const preview = entry.target.getAttribute("preview");

      if (!preview && !mediaElem.src) {
        mediaElem.src = src;
      }
      if (type === "image" && preview) {
        thumbRef.current.src = thumb;
        this.unobserve(entry.target);
        return;
      }
      if (entry.intersectionRatio < 1 && type !== "image") {
        if (!mediaElem.paused) mediaElem.pause();
        setPlayOpacity(1);
      }

      if (entry.intersectionRatio === 1 && type !== "image") {
        setPlayOpacity(0);
        if (mediaElem.paused) mediaElem.play();
      }
    }

    return () => {
      if (type !== "image" && !mediaElem.paused) mediaElem.pause();
      mediaObserver.unobserve(mediaElem);
    };

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div
        className={classes.root}
        style={{
          paddingBottom: `${mediaPad}%`,
        }}>
        {type === "image" ? (
          <>
            {showThumb && (
              <img
                preview="true"
                ref={thumbRef}
                className={classes.thumb}
                src={thumb}
                alt="This is a media thumbnail"
              />
            )}
            <img
              ref={mediaRef}
              className={classes.img}
              style={{ opacity: mediaLoaded ? 1 : 0 }}
              alt="This is a media post"
              onLoad={() => {
                setMediaLoaded(true);
              }}
              onTransitionEnd={() => {
                setShowThumb(false);
              }}
            />
          </>
        ) : (
          <>
            <video
              ref={mediaRef}
              loop
              onCanPlayThrough={() => {
                setMediaLoaded(true);
              }}
            />
            <span
              style={{
                opacity: playOpacity,
                transition: "all .5s ease-out",
              }}>
              <IconButton
                color="primary"
                component="span"
                onClick={() => {
                  if (mediaRef.current.paused) {
                    mediaRef.current.play();
                    timeoutId.current = setTimeout(() => {
                      setPlayOpacity(0);
                    }, 3000);
                  } else {
                    clearTimeout(timeoutId.current);
                    mediaRef.current.pause();

                    setPlayOpacity(1);
                  }
                }}>
                <PlayArrowIcon fontSize="large" />
              </IconButton>
            </span>
          </>
        )}
      </div>
    </>
  );
};

export default LazyLoadMedia;
