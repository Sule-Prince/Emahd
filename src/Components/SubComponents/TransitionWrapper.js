import React, { useState, useEffect } from "react";
import eventManager from "../../utils/EventPubSub";

function TransitionWrapper({
  setDisplay,
  header,
  children,
  direction: directionProp = "vertical",
  idProp,
  style,
  ...props
}) {
  const [unmount, setUnmount] = useState(false);
  const [direction, setDirection] = useState(directionProp);
  const [transition, setTransition] = useState(false);
  const [pos, setPos] = useState(100);

  const unmountComponent = (display) => {
    if (display) return;
    setUnmount(true);
    setPos(100);
  };

  useEffect(() => {
    setTransition(true);
    setPos(0);

    eventManager.subscribe(
      "transition-wrapper",
      ({ direction, display, id }) => {
        console.log(" I was Initialized!!!");
        if (id !== idProp) return;
        if (display) return;

        setDirection(direction);
        setUnmount(true);
        setPos(100);
      }
    );

    // eslint-disable-next-line
  }, []);

  return (
    <div
      {...props}
      onTransitionEnd={() => {
        if (!unmount) return;
        setDisplay(false);
      }}
      style={{
        transform:
          direction === "vertical"
            ? `translateY(${pos}vh)`
            : direction === "horizontal"
            ? `translateX(${pos}vw)`
            : "none",
        transition: transition ? "all .5s cubic-bezier(0, .4, .6, 1)" : "none",
        ...style,
      }}>
      {header(unmountComponent)}
      {children}
    </div>
  );
}

export default TransitionWrapper;
