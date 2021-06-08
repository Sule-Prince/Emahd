import React, { useState, useRef, useEffect } from "react";

import { makeStyles, Grid, Avatar, ButtonBase } from "@material-ui/core";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import PauseRoundedIcon from "@material-ui/icons/PauseRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0px 3px",
    "& > *": {
      margin: "0px 3px",
      color: theme.palette.primary["main"],
    },
  },
  slideWrapper: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    margin: "15px 0px",

    "& > :nth-child(1)": {
      borderRadius: "50%",
      position: "absolute",
      backgroundColor: theme.palette.primary["main"],
    },
    "& > :nth-child(2)": {
      width: "100%",
      height: 3,
      backgroundColor: "#eee",
      borderRadius: 3,
    },
  },
}));

export default ({ audio, imageUrl }) => {
  const slideBall = useState(11)[0];
  const [slideStyle, setSlideStyle] = useState({ left: -(slideBall / 2) });
  const [audMeta, setAudMeta] = useState({ currTime: 0, duration: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const sliderRef = useRef(null);
  const audioRef = useRef(null);
  const audDur = useRef({ duration: 0, currTime: 0 }).current;
  const slidePos = useRef({ x: 0, width: 0 }).current;
  const audData = useRef({ playing: false, loaded: false }).current;

  const classes = useStyles();

  const updateSlideBar = () => {
    if (audDur.duration === 0) return;
    const halfSize = slideBall / 2;

    let barLength = (audDur.currTime * slidePos.width) / audDur.duration;
    barLength = barLength - halfSize;
    setSlideStyle((prev) => ({ ...prev, left: barLength }));
  };

  const updateAudioPos = () => {
    if (isNaN(audDur.duration) || audDur.duration === Infinity) return;
    const halfSize = slideBall / 2;
    let currentTime =
      ((slideStyle.left + halfSize) * audDur.duration) / slidePos.width;
    audioRef.current.currentTime = currentTime;
  };

  useEffect(() => {
    const audioEl = audioRef.current;
    audioEl.parentNode.append(audioEl);
    const { x, width } = sliderRef.current.getBoundingClientRect();
    slidePos.x = x;
    slidePos.width = width;
    audioEl.ondurationchange = (e) => {
      audDur.duration = audioEl.duration;
      setAudMeta((prev) => ({ ...prev, duration: audioEl.duration }));

      updateSlideBar();
    };
    audioEl.ontimeupdate = (e) => {
      audDur.currTime = audioEl.currentTime;
      setAudMeta((prev) => ({
        ...prev,
        currTime: audioEl.currentTime,
      }));

      updateSlideBar();
    };

    audioEl.onplay = () => {
      setIsPlaying(true);
    };
    audioEl.onpause = () => {
      setIsPlaying(false);
    };

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Grid container alignItems="center" className={classes.root}>
        <Grid item>
          <Avatar src={imageUrl} style={{ height: 40, width: 40 }} />
        </Grid>
        <Grid item style={{ margin: 0, marginRight: 10 }}>
          <ButtonBase
            style={{ borderRadius: "50%" }}
            color="primary"
            onClick={() => {
              if (audioRef.current.paused) audioRef.current.play();
              else audioRef.current.pause();
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              if (audioRef.current.paused) audioRef.current.play();
              else audioRef.current.pause();
            }}>
            {isPlaying ? (
              <PauseRoundedIcon style={{ fontSize: "2rem" }} />
            ) : (
              <PlayArrowRoundedIcon style={{ fontSize: "2rem" }} />
            )}
          </ButtonBase>
        </Grid>

        <Grid item style={{ flexGrow: 1 }}>
          <div className={classes.slideWrapper}>
            <span
              onTouchStart={(e) => {
                audioRef.current.pause();
              }}
              onTouchMove={(e) => {
                e.persist();
                let posX = e.touches[0].clientX,
                  halfSize = slideBall / 2;
                if (
                  posX >= slidePos.x - halfSize &&
                  posX <= slidePos.width + (slidePos.x - halfSize)
                ) {
                  setSlideStyle((prev) => ({
                    ...prev,
                    left: posX - slidePos.x,
                  }));
                }
              }}
              style={{ ...slideStyle, width: slideBall, height: slideBall }}
              onTouchEnd={(e) => {
                updateAudioPos();
                // audioRef.current.play();
              }}></span>

            <span
              ref={sliderRef}
              onTouchStart={(e) => {
                e.persist();
                let posX = e.touches[0].clientX;
                setSlideStyle((prev) => ({ ...prev, left: posX - slidePos.x }));
              }}
              onTouchEnd={(e) => {
                e.persist();
                updateAudioPos();
              }}></span>
          </div>
        </Grid>
        <Audio
          audio={audio}
          audioRef={audioRef}
          audData={audData}
          audDur={audDur}
        />
      </Grid>
    </>
  );
};

const Audio = React.memo(({ audioRef, audio, audData }) => {
  return (
    <audio
      style={{ display: "none" }}
      src={audio.src ? URL.createObjectURL(audio.src) : null}
      ref={audioRef}
      onLoadedData={(e) => {
        const audioEl = audioRef.current;
        if (!audData.loaded) {
          audData.loaded = true;
        }
        if (audioEl.duration === Infinity) {
          audioEl.currentTime = 1e101;
          setTimeout(() => {
            audioEl.currentTime = 0.1;
            audioEl.currentTime = 0;
          }, 3000);
        }
      }}
      controls
    />
  );
});
