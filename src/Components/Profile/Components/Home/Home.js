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
  useTheme,
} from "@material-ui/core";

import Skeleton from "@material-ui/lab/Skeleton";

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
import MultiPosts from "../../../SubComponents/MultiPosts";
import useRefresh from "../../../../utils/customHooks/useRefresh";
import FollowCardTwo from "../../../SubComponents/FollowCardTwo";
import ScaleOnScroll, {
  ScrollChild,
} from "../../../SubComponents/ScaleOnScroll";
import IDGenerator from "../../../../utils/IDGenerator";

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
  const { posts, topPosts } = useSelector((state) => state.posts);
  const [styles, setStyles] = useState("110vh");

  const { progress } = useContext(StorageContext);

  const onRefresh = useRefresh(screamsDataThunk);

  const openAddScreamPage = (e) => {
    setStyles("0px");
  };

  return (
    <div>
      {progress ? <ProgressBar progress={progress} /> : null}
      <RefreshWrapper onRefresh={onRefresh}>
        <Posts posts={posts.scream} />
      </RefreshWrapper>

      <Posts posts={topPosts.scream} />

      <AddScreamPage styles={styles} setStyles={setStyles} />

      <Fab className={classes.addFab} onClick={openAddScreamPage}>
        <AddRoundedIcon />
      </Fab>
    </div>
  );
};

const Media = ({ classes }) => {
  const { posts, topPosts, isLoading } = useSelector((state) => state.posts);

  const users = useSelector((state) => state.extra.followSuggest.users);

  const onRefresh = useRefresh(screamsDataThunk);

  const rootRef = useRef();

  return (
    <div ref={rootRef}>
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

      {isLoading && <PostSkeletons />}
      {!isLoading && posts.media.length > 0 && (
        <RefreshWrapper onRefresh={onRefresh}>
          <MultiPosts posts={posts.media} />
        </RefreshWrapper>
      )}
      {!isLoading && posts.media.length <= 0 && (
        <UtilsNavBar users={users} classes={classes} />
      )}

      <MultiPosts posts={topPosts.media} />
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
        {/* <ScaleOnScroll className={classes.utilsNavBar}> */}
        <div className={classes.utilsNavBar}>
          {users.map((user, i) => (
            <FollowCardWithRef user={user} i={i} key={user.handle} />
          ))}
        </div>
        {/* </ScaleOnScroll> */}
      </Grid>
    </Grid>
  );
};

const FollowCardWithRef = ({ user, i }) => {
  const theme = useTheme();
  const followCardRef = useRef(null);
  return (
    <ScrollChild
      setScrollX={(ref, posX) => {
        const shadow = Math.floor(posX * 10);
        followCardRef.current.style.boxShadow =
          shadow > 0 ? theme.shadows[shadow] : theme.shadows[1];
      }}>
      <FollowCardTwo
        handle={user.handle}
        fullName={user.fullName}
        imageUrl={user.imageUrl}
        coverPhoto={user.coverPhoto}
        index={i}
        noBorder
        shadow={4}
        variant={10}
        size="small"
        rootRef={followCardRef}
      />
    </ScrollChild>
  );
};

const PostSkeletons = () => {
  const skeletons = new Array(15).fill(<></>).map(() => (
    <Grid container key={IDGenerator(20)} style={{ paddingBottom: 10 }}>
      <Grid item container alignItems="center" style={{ padding: "8px 0px" }}>
        <Grid item style={{ padding: "0px 4px" }}>
          <Skeleton variant="circle" width={40} height={40} animation="wave" />
        </Grid>
        <Grid item xs>
          <Skeleton variant="text" width="45%" animation="wave" />
          <Skeleton variant="text" width="65%" animation="wave" />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Skeleton
          variant="rect"
          animation="wave"
          width="100%"
          height={
            window.innerWidth > 500
              ? 500 - 500 * 0.2
              : window.innerWidth - window.innerWidth * 0.2
          }
        />
      </Grid>
      <Grid item xs={12} style={{ padding: "0px 16px" }}>
        <Skeleton variant="text" width="100%" animation="wave" />
        <Skeleton variant="text" width="65%%" animation="wave" />
      </Grid>
    </Grid>
  ));
  return (
    <div
      style={{
        maxHeight: "100%",
        overflowY: "auto",
      }}>
      {skeletons}
    </div>
  );
};
