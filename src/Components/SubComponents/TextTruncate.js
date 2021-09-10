import React, { useState, useEffect, useRef } from "react";
import { Button, Typography } from "@material-ui/core";
import getMaxLineChars from "../../utils/getMaxLineChars";
import { motion } from "framer-motion";

function TextTruncate({ text, width, lineNo, ...props }) {
  const [maxExceeded, setMaxExceeded] = useState(false);
  const [lessText, setLessText] = useState("");
  const rootRef = useRef(null);
  const btnRef = useRef(null);

  const maxLineChars = (targetWidth) => {
    const rootMaxChars = getMaxLineChars({
      fontSize: "0.875rem",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      width: targetWidth,
    });

    const noOfCharsPerLine = getMaxLineChars({
      fontSize: "0.875rem",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      width,
    });
    let chars = noOfCharsPerLine * lineNo - rootMaxChars;

    return chars;
  };

  const createTextGroup = (text, maxLineChars) => {
    let slicedText = text.slice(0, maxLineChars),
      textArr = slicedText.split(" ");
    // textArr = textArr.slice(0, textArr.length - 1);

    let lessText = textArr.join(" "),
      moreText = text.slice(lessText.length);

    return [lessText, moreText];
  };

  useEffect(() => {
    const noOfCharsPerLine = getMaxLineChars({
      fontSize: "0.875rem",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      width,
    });
    if (text.length < noOfCharsPerLine * lineNo) return;

    setMaxExceeded(true);

    setLessText(
      createTextGroup(text, maxLineChars(btnRef.current.offsetWidth + 8))[0]
    );
  }, []);
  return (
    <Typography
      variant="body2"
      color="textPrimary"
      component="div"
      ref={rootRef}
      {...props}>
      {maxExceeded ? lessText : <Text text={text} />}
      <Button
        style={{
          visibility: maxExceeded ? "visible" : "hidden",
          position: maxExceeded ? "static" : "absolute",
          zIndex: maxExceeded ? 0 : -1000,
          fontWeight: "bold",
          paddingLeft: 2,
          textTransform: "lowercase",
        }}
        color="primary"
        variant="text"
        component="span"
        ref={btnRef}
        onClick={() => setMaxExceeded(false)}>
        ...see more
      </Button>
    </Typography>
  );
}

export default TextTruncate;

const Text = ({ text }) => (
  <motion.div
    initial={{ opacity: 0.7 }}
    animate={{ opacity: 1 }}
    style={{ whiteSpace: "pre-line" }}>
    {text}
  </motion.div>
);
