import React, { useState } from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function Slideshow({ slides, interval = 3000, style = {} }) {
  const [load, setLoad] = useState(false);
  return (
    <div style={style}>
      <Carousel
        showArrows={false}
        emulateTouch
        infiniteLoop
        autoPlay
        dynamicHeight
        interval={interval}
        showThumbs={false}>
        {slides.map((slide, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#fff",
              position: "relative",
            }}>
            {!load && (
              <div
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: "50%",
                  border: "1px solid #ddd",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}></div>
            )}
            <img
              src={slide.media}
              alt="A slide"
              onLoad={() => {
                setLoad(true);
              }}
            />
            {load && <p className="legend">{slide.info}</p>}
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Slideshow;
