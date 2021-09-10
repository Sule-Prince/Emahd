import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { Grid, Typography, Avatar, IconButton } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import DisplayStory from "./DisplayStory";
import TapElement from "./TapElement";

export default function DisplayStories({
  stories,
  setDisplay,
  handle,
  imageUrl,
  style,
  ...props
}) {
  const [index, setIndex] = useState(0);
  const [translate, setTranslate] = useState(0);

  return (
    <div
      style={{
        transition: "all .5s cubic-bezier(0, .4, .6, 1)",
        transform: `translateY(${index >= stories.length ? 100 : translate}vh)`,
        backgroundColor: "#000",
        position: "relative",
        width: "100%",
        height: "100%",
        ...style,
      }}
      onTransitionEnd={(e) => {
        setDisplay(false);
      }}
      {...props}>
      <div style={{ position: "absolute", zIndex: 10, width: "100%" }}>
        <StoryBars
          storyLength={stories.length}
          stories={stories}
          setIndex={setIndex}
          index={index}
        />

        <StoryAvatar
          handle={handle}
          imageUrl={imageUrl}
          setTranslate={setTranslate}
        />
      </div>
      <div
        style={{
          top: 0,
          left: 0,
          zIndex: 0,
          position: "absolute",
          height: "100%",
          width: "100%",
        }}>
        <TapElement
          onTap={(e) => {
            if (e.location.which === "left" && index > 0)
              setIndex((prev) => prev - 1);
            if (e.location.which === "right") setIndex((prev) => prev + 1);
          }}>
          <DisplayStory
            story={
              index >= stories.length - 1
                ? stories[stories.length - 1]
                : stories[index]
            }
          />
        </TapElement>
      </div>
    </div>
  );
}

const StoryBars = ({ storyLength, style, setIndex, index, stories }) => {
  style = style || {};
  const [storyBars, setStoryBars] = useState([]);
  const [barLength, setBarLength] = useState(0);

  const margin = useState(2)[0]; //margin for both sides of bar

  useEffect(() => {
    const wWidth = window.innerWidth;
    const barLength = wWidth / storyLength - margin * 2;
    setBarLength(barLength);
    setStoryBars((prev) => {
      let bars = [];
      for (let i = 0; i < storyLength; i++) {
        bars.push(i);
      }

      return bars;
    });
  }, []);

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        top: "1vh",
        left: 0,
        ...style,
      }}>
      <div style={{ position: "absolute", top: 0, width: "100%" }}>
        {storyBars.map((i) => (
          <StoryBar
            key={i}
            style={{ width: barLength, margin: `0px ${margin}px` }}
          />
        ))}
      </div>
      <div style={{ position: "absolute", top: 0, width: "100%" }}>
        {storyBars.map((i) => (
          <AnimateBar
            key={i}
            style={{ margin: `0px ${margin}px` }}
            duration={stories[i].type === "video" ? 30 : 15}
            barLength={barLength}
            setIndex={setIndex}
            index={index}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

const StoryBar = ({ style, classes }) => (
  <div
    style={{
      height: "calc(1px + .4vmin)",
      borderRadius: "calc(4px + .5rem)",
      display: "inline-block",
      backgroundColor: "#bbbd",
      ...style,
    }}></div>
);

const AnimateBar = ({ index, i, barLength, duration, setIndex, style }) => {
  const [transition, setTransition] = useState("none");
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (index === i) {
      setTransition("none");
      setWidth(0);

      setTimeout(() => {
        setTransition(`all ${duration}s linear`);
        setWidth(barLength);
      }, 100);
    } else if (index < i) {
      setTransition("none");
      setWidth(0);
    } else if (index > i) {
      setTransition("none");
      setWidth(barLength);
    }
  }, [index, i, barLength, duration]);
  return (
    <div
      style={{
        height: "calc(1px + .4vmin)",
        borderRadius: "calc(4px + .5rem)",
        display: "inline-block",
        backgroundColor: "#fff",
        width,
        transition,
        ...style,
      }}
      onTransitionEnd={(e) => {
        e.stopPropagation();
        setIndex((prev) => prev + 1);
      }}></div>
  );
};

const StoryAvatar = ({ setTranslate, handle, imageUrl }) => {
  const handleBackButton = (e) => {
    e.stopPropagation();
    setTranslate(100);
  };
  return (
    <Grid
      style={{
        color: "#fff",
        marginTop: 16,
        padding: 8,
      }}
      alignItems="center"
      container>
      <IconButton onClick={handleBackButton} color="secondary">
        <KeyboardBackspaceIcon style={{ color: "#fff" }} />
      </IconButton>
      <Grid item style={{ marginRight: 8, padding: "8px 0px" }}>
        <Avatar src={imageUrl} style={{ height: 35, width: 35 }} />
      </Grid>
      <Grid item>
        <Typography
          style={{ fontWeight: "bold" }}
          variant="caption"
          component="span">
          {handle}
        </Typography>
      </Grid>
    </Grid>
  );
};
