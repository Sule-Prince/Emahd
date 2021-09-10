import React from "react";
import { motion } from "framer-motion";

function TapElement({ children, onTap = () => {} }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}>
      {children}

      <motion.div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
        }}
        onTap={(e) => {
          let wWidth = window.innerWidth,
            intersectionPoint = wWidth / 2,
            diff = wWidth * (10 / 100),
            lWidth = intersectionPoint - diff,
            rWidth = intersectionPoint + diff;

          if (e.clientX <= lWidth)
            e.location = {
              which: "left",
              point: e.clientX,
            };
          else if (e.clientX >= rWidth)
            e.location = {
              which: "right",
              point: e.clientX,
            };
          else if (e.clientX > lWidth && e.clientX < rWidth)
            e.location = {
              which: "center",
              point: e.clientX,
            };

          onTap(e);
        }}></motion.div>
    </div>
  );
}

export default TapElement;
