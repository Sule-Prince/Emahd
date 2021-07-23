import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core";

import eventManager from "../../utils/EventPubSub";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100vw",
    overflowX: "auto",
    whiteSpace: "nowrap",
  },
}));

export function ScaleOnScroll({ children, ...props }) {
  const rootRef = useRef();

  const classes = useStyles();

  return (
    <div
      {...props}
      ref={rootRef}
      className={classes.root}
      onScroll={() =>
        setTimeout(() => {
          eventManager.publish("scroll", {});
        }, 100)
      }>
      {children}
    </div>
  );
}

export default ScaleOnScroll;

export const ScrollChild = ({ children, setScrollX, ...props }) => {
  const scrollRef = useRef();

  useEffect(() => {
    if (window.innerWidth < 760) return;
    scrollRef.current.setAttribute("scrollable", true);
    const scaleComponent = () => {
      const { x, width } = scrollRef.current.getBoundingClientRect(),
        halfWidth = width / 2,
        wHalfWidth = window.innerWidth / 2 - halfWidth,
        wWidth = window.innerWidth - halfWidth;
      if (x < 0 || x > wWidth) {
        scrollRef.current.style.transform = `scale(.6)`;
        return;
      }

      if (x < wHalfWidth) {
        requestAnimationFrame(() => {
          const scrollX = 0.6 + x / wWidth;
          setScrollX(scrollRef, x / wWidth);
          scrollRef.current.style.transform = `scale(${scrollX})`;
        });
      }
      if (x > wHalfWidth) {
        requestAnimationFrame(() => {
          const scrollX = 0.6 + (1 - x / wWidth);
          setScrollX(scrollRef, 1 - x / wWidth);
          scrollRef.current.style.transform = `scale(${scrollX})`;
        });
      }
    };
    eventManager.subscribe("scroll", () => {
      scaleComponent();
    });
    scaleComponent();
  }, []);

  return (
    <div
      ref={scrollRef}
      style={{
        display: "inline-block",
        transition: "all .1s cubic-bezier(0, .4, .6, 1)",
      }}
      {...props}>
      {children}
    </div>
  );
};
