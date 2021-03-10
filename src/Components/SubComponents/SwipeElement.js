import React, { useState } from "react";

function SwipeElement({
  children,
  onSwipe = () => {},
  onSwipeStart = () => {},
  onSwipeEnd = () => {},
  style = {},
}) {
  const [initialPos, setInitialPos] = useState(0);
  const [isSWiping, setIsSwiping] = useState(false);
  const [swipeStart, setSwipeStart] = useState(false);

  const onEventStart = (e) => setInitialPos(e.touches[0].clientX);
  const onEventMove = (e) => {
    e.persist();
    const currPos = e.touches[0].clientX,
      min = window.innerWidth * (5 / 100);

    if (currPos > initialPos + min) {
      setIsSwiping(true);
      setSwipeStart(true);
      e.direction = "right";
      if (!swipeStart) onSwipeStart(e);
      onSwipe(e);
    } else if (currPos < initialPos - min) {
      setIsSwiping(true);
      setSwipeStart(true);
      e.direction = "left";
      if (!swipeStart) onSwipeStart(e);
      onSwipe(e);
    }
  };
  const onEventEnd = (e) => {
    if (isSWiping) {
      e.persist();
      const swipeDistance = e.changedTouches[0].clientX - initialPos,
        wWidth = window.innerWidth,
        swipePercent = (swipeDistance / wWidth) * 100;
      if (swipePercent > 0 && swipePercent >= 20) {
        e.direction = "right";
        e.swiped = true;
      } else if (swipePercent < 0 && swipePercent <= -20) {
        e.direction = "left";
        e.swiped = true;
      } else if (swipePercent > -20 && swipePercent < 20) {
        e.swiped = false;
      }
      onSwipeEnd(e);
      setIsSwiping(false);
      setSwipeStart(false);
    }
  };
  return (
    <div style={{ position: "relative" }}>
      {children}

      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
        }}
        onTouchStart={onEventStart}
        // onMouseDown={onEventStart}
        onTouchMove={onEventMove}
        // onMouseMove={onEventMove}
        onTouchEnd={onEventEnd}
        // onMouseUp={onEventEnd}
      ></div>
    </div>
  );
}

export default SwipeElement;
