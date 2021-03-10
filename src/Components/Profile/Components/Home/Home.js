//Imported Components
import React, { useState, useContext, useRef } from "react";
import {
  Avatar,
  Fab,
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  Paper,
  Typography,
  Toolbar,
  AppBar,
  Divider,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";

// Icons
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import CenterFocusStrongIcon from "@material-ui/icons/CenterFocusStrong";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";

import AstroX from "../../../assets/Astrox.svg";

// Custom Components

import AddScreamPage from "./AddScreamPage";
import Posts from "./Posts";
// import useStorage from "../../../../utils/customHooks/useStorage";
import ProgressBar from "../../../SubComponents/ProgressBar";
// import Peer2Peer from "../../../../utils/Peer2Peer";
import Story from "./Story/Story";

// Component Styling

import useStyles from "./styles";
import { StorageContext } from "../../Profile";
import { screamsDataThunk } from "../../../../redux/postsSlice";
import MultiPosts from "../../../SubComponents/MultiPosts";

const Home = ({ AccountTab }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const refreshFunc = (refresh) => {
    return () => {
      return dispatch(refresh());
    };
  };

  return (
    <>
      <div className={classes.root}>
        <HomeAppBar classes={classes} AccountTab={AccountTab} />
        <Divider />
        <NewsFeed classes={classes} refreshFunc={refreshFunc} />
      </div>
    </>
  );
};

export default React.memo(Home);

const HomeAppBar = ({ classes, AccountTab }) => {
  const userImg = useSelector((state) => state.user.data.imageUrl);

  return (
    <div className={classes.appBarRoot}>
      <AppBar position="static" elevation={3} className={classes.appBar}>
        <Toolbar>
          <span
            className={classes.menuButton}
            onClick={AccountTab}
            aria-label="profile ">
            <Avatar
              style={{
                height: 40,
                width: 40,
                border: "1px solid #999",
              }}
              src={userImg || null}
            />
          </span>
          <Typography variant="h6" className={classes.title}>
            <img src={AstroX} alt="" />
            <span>EMahd</span>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const NewsFeed = ({ classes, refreshFunc }) => {
  const [selected, setSelected] = useState(0);

  const handleChange = (e, newSelected) => {
    setSelected(newSelected);
  };

  return (
    <>
      <Grid item xs={12}>
        <Paper elevation={1}>
          <BottomNavigation
            value={selected}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="Posts and Screams">
            <BottomNavigationAction
              icon={<CenterFocusStrongIcon fontSize="large" />}
              style={{ paddingBottom: 0 }}
            />

            <BottomNavigationAction
              icon={<BubbleChartIcon fontSize="large" />}
              style={{ paddingBottom: 0 }}
            />
          </BottomNavigation>
        </Paper>
      </Grid>
      {selected === 0 && <Media refreshFunc={refreshFunc} />}

      {selected === 1 && (
        <Screams classes={classes} refreshFunc={refreshFunc} />
      )}
    </>
  );
};

const Screams = ({ classes, refreshFunc }) => {
  const { posts } = useSelector((state) => state.posts);
  const [styles, setStyles] = useState("110vh");

  const { progress } = useContext(StorageContext);

  const openAddScreamPage = (e) => {
    setStyles("0px");
  };

  return (
    <>
      {progress ? <ProgressBar progress={progress} /> : null}
      <Posts posts={posts.scream} onRefresh={refreshFunc(screamsDataThunk)} />

      <AddScreamPage styles={styles} setStyles={setStyles} />

      <Fab className={classes.addFab} onClick={openAddScreamPage}>
        <AddRoundedIcon />
      </Fab>
    </>
  );
};

const Media = ({ classes, refreshFunc }) => {
  const [displayStory, setDisplayStory] = useState(false);

  const { posts } = useSelector((state) => state.posts);

  const rootRef = useRef();

  return (
    <div ref={rootRef}>
      {displayStory && <Story classes={classes} setDisplay={setDisplayStory} />}

      <div>
        <div
          style={{
            padding: 5,
            display: "inline-flex",
            justifyContent: "center",
            flexDirection: "column",
          }}>
          <Fab
            style={{
              height: "calc(60px + 2vmin)",
              width: "calc(60px + 2vmin)",
              marginBottom: 5,
              background:
                "linear-gradient(45deg, #6a1b9a, #aa00ff, #2196f3, #42a5f5)",
            }}
            onClick={() => {
              setDisplayStory(true);
            }}>
            <AddRoundedIcon style={{ fontSize: 40, color: "#fff" }} />
          </Fab>
          <Typography align="center" variant="body2">
            Your Story
          </Typography>
        </div>
      </div>

      <Divider />

      <MultiPosts
        posts={posts.media}
        onRefresh={refreshFunc(screamsDataThunk)}
      />
    </div>
  );
};
