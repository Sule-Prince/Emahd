import React, { useEffect, useState, useRef } from "react";

import {
  Grid,
  makeStyles,
  IconButton,
  Fab,
  Typography,
  Button,
  ButtonBase,
} from "@material-ui/core";
import PaletteIcon from "@material-ui/icons/Palette";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import FormatBoldRoundedIcon from "@material-ui/icons/FormatBoldRounded";
import FormatColorTextRoundedIcon from "@material-ui/icons/FormatColorTextRounded";

import { motion } from "framer-motion";

import StoryHeader from "./StoryHeader";
import MyTextArea from "../../../../SubComponents/MyTextArea";
import FontsSelectOptions from "../../../../SubComponents/FontSelectionOptions";
import ColorPalette from "../../../../SubComponents/ColorPalette";
import { SendRounded } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { openSnackBar } from "../../../../../redux/userActionsSlice";
import usePostData from "../../../../../utils/customHooks/usePostData";

const useStyles = makeStyles({
  root: {
    height: "100%",
    width: "100%",
  },
  text: {
    position: "relative",
    height: "100%",
    width: "100%",
  },
});

const TypeSelect = ({ setStyle, setDisplay }) => {
  const [num, setNum] = useState(0);
  const [color, setTextColor] = useState("#fff");
  const [bgColor, setBgColor] = useState(
    "linear-gradient(45deg, #311b92, #2196f3)"
  );
  const [fontFamily, setFontFamily] = useState("Tahoma");
  const [otherStyles, setOtherStyles] = useState({ fontWeight: "normal" });
  const [displayPalette, setDisplayPalatte] = useState(false);

  const [fontSize, setFontSize] = useState(12);

  const [text, setText] = useState("");

  const textAreaRef = useRef(null);

  const colorSwatch = [
    "linear-gradient(45deg, #311b92, #2196f3)",
    "linear-gradient(45deg, #d50000, #e65100)",
    "linear-gradient(45deg, #e65100, #aa00ff)",
    "linear-gradient(45deg, #ffea00, #e65100)",
    "linear-gradient(45deg, #4caf50, #76ff03, #00c853)",
    "linear-gradient(45deg, #d50000, #f50057, #dd2c00, #ff5722)",
    "linear-gradient(45deg, #757575, #212121)",
    "linear-gradient(45deg, #aaa, #ddd)",
  ];

  useEffect(() => {
    if (text.length > 49)
      setOtherStyles((prev) => ({
        ...prev,
        fontWeight: "normal",
      }));
  }, [text]);

  useEffect(() => {
    setBgColor(colorSwatch[num % colorSwatch.length]);
  }, [num, colorSwatch]);

  const dispatch = useDispatch();

  const classes = useStyles();
  return (
    <div
      className={classes.root}
      style={{
        background: bgColor,
      }}
      onClick={() => {
        textAreaRef.current.focus();
      }}>
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.text}
        onClick={() => {
          textAreaRef.current.focus();
        }}>
        <StoryHeader
          setDisplay={setDisplay}
          style={{ alignSelf: "flex-start" }}
          setStyle={setStyle}>
          <IconButton
            color="primary"
            onClick={() => {
              setNum((prev) => (prev += 1));
            }}>
            <PaletteIcon style={{ fontSize: "1.8rem" }} />
          </IconButton>
          <span
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}>
            <FontsSelectOptions
              fontFamily={fontFamily}
              setFontFamily={setFontFamily}
            />
          </span>
        </StoryHeader>
        <MyTextArea
          textRef={textAreaRef}
          hasPalette={displayPalette}
          setFontSize={setFontSize}
          setValue={setText}
          value={text}
          style={{
            ...otherStyles,
            color,
            fontSize: `${fontSize}vmin`,
            fontFamily,
            maxHeight: "85%",
          }}
        />
      </Grid>
      <div
        style={{ position: "fixed", zIndex: 10, bottom: 50, width: "100vw" }}>
        {displayPalette ? (
          <>
            <motion.div
              style={{ display: "flex", justifyContent: "center" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeIn" }}>
              <Button
                variant="contained"
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  backgroundColor: "rgba(80, 80, 80, .7)",
                }}
                onClick={() => setDisplayPalatte(false)}>
                Done
              </Button>
            </motion.div>
            <ColorPalette
              textColor={color}
              bottom={false}
              setTextColor={setTextColor}
            />
          </>
        ) : (
          <>
            <div style={{ padding: "4px 8px" }}>
              <ButtonBase
                style={{ padding: 5, borderRadius: "50%", margin: "0px 4px" }}
                onClick={() => {
                  setDisplayPalatte(true);
                }}>
                <FormatColorTextRoundedIcon />
              </ButtonBase>
              <span
                style={{
                  marginLeft: 8,
                  padding: "8px 4px",
                  borderBottom:
                    otherStyles.fontWeight === "bold" && "2px solid #aa00ff",
                }}>
                <ButtonBase
                  style={{
                    padding: 5,
                    borderRadius: "50%",
                  }}
                  onClick={() => {
                    if (text.length > 49) {
                      dispatch(
                        openSnackBar({
                          message: "Text is too long to bolden",
                          type: "info",
                          duration: 3000,
                        })
                      );
                      return;
                    }
                    setOtherStyles((prev) => ({
                      ...prev,
                      fontWeight:
                        prev.fontWeight === "bold" ? "normal" : "bold",
                    }));
                  }}>
                  <FormatBoldRoundedIcon />
                </ButtonBase>
              </span>
            </div>
            <Footer
              settings={{
                fontSize,
                bgColor,
                color: color,
                fontFamily,
                ...otherStyles,
              }}
              text={text}
              dispatch={dispatch}
              setStyle={setStyle}
              setDisplay={setDisplay}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TypeSelect;

const Footer = ({ settings, text, dispatch, setStyle, setDisplay }) => {
  const { sendData } = usePostData();

  const sendTextStory = () => {
    sendData({ settings, text: [text], type: "text" }, "/stories").then(
      (res) => {
        if (res.hasError) {
          dispatch(
            openSnackBar({
              message: res.message,
              type: "error",
              duration: 4000,
            })
          );
          return;
        }

        dispatch(
          openSnackBar({
            message: res.message,
            duration: 4000,
          })
        );
      }
    );

    setStyle("-110vw");
    setTimeout(() => {
      setDisplay(false);
    }, 600);
  };

  return (
    <div style={{ position: "relative" }}>
      <Grid
        container
        alignItems="center"
        style={{ backgroundColor: "rgba(0, 0, 0, .4)", minHeight: 27 }}>
        <Typography
          style={{
            color: "#ddd",
            display: "flex",
            alignItems: "center",
            padding: " 0px 5px",
          }}
          variant="caption">
          <ChevronRightRoundedIcon />
          <span style={{ paddingLeft: 5 }}>Stories (Global)</span>
        </Typography>
      </Grid>
      <Fab
        style={{
          height: 50,
          width: 50,
          position: "absolute",
          right: "5%",
          top: -35,
          backgroundColor: "#2196f3",
          color: "#fff",
        }}
        onClick={sendTextStory}>
        <SendRounded fontSize="small" />
      </Fab>
    </div>
  );
};
