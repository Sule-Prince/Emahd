import React, { useState } from "react";

function MoveGesture({ children, setX, setY, setEventEnd }) {
  const [initPos, setInitPos] = useState({
    x: 0,
    y: 0,
  });
  return (
    <div
      onTouchStart={(e) => {
        setInitPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }}
      onTouchMove={(e) => {
        if (setX) setX(initPos.x - e.touches[0].clientX);
        if (setY) setY(initPos.y - e.touches[0].clientY);
      }}
      onTouchEnd={(e) => {
        setInitPos({ x: 0, y: 0 });
        setEventEnd(true);
      }}
      onTouchCancel={(e) => {
        setInitPos({ x: 0, y: 0 });
      }}>
      {children}
    </div>
  );
}

export default MoveGesture;
