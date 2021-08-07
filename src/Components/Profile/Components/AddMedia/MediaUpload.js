import React, { useState, useEffect, useRef } from "react";

import {
  Grid,
  Button,
  IconButton,
  makeStyles,
  useTheme,
  CardActionArea,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

import CropRotateIcon from "@material-ui/icons/CropRotate";

import ImageEdits from "../../../../utils/ImageEditor";
import CropRotate from "../../../SubComponents/CropRotate";
import UploadPage from "./UploadPage";
import PostSlideShow from "../../../SubComponents/PostSlideShow";

const useStyles = makeStyles({
  fileInput: {
    width: 0,
    height: 0,
    margin: 0,
    padding: 0,
    position: "absolute",
    zIndex: -1,
  },
  mediaRoot: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  mediaWrapper: {
    height: "calc(100% - 90px)",
    overflow: "hidden",
  },
  imgSlide: {
    maxHeight: "calc(100vh - 250px)",
    objectFit: "cover",
  },
  media: {
    width: "100%",
    height: "auto",
    maxHeight: "100%",
    objectFit: "cover",
  },
  mediaHeaderRoot: {
    height: 48,
  },
});
const MediaUpload = ({ setStyles }) => {
  const [focusNums, setFocusNums] = useState(0);
  const [blurred, setBlurred] = useState(false);
  const [clearId, setClearId] = useState(null);
  // const [file, setFile] = useState(null);
  const [mediaUrls, setMediaUrls] = useState([]);
  const [types, setTypes] = useState([]);

  const [slideIndex, setSlideIndex] = useState(0);

  const [openCropRotate, setOpenCropRotate] = useState(false);
  const [openUploadPage, setOpenUploadPage] = useState(false);
  const [postSettings, setPostSettings] = useState([]);

  const classes = useStyles();

  const fileRef = useRef(null);

  const handleFileUpload = (e) => {
    setTypes([]);
    clearInterval(clearId);
    const files = e.target.files,
      file = files[0];

    if (mediaUrls.length > 0) {
      mediaUrls.forEach((url) => URL.revokeObjectURL(url));
      setMediaUrls([]);
    }
    if (!file) return;

    const urls = [];
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      setTypes((prev) => {
        let type;
        if (file.type.includes("video")) type = "video";
        else type = "image";
        prev.push(type);

        return prev;
      });
      urls.push(URL.createObjectURL(file));
    }

    // PROTOTYPE TESTING

    setStyles((prev) => ({
      ...prev,
      fabOpacity: [0, 0],
      upperTranslate: ["-100vh", 0.2],
    }));

    setTimeout(() => {
      setMediaUrls(urls);
    }, 1000);

    // END OF PROTOTYPE TESTING

    setBlurred(false);
    e.target.value = "";
  };
  const updateUrls = (newUrl) => {
    setMediaUrls((prev) =>
      prev.map((url, i) => {
        if (i === slideIndex) {
          return newUrl;
        }
        return url;
      })
    );
  };

  useEffect(() => {
    if (focusNums !== 2) return;

    setBlurred(true);
    setFocusNums(0);
  }, [focusNums]);
  useEffect(() => {
    if (!blurred) return;
    setClearId(
      setTimeout(() => {
        fileRef.current.blur();
      }, 500)
    );
  }, [blurred]);
  return (
    <>
      <input
        type="file"
        id="upload-media"
        multiple
        accept="image/*"
        ref={fileRef}
        className={classes.fileInput}
        onFocus={(e) => {
          setFocusNums((prev) => prev + 1);
        }}
        onBlur={(e) => {
          if (!blurred) return;

          if (e.target.value) return;
          setStyles((prev) => ({
            ...prev,
            upperTranslate: [0, 0],
            fabOpacity: [1, 1],
          }));

          setBlurred(false);
        }}
        onChange={handleFileUpload}
      />
      {mediaUrls.length > 0 && (
        <div className={classes.mediaRoot}>
          {openUploadPage && (
            <UploadPage
              setStyles={setStyles}
              setDisplay={setOpenUploadPage}
              setMediaUrls={setMediaUrls}
              mediaUrls={mediaUrls}
              postSettings={postSettings}
              multiple={mediaUrls.length > 1 ? true : false}
            />
          )}
          <MediaHeader
            setDone={setOpenUploadPage}
            setMediaUrls={setMediaUrls}
            mediaUrls={mediaUrls}
            setStyles={setStyles}
            classes={classes}
            types={types}
            setTypes={setTypes}
            setPostSettings={setPostSettings}
          />
          <Grid container alignItems="center" className={classes.mediaWrapper}>
            <PostSlideShow
              slides={mediaUrls}
              setIndex={setSlideIndex}
              className={classes.imgSlide}
            />
            <MediaThumbSelect
              mediaUrls={mediaUrls}
              setMediaUrls={setMediaUrls}
            />
          </Grid>
          <Grid
            container
            justify="center"
            style={{ padding: 3, position: "absolute", bottom: "2%" }}>
            <span>
              <Button
                size="medium"
                variant="contained"
                style={{ color: "#fff", backgroundColor: "#505050b3" }}
                onClick={() => setOpenCropRotate(true)}>
                <span style={{ marginRight: 6 }}>Crop</span>
                <CropRotateIcon />
              </Button>
            </span>
          </Grid>
          {openCropRotate && (
            <CropRotate
              imageSrc={mediaUrls[slideIndex]}
              setImageSrc={updateUrls}
              setDisplay={setOpenCropRotate}
            />
          )}
        </div>
      )}
    </>
  );
};

export default MediaUpload;

const MediaHeader = ({
  types,
  classes,
  mediaUrls,
  setMediaUrls,
  setTypes,
  setStyles,
  setDone,
  setPostSettings,
}) => {
  return (
    <Grid
      container
      item
      alignItems="center"
      className={classes.mediaHeaderRoot}>
      <Grid item style={{ flexGrow: 1 }}>
        <IconButton
          onClick={() => {
            if (mediaUrls.length > 0) {
              setTypes([]);
              mediaUrls.forEach((url) => URL.revokeObjectURL(url));

              setMediaUrls([]);
            }
            setStyles((prev) => ({
              ...prev,
              upperTranslate: [0, 0],
              fabOpacity: [1, 1],
            }));
          }}>
          <CloseIcon style={{ color: "#fff" }} />
        </IconButton>
      </Grid>
      <Grid item style={{ paddingRight: 5 }}>
        <IconButton
          onClick={() => {
            const editor = new ImageEdits();
            const multiple = mediaUrls.length > 1 ? true : false;
            console.log(multiple);
            editor
              .computeAspectRatio(
                multiple ? types : types[0],
                multiple ? mediaUrls : mediaUrls[0],
                multiple
              )
              .then((result) => {
                console.log(result);
                if (!multiple) result = [result];
                setPostSettings((prev) => {
                  result.forEach((aspectRatio, i) => {
                    prev[i] = { ...prev[i], aspectRatio };
                  });
                  return prev;
                });
                return;
              })
              .catch((error) => console.log(error));
            setDone(true);
          }}>
          <KeyboardBackspaceIcon
            style={{ color: "#fff", transform: "rotateY(180deg)" }}
          />
        </IconButton>
      </Grid>
    </Grid>
  );
};

const MediaThumbSelect = ({ mediaUrls, setMediaUrls }) => {
  const [index, setIndex] = useState(0);
  const [currIndex, setCurrIndex] = useState(0);
  const [newUrls, setNewUrls] = useState([]);

  /*  useEffect(() => {
    setMediaUrls((prev) => prev.splice(currIndex, 0, prev[index]));
    setMediaUrls((prev) => prev.splice(index, 1));
    setCurrIndex((prev) => prev + 1);
  }, [index, setMediaUrls, currIndex]); */

  useEffect(() => {
    const createThumb = async () => {
      let urls = mediaUrls.map(async (url) => {
        const editor = new ImageEdits();
        let src = await editor.reduceImage({
          src: url,
          size: 150,
          format: "blob",
        });

        return URL.createObjectURL(src);
      });
      urls = await Promise.all(urls);
      setNewUrls(urls);
    };

    createThumb();
    // eslint-disable-next-line
  }, []);
  return (
    <Grid container style={{ height: 90, marginTop: 12, overflowY: "hidden" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          padding: "4px 8px",
          paddingBottom: 20,
          display: "flex",
          justifyContent: "center",
        }}>
        {newUrls.map((slide, i) => (
          <MediaThumb key={i} src={slide} i={i} setIndex={setIndex} />
        ))}
      </div>
    </Grid>
  );
};

const MediaThumb = ({ src, i, setIndex }) => {
  const [selected, setSelected] = useState(false);

  const theme = useTheme();

  const styles = {
    thumbRoot: {
      display: "inline-block",
      padding: "4px 8px",
      width: "auto",
    },
    imgThumb: {
      width: ((selected) => {
        if (selected) return 65;
        return 55;
      })(selected),
      height: ((selected) => {
        if (selected) return 65;
        return 55;
      })(selected),
      objectFit: "cover",
      boxShadow: ((selected) => {
        if (selected) return theme.shadows[5];
        return "none";
      })(selected),
      transition: "all .5s ease-out",
    },
  };
  return (
    <CardActionArea
      style={styles.thumbRoot}
      onClick={() => {
        setSelected(true);
        setIndex(i);
      }}
      onBlur={() => setSelected(false)}>
      <img src={src} alt="thumb" style={styles.imgThumb} />
    </CardActionArea>
  );
};
