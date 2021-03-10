import React from "react";
import { makeStyles, TextareaAutosize } from "@material-ui/core";

const useStyles = makeStyles({
  textField: {
    backgroundColor: "transparent",
    top: ({ hasPalette }) => (hasPalette ? "40%" : "50%"),
    textAlign: "center",
    position: "absolute",
    transform: `translateY(-50%)`,
    width: "100%",
    zIndex: 1,
    border: "none",
    minHeight: 80,
    maxHeight: "100%",
    resize: "none",
    padding: "0px 4px",
    transition: "all .5s ease-out, z-index .01s linear",
    "&:focus": {
      border: "none",
      outline: "none",
    },
  },
});

const MyTextArea = ({
  textRef,
  hasPalette,
  value,
  setFocus,
  setValue,
  setFontSize,
  style,
}) => {
  style = style || {};

  const classes = useStyles({ hasPalette });

  return (
    <TextareaAutosize
      aria-label="minimum height"
      onFocus={() => {
        setFocus && setFocus(true);
      }}
      style={style}
      className={`text-placeholder ${classes.textField}`}
      value={value}
      ref={textRef}
      onChange={(e) => {
        const length = e.target.value.length;
        if (length > 1000) return;
        let fontSize;
        if (length > 850) fontSize = 3.4;
        else if (length > 600) fontSize = 4;
        else if (length > 300) fontSize = 5;
        else if (length > 250) fontSize = 5.5;
        else if (length > 200) fontSize = 6;
        else if (length > 150) fontSize = 7;
        else if (length > 80) fontSize = 8;
        else if (length > 50) fontSize = 10;
        else fontSize = 12;
        setFontSize(fontSize);
        setValue(e.target.value);
      }}
    />
  );
};

export default MyTextArea;
