import React, { useState, useEffect } from "react";

// import io from "socket.io-client";
import jwtDecode from "jwt-decode";

import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  BottomNavigation,
  BottomNavigationAction,
  Avatar,
  Badge,
} from "@material-ui/core";

import { Helmet } from "react-helmet";

import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";

import Home from "./Components/Home/Home";
import Search from "./Components/Search/Search";
import Notification from "./Components/Notification/Notifications";
import Account from "./Components/Account/Account";

import "./Profile.css";
import {
  notifications,
  personalizedThunk,
  userDataThunk,
} from "../../redux/userDataSlice";
import {
  getPostsFromIndexDB,
  getTopPostsThunk,
  screamsDataThunk,
} from "../../redux/postsSlice";

import { projectFirestore, projectAuth } from "../../firebase/FBConfig";
import TalkBubble from "../SubComponents/TalkBubble";
import AddMedia from "./Components/AddMedia/AddMedia";
import useStoreScream from "../../utils/customHooks/useStoreScream";
import encryptor from "../../utils/encryptor";
import {
  bannerPostsThunk,
  followSuggestThunk,
  getFeaturedThunk,
  getFeaturesThunk,
} from "../../redux/extraDataSlice";
import { BOTTOMTAB_HEIGHT } from "../../utils/constants";

export const StorageContext = React.createContext();

// const ENDPOINT = "http://localhost:5000/";

window.jwt = jwtDecode;

const Profile = ({ selectedTab, setSelectedTab, ...props }) => {
  const {
    handle: user,
    userId,
    ...data
  } = useSelector((state) => state.user.data);

  const userImg = useSelector((state) => state.user.data.imageUrl);
  const noOfUnread = useSelector(
    (state) => state.user.notifications.noOfUnread
  );
  const dispatch = useDispatch();

  const { push, location } = useHistory();

  const [media, setMedia] = useState(null);
  const [fileCodec, setFileCodec] = useState(null);
  const [mediaUrl, setMediaUrl] = useState("");

  // const [display, setDisplay] = useState(true);

  const { progress, storeData } = useStoreScream(
    "scream",
    fileCodec === "image" ? mediaUrl : media
  );

  const handleTabChange = (ev, newValue) => {
    if (location.pathname !== "/") push("/");

    setSelectedTab(newValue);
    localStorage.setItem("tabNo", newValue);
  };

  const AccountTab = () => {
    setSelectedTab(0);
  };

  useEffect(() => {
    // window.socket = io(ENDPOINT);

    projectAuth.onAuthStateChanged((user) => {
      if (user) return;
      else {
        let token = localStorage.getItem("token");

        const decodedToken = jwtDecode(token);

        let email = decodedToken.email;
        let psw = localStorage.getItem("p-s-w");
        psw = encryptor.decrypt(psw);

        projectAuth.signInWithEmailAndPassword(email, psw);
      }
    });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(personalizedThunk());
    dispatch(userDataThunk());
    dispatch(getPostsFromIndexDB());
    dispatch(screamsDataThunk());
    dispatch(getTopPostsThunk());
    dispatch(bannerPostsThunk());
    dispatch(getFeaturesThunk());
    dispatch(getFeaturedThunk());
    dispatch(followSuggestThunk());

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!userId) return;
    const unsubscribe = projectFirestore
      .collection("notifications")
      .doc(userId)
      .onSnapshot((snapshot) => {
        const data = snapshot.data();
        if (data) {
          dispatch(notifications(data));
        }
      });

    return () => {
      unsubscribe();
    };

    // eslint-disable-next-line
  }, [userId]);

  return (
    <div className="profile-page">
      <Helmet>
        <title>{user}</title>
        {data.followers && (
          <meta
            name="description"
            content={`${data.followers.length} followers, ${data.friends.length} following, ${data.noOfPosts} posts, login to see media and scream posts from ${data.fullName} (@${user})`}
          />
        )}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Grenze+Gotisch:wght@900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fugaz+One&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Nosifer&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Ewert&display=swap"
        />
      </Helmet>
      {/*   <BottomModal display={display} setDisplay={setDisplay}>
        <h4>Hello World</h4>
      </BottomModal> */}
      <TalkBubble />

      <div
        style={{
          height: `calc(100% - ${BOTTOMTAB_HEIGHT}px)`,
        }}>
        {selectedTab === 0 && <Account />}
        {selectedTab === 1 && <Search />}
        {selectedTab === 2 && <AddMedia />}
        {selectedTab === 3 && <Notification />}
        {selectedTab === 4 && (
          <StorageContext.Provider
            value={{
              fileCodec,
              mediaUrl,
              progress,
              storeData,
              setMedia,
              setMediaUrl,
              setFileCodec,
            }}>
            <Home AccountTab={AccountTab} />
          </StorageContext.Provider>
        )}
      </div>

      <div className="bottom-tab">
        <BottomNavigation
          value={selectedTab}
          onChange={handleTabChange}
          style={{ justifyContent: "space-between" }}
          variant="fullWidth">
          <BottomNavigationAction
            icon={
              <Avatar
                style={{
                  height: "30px",
                  width: "30px",
                  border: "1px solid #999",
                }}
                src={userImg || null}
              />
            }
          />
          <BottomNavigationAction icon={<SearchOutlinedIcon />} />
          <BottomNavigationAction
            icon={
              selectedTab === 2 ? (
                <AddBoxRoundedIcon style={{ fontSize: "1.7rem" }} />
              ) : (
                <AddBoxOutlinedIcon style={{ fontSize: "1.7rem" }} />
              )
            }
          />
          <BottomNavigationAction
            icon={
              selectedTab === 3 ? (
                <Badge
                  invisible={noOfUnread > 0 ? false : true}
                  variant="dot"
                  color="error">
                  <NotificationsRoundedIcon />
                </Badge>
              ) : (
                <Badge
                  invisible={noOfUnread > 0 ? false : true}
                  variant="dot"
                  color="error">
                  <NotificationsOutlinedIcon />
                </Badge>
              )
            }
          />

          <BottomNavigationAction
            icon={
              selectedTab === 4 ? <HomeRoundedIcon /> : <HomeOutlinedIcon />
            }
          />
        </BottomNavigation>
      </div>
    </div>
  );
};

export default React.memo(Profile);
