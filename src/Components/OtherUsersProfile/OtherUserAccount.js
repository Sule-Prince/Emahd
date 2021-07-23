import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  Typography,
  Button,
  Avatar,
  IconButton,
  Paper,
  MenuList,
  MenuItem,
  Popover,
  Portal,
} from "@material-ui/core";

import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { useSelector, useDispatch } from "react-redux";

import { useHistory, useParams } from "react-router-dom";

import "../Profile/Components/Account/Account.css";

import UserPosts from "../Profile/Components/Account/UserPosts/UserPosts";
import Loading from "../SubComponents/Loading";

import { useStyles } from "../Profile/Components/Account/styles";

import { otherUsersThunk } from "../../redux/otherUserSlice";
import { axios } from "../../config/axiosConfig";
import { addFriend, removeFriend } from "../../redux/userDataSlice";
import FollowTab from "../SubComponents/FollowTab";
import UserBio from "../SubComponents/UserBio";
import HeaderBase from "../SubComponents/HeaderBase";
import Messages from "../Chat/Messages/Messages";
import BottomModal from "../SubComponents/BottomModal";
import PersonalizeUser from "./PersonalizeUser";

export default ({ setSelectedTab }) => {
  const [bottomModal, setBottomModal] = useState(false);
  const [personalize, setPersonalize] = useState(false);
  const [report, setReport] = useState(false);

  const rootRef = useRef(null);

  const user = useParams().user;

  const { push } = useHistory();

  const dispatch = useDispatch();

  const mainUser = useSelector((state) => state.user.data.handle);

  const { userData, userPost, isLoading } = useSelector(
    (state) => state.otherUser
  );

  const error = useSelector((state) => state.otherUser.error.trim());

  const { coverPhoto, imageUrl, noOfPosts, friends, followers, userId } =
    userData;

  useEffect(() => {
    if (user === mainUser) {
      setSelectedTab(0);
      push("/");
      return;
    }
    dispatch(otherUsersThunk(user));

    // eslint-disable-next-line
  }, [mainUser]);

  const displayWhich = (bool, type) => {
    if (type === "personalize") setPersonalize(bool);
    else if (type === "report") setReport(bool);
  };

  const classes = useStyles();

  if (isLoading) {
    return (
      <Grid
        container
        className={classes.root}
        style={{
          position: "fixed",
          top: 0,
          backgroundColor: "#fff",
          zIndex: 1000,
          height: "100vh",
        }}>
        <Grid item xs={12}>
          <Header classes={classes} handle={user} isLoading={isLoading} />
        </Grid>
        <Loading />
      </Grid>
    );
  }
  return (
    <>
      {personalize && (
        <PersonalizeUser setDisplay={setPersonalize} userId={userId} />
      )}
      <div
        className={classes.root}
        ref={rootRef}
        style={{
          position: "fixed",
          top: 0,
          backgroundColor: "#fff",
          zIndex: 1000,
        }}>
        <Grid direction="column" container>
          <Grid xs={12} item>
            <Header
              classes={classes}
              handle={user}
              userId={userId}
              setDisplayOptions={displayWhich}
              setBottomModal={setBottomModal}
              bottomModal={bottomModal}
            />
          </Grid>
          <Grid xs={12} item>
            <CoverPhoto classes={classes} coverPhoto={coverPhoto} />
          </Grid>
          <Grid xs={12} item>
            <ProfilePic
              classes={classes}
              friend={user}
              userId={userId}
              imageUrl={imageUrl}
              rootRef={rootRef}
            />
          </Grid>
          <Grid container item xs={12}>
            <UserBio data={userData} />
          </Grid>
          <Grid container className={classes.followTab} item xs={12}>
            <FollowTab
              friends={friends}
              noOfPosts={noOfPosts}
              followers={followers}
            />
          </Grid>

          <Grid container item xs>
            <UserPosts posts={userPost} otherUser={true} error={error} />
          </Grid>
        </Grid>
        <div style={{ height: 70, width: "100%" }} />
      </div>
    </>
  );
};

const Header = ({
  classes,
  handle,
  userId,
  setBottomModal,
  bottomModal,
  setDisplayOptions,
  isLoading,
}) => {
  const { push } = useHistory();
  const handleBackButton = () => {
    push("/");
  };

  const personalizedHandle = useSelector((state) => {
    if (state.user.personalized[userId])
      return state.user.personalized[userId].handle;
    else return null;
  });

  return (
    <>
      <HeaderBase elevation={0}>
        <Grid className={classes.headerRoot} container>
          <Grid className={classes.headerNameContainer} item>
            <IconButton
              color="primary"
              onClick={handleBackButton}
              style={{ marginRight: 5, marginLeft: "-1rem" }}>
              <KeyboardBackspaceIcon />
            </IconButton>
            <Typography
              className={classes.headerName}
              variant="body2"
              component="span">
              {personalizedHandle || handle}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              disabled={isLoading}
              onClick={() => setBottomModal(true)}>
              <MoreVertIcon color="primary" className={classes.settings} />
            </IconButton>
          </Grid>
        </Grid>
      </HeaderBase>

      <BottomModal setDisplay={setBottomModal} display={bottomModal}>
        <MenuList>
          <MenuItem>Report</MenuItem>
          <MenuItem
            onClick={() => {
              setDisplayOptions(true, "personalize");
              setBottomModal(false);
            }}>
            Personalize
          </MenuItem>
          <MenuItem>Block</MenuItem>
          <MenuItem>Copy Profile Url</MenuItem>
          {/* <MenuItem>About Account</MenuItem> */}
        </MenuList>
      </BottomModal>
    </>
  );
};

const CoverPhoto = ({ classes, coverPhoto }) => {
  return (
    <Grid item>
      {coverPhoto ? (
        <img className={classes.coverPhoto} src={coverPhoto} alt="cover" />
      ) : (
        <div className={classes.coverPhoto}></div>
      )}
    </Grid>
  );
};

const ProfilePic = ({ classes, friend, imageUrl, rootRef, userId }) => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.user.data.friends);
  const [value, setValue] = useState("Follow");

  const [anchorEl, setAnchorEl] = useState(null);

  const MoreOptionsHandler = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleFollowReq = (friend) => {
    if (value.toLowerCase() === "follow") {
      axios.post("/user/followrequest", { friend }).then(() => {
        setValue("Unfollow");
        dispatch(addFriend(friend));
      });
    } else {
      axios.post("/user/unfollowrequest", { friend }).then(() => {
        setValue("Follow");
        dispatch(removeFriend(friend));
      });
    }
  };

  useEffect(() => {
    if (!friends) return;
    if (friends.includes(friend)) setValue("Unfollow");
    else setValue("Follow");
  }, [friends, friend]);

  return (
    <Grid container>
      <MoreOptions
        setAnchorEl={setAnchorEl}
        anchorEl={anchorEl}
        rootRef={rootRef}
        handle={friend}
        userId={userId}
        imageUrl={imageUrl}
      />
      <Grid
        xs={5}
        justify="center"
        container
        className={classes.avatarContainer}
        item>
        <Avatar className={classes.avatar} src={imageUrl ? imageUrl : null} />
      </Grid>

      <Grid
        container
        justify="center"
        style={{ paddingLeft: "3vw", paddingTop: "3vmin" }}
        xs={7}
        item>
        <Grid style={{ minWidth: "90%" }} item>
          <Button
            color="primary"
            style={{ fontSize: ".7rem", minWidth: "100%" }}
            size="small"
            variant="contained"
            onClick={() => {
              handleFollowReq(friend);
            }}>
            <span
              style={{
                display: "inline-flex",
                flex: 3,
                justifyContent: "flex-end",
              }}>
              {value}
            </span>
            <span
              style={{
                display: "inline-flex",
                flex: 2,
                justifyContent: "flex-end",
              }}>
              <ExpandMoreIcon fontSize="small" onClick={MoreOptionsHandler} />
            </span>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

const MoreOptions = ({
  anchorEl,
  setAnchorEl,
  rootRef,
  userId,
  handle,
  imageUrl,
}) => {
  const [openMsgs, setOpenMsgs] = useState(false);
  const [msgsData, setMsgsData] = useState({});
  const [msgStyles, setMsgStyles] = useState("110vh");

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      {openMsgs && (
        <Portal container={rootRef.current}>
          <Messages
            setDisplay={setOpenMsgs}
            setStyles={setMsgStyles}
            styles={msgStyles}
            msgsData={msgsData}
          />
        </Portal>
      )}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}>
        <Paper>
          <MenuList>
            <MenuItem
              style={{
                padding: "10px 36px",
              }}
              onClick={() => {}}>
              Block
            </MenuItem>
            <MenuItem
              style={{
                padding: "10px 36px",
              }}
              onClick={() => {
                setMsgsData({
                  handle: handle,
                  userId: userId,
                  imageUrl: imageUrl,
                });
                setMsgStyles("0px");
                setOpenMsgs(true);
                handleClose();
              }}>
              Message
            </MenuItem>
            <MenuItem
              style={{
                padding: "10px 36px",
              }}
              onClick={() => {}}>
              Mute
            </MenuItem>
          </MenuList>
        </Paper>
      </Popover>
    </>
  );
};
