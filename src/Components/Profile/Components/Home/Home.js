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

import { useSelector } from "react-redux";

// Icons
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import CenterFocusStrongIcon from "@material-ui/icons/CenterFocusStrong";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";

import AstroX from "../../../assets/Astrox.svg";

// Custom Components

import AddScreamPage from "./AddScreamPage";
import RefreshWrapper from "../../../SubComponents/RefreshWrapper";
import Posts from "./Posts";
import ProgressBar from "../../../SubComponents/ProgressBar";
// import Story from "./Story/Story";

// Component Styling

import useStyles from "./styles";
import { StorageContext } from "../../Profile";
import { screamsDataThunk } from "../../../../redux/postsSlice";
import { followSuggestThunk } from "../../../../redux/extraDataSlice";
import MultiPosts from "../../../SubComponents/MultiPosts";
import useRefresh from "../../../../utils/customHooks/useRefresh";
import FollowCardTwo from "../../../SubComponents/FollowCardTwo";

const Home = ({ AccountTab }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HomeAppBar classes={classes} AccountTab={AccountTab} />
      <Divider />
      <NewsFeed classes={classes} />
    </div>
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

const NewsFeed = ({ classes }) => {
  const [selected, setSelected] = useState(0);

  const handleChange = (e, newSelected) => {
    setSelected(newSelected);
  };

  return (
    <div
      style={{
        height: "calc(100% - 60px)",
        backgroundColor: "#f9f9f9",
      }}>
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
      {selected === 0 && <Media classes={classes} />}

      {selected === 1 && <Screams classes={classes} />}
    </div>
  );
};

const Screams = ({ classes }) => {
  const { posts } = useSelector((state) => state.posts);
  const [styles, setStyles] = useState("110vh");

  const { progress } = useContext(StorageContext);

  const onRefresh = useRefresh(screamsDataThunk);

  const openAddScreamPage = (e) => {
    setStyles("0px");
  };

  return (
    <div
      style={{
        height: "calc(100% - (130px + 1vw))",
        overflowY: "auto",
        paddingBottom: 16,
      }}>
      {progress ? <ProgressBar progress={progress} /> : null}
      <Posts posts={posts.scream} onRefresh={onRefresh} />

      <AddScreamPage styles={styles} setStyles={setStyles} />

      <Fab className={classes.addFab} onClick={openAddScreamPage}>
        <AddRoundedIcon />
      </Fab>
    </div>
  );
};

const Media = ({ classes }) => {
  // const [displayStory, setDisplayStory] = useState(false);

  const { posts, isLoading } = useSelector((state) => state.posts);

  const users = useSelector((state) => state.extra.followSuggest.users);

  const onRefresh = useRefresh(screamsDataThunk);
  const followRefresh = useRefresh(followSuggestThunk);

  const rootRef = useRef();

  return (
    <div
      ref={rootRef}
      style={{
        height: "calc(100% - (110px + 1vw))",
        paddingBottom: 16,
        overflowY: "hidden",
      }}>
      {/* {displayStory && <Story classes={classes} setDisplay={setDisplayStory} />}

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
      </div> */}

      <Divider />
      {!isLoading || posts.media.length > 0 ? (
        <MultiPosts posts={posts.media} onRefresh={onRefresh} />
      ) : (
        <RefreshWrapper onRefresh={followRefresh}>
          <UtilsNavBar users={users} classes={classes} />
        </RefreshWrapper>
      )}
    </div>
  );
};

const UtilsNavBar = ({ classes, users }) => {
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      style={{
        height: "100%",
        marginTop: "5vh",
      }}>
      {users.length > 0 && (
        <Grid
          item
          style={{
            padding: 4,
          }}>
          <Typography variant="body2" style={{ fontWeight: "bold" }}>
            People you may know
          </Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <div className={classes.utilsNavBar}>
          {users.map((user, i) => (
            <span key={user.handle} style={{ display: "inline-block" }}>
              <FollowCardTwo
                handle={user.handle}
                fullName={user.fullName}
                imageUrl={user.imageUrl}
                coverPhoto={user.coverPhoto}
                index={i}
                noBorder
                variant={10}
                size="small"
              />
            </span>
          ))}
        </div>
      </Grid>
    </Grid>
  );
};
