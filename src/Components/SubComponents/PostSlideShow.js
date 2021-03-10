import React from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";

function PostSlideShow({ slides, setIndex = () => {}, className }) {
  return (
    <Carousel
      showArrows={false}
      emulateTouch
      dynamicHeight
      onChange={(i) => setIndex(i)}
      showThumbs={false}>
      {slides.map((slide, i) => (
        <motion.div
          key={i}
          drag
          dragElastic={0.2}
          dragConstraints={{ left: 0, right: 0, bottom: 0, top: 0 }}
          style={{ backgroundColor: "#fff" }}>
          <img src={slide} alt="A post" className={className} />
        </motion.div>
      ))}
    </Carousel>
  );
}

export default PostSlideShow;
