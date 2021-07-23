import React, { useState } from "react";

function MoveGesture({ children, setX, setY, onEventEnd, onEventStart }) {
  const [initPos, setInitPos] = useState({
    x: 0,
    y: 0,
  });
  return (
    <div
      onTouchStart={(e) => {
        if (onEventStart) onEventStart();
        setInitPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }}
      onTouchMove={(e) => {
        e.persist();
        setTimeout(() => {
          requestAnimationFrame(() => {
            if (setX) setX(initPos.x - e.touches[0].clientX);
            if (setY) setY(initPos.y - e.touches[0].clientY);
          });
        }, 100);
      }}
      onTouchEnd={(e) => {
        setInitPos({ x: 0, y: 0 });
        if (onEventEnd) onEventEnd();
      }}
      onTouchCancel={(e) => {
        setInitPos({ x: 0, y: 0 });
      }}>
      {children}
    </div>
  );
}

export default MoveGesture;
