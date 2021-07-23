import React, { useState, useRef, useEffect } from "react";

import {
  makeStyles,
  Grid,
  Avatar,
  ButtonBase,
  Slider,
} from "@material-ui/core";
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
    margin: "6px 0px",
    paddingRight: 6,
  },
}));

const MyAudio = ({ audio, imageUrl }) => {
  const [audMeta, setAudMeta] = useState({ currTime: 0, duration: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderVal, setSliderVal] = useState(0);
  const [efSlider, setEfSlider] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const timeoutId = useRef(null);

  const audioRef = useRef(null);
  const audDur = useRef(0);

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setSliderVal(newValue);
    setEfSlider(newValue);
  };

  useEffect(() => {
    const audioEl = audioRef.current;
    audioEl.parentNode.append(audioEl);

    audioEl.ondurationchange = (e) => {
      setAudMeta((prev) => ({ ...prev, duration: audioEl.duration }));

      audDur.current = audioEl.duration;
    };
    audioEl.ontimeupdate = (e) => {
      setAudMeta((prev) => ({
        ...prev,
        currTime: audioEl.currentTime,
      }));
    };

    audioEl.onplay = () => {
      setIsPlaying(true);
    };
    audioEl.onpause = () => {
      setIsPlaying(false);
    };

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isUpdating) return;
    const newValue = (audMeta.currTime * 100) / audMeta.duration;

    setSliderVal(newValue);
  }, [audMeta, isUpdating]);

  useEffect(() => {
    clearTimeout(timeoutId.current);
    const duration = audioRef.current.duration;
    if (isNaN(duration) || duration === Infinity) return;
    setIsUpdating(true);

    const currentTime = (efSlider * duration) / 100;

    audioRef.current.currentTime = currentTime;

    timeoutId.current = setTimeout(() => {
      setIsUpdating(false);
    }, 500);
  }, [efSlider]);

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
            <Slider value={sliderVal} onChange={handleChange} />
          </div>
        </Grid>
        <Audio audio={audio} audioRef={audioRef} />
      </Grid>
    </>
  );
};

export default React.memo(MyAudio);

const Audio = React.memo(({ audioRef, audio }) => {
  return (
    <audio
      style={{ display: "none" }}
      src={audio.src ? URL.createObjectURL(audio.src) : null}
      ref={audioRef}
      onLoadedData={(e) => {
        const audioEl = audioRef.current;

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
