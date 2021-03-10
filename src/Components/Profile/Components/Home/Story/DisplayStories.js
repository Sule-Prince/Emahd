import React, { useState, useEffect } from "react";
import DisplayStory from "./DisplayStory";
import TapElement from "../../../../SubComponents/TapElement";

export default function DisplayStories({ stories, setDisplay }) {
  const [index, setIndex] = useState(0);

  return (
    <div
      style={{
        transition: "all 1s cubic-bezier(0, .4, .6, 1)",
        transform: index >= stories.length && "translateY(100vh)",
      }}
      onTransitionEndCapture={(e) => setDisplay(false)}>
      <StoryBars
        storyLength={stories.length}
        setIndex={setIndex}
        index={index}
      />
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
  );
}

const StoryBars = ({ storyLength, style, setIndex, index }) => {
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
        top: "3%",
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
      <div style={{ position: "absolute", top: 0, width: "100%", zIndex: 10 }}>
        {storyBars.map((i) => (
          <AnimateBar
            key={i}
            style={{ margin: `0px ${margin}px` }}
            duration={30}
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
    className={classes}
    style={{
      height: "calc(3px + .8vmin)",
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
        height: "calc(3px + .8vmin)",
        borderRadius: "calc(4px + .5rem)",
        display: "inline-block",
        backgroundColor: "#fff",
        width,
        transition,
        ...style,
      }}
      onTransitionEnd={(e) => {
        setIndex((prev) => prev + 1);
        console.log("I'm done");
      }}></div>
  );
};
