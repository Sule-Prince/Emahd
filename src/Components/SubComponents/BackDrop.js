import React from "react";

function BackDrop({ children, style = {} }) {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          backgroundColor: "rgba(0, 0, 0, .6)",
          ...style,
        }}>
        {children}
      </div>
    </>
  );
}

export default BackDrop;
