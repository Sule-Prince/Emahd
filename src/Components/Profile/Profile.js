import React, { useState, useEffect } from "react";

import io from "socket.io-client";

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

import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import "./Profile.css";
import { notifications, userDataThunk } from "../../redux/userDataSlice";
import { screamsDataThunk } from "../../redux/postsSlice";
// import { openTalkBubble, closeTalkBubble } from "../../redux/userActionsSlice";

import { projectFirestore, projectAuth } from "../../firebase/FBConfig";
import TalkBubble from "../SubComponents/TalkBubble";
import AddMedia from "./Components/AddMedia/AddMedia";
import useStorage from "../../utils/customHooks/useStorage";

export const StorageContext = React.createContext();

const ENDPOINT = "http://localhost:5000/";

const Profile = ({ selectedTab, setSelectedTab, ...props }) => {
  const { handle: user, ...data } = useSelector((state) => state.user.data);

  const userImg = useSelector((state) => state.user.data.imageUrl);
  const noOfUnread = useSelector(
    (state) => state.user.notifications.noOfUnread
  );
  const dispatch = useDispatch();

  const { push, location } = useHistory();

  const [media, setMedia] = useState(null);
  const [fileCodec, setFileCodec] = useState(null);
  const [mediaUrl, setMediaUrl] = useState("");

  const { progress, storeData } = useStorage(
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
    window.socket = io(ENDPOINT);

    dispatch(userDataThunk());
    dispatch(screamsDataThunk());

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = projectFirestore
      .collection("notifications")
      .doc(user)
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
  }, [user]);

  return (
    <div className="profile-page" onDrag={(e) => e.preventDefault()}>
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
      <TalkBubble />
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
                <Badge badgeContent={noOfUnread} color="primary">
                  <NotificationsRoundedIcon />
                </Badge>
              ) : (
                <Badge badgeContent={noOfUnread} color="primary">
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
  );
};

export default React.memo(Profile);
