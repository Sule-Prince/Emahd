import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Fab, Grid } from "@material-ui/core";

import Slideshow from "../../../SubComponents/Slideshow";
import FollowCardTwo from "../../../SubComponents/FollowCardTwo";

import { followSuggestThunk } from "../../../../redux/extraDataSlice";
import Loader from "../../../SubComponents/Loader";

import img1 from "../../../assets/graphics/slideshow/(1).jpg";
import img2 from "../../../assets/graphics/slideshow/(2).jpg";
import img3 from "../../../assets/graphics/slideshow/(3).jpg";
import img4 from "../../../assets/graphics/slideshow/(4).jpg";
import { AddRounded } from "@material-ui/icons";
import MediaUpload from "./MediaUpload";

import useStyles from "./styles";

const AddMedia = () => {
  const [styles, setStyles] = useState({
    fabOpacity: [1, 0],
    upperTranslate: [0, 0],
  });

  const dispatch = useDispatch();

  const followSuggest = useSelector((state) => state.extra.followSuggest);

  const classes = useStyles();

  useEffect(() => {
    if (followSuggest.users.length > 0) return;
    dispatch(followSuggestThunk());

    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <Grid
        container
        className={classes.mediaContainer}
        style={{
          transform: `translateY(${styles.upperTranslate[0]})`,
          transitionDelay: `${styles.upperTranslate[1]}s`,
        }}>
        <Slideshow
          slides={[
            {
              media: img1,
              info: "This is the first slide",
            },
            {
              media: img2,
              info: "This is the second slide",
            },
            {
              media: img3,
              info: "This is the third slide",
            },
            {
              media: img4,
              info: "This is the fourth slide",
            },
          ]}
        />

        <Grid
          style={{
            borderBottom: "1px solid #ccc",
            maxHeight: 340,
            overflow: "hidden",
          }}
          xs={12}
          item>
          {followSuggest.isLoading ? (
            <Loader />
          ) : (
            followSuggest.users.length > 0 && (
              <UtilsNavBar users={followSuggest.users} classes={classes} />
            )
          )}
        </Grid>
      </Grid>
      <Grid container justify="center" className={classes.addRoot}>
        <label htmlFor="upload-media">
          <Fab
            component="span"
            style={{
              opacity: styles.fabOpacity[0],
              transitionDelay: `${styles.fabOpacity[1]}s`,
            }}
            className={classes.addFab}
            onClick={() => {
              setStyles((prev) => ({
                ...prev,
                fabOpacity: [0, 0],
                upperTranslate: ["-100vh", 0.5],
              }));
            }}>
            <AddRounded style={{ color: "#fff" }} />
          </Fab>
        </label>
      </Grid>

      <MediaUpload setStyles={setStyles} />
    </div>
  );
};

export default AddMedia;

const UtilsNavBar = ({ classes, users }) => {
  return (
    <div className={classes.utilsNavBar}>
      {users.map((user) => (
        <span key={user.handle} style={{ display: "inline-block" }}>
          <FollowCardTwo
            handle={user.handle}
            fullName={user.fullName}
            imageUrl={user.imageUrl}
            coverPhoto={user.coverPhoto}
          />
        </span>
      ))}
    </div>
  );
};
