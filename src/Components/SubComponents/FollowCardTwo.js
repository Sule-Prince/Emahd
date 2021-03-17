import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { axios } from "../../config/axiosConfig";
import { useDispatch } from "react-redux";
import { addFriend, removeFriend } from "../../redux/userDataSlice";
import { Link } from "react-router-dom";
import { popUserSuggest } from "../../redux/extraDataSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    width: ({ size }) =>
      size === "large" ? "calc(220px + 2vw)" : "calc(180px + 1vw)",
    overflow: "hidden",
    position: "relative",
    margin: theme.spacing(2.5),
    boxShadow: ({ variant }) => (variant > 0 ? theme.shadows[variant] : ""),
    borderRadius: "3px",
  },
  header: {
    color: theme.palette.grey[400],
    height: "15px",
  },
  cover_root: {
    width: "100%",
    height: ({ size }) => (size === "large" ? 140 : 100),
    background:
      "linear-gradient(360deg, #3f51b5 0%, #2196f3 75%, #64b5f6 100%)",
  },
  cover_img: {
    width: "100%",
    height: ({ size }) => (size === "large" ? 140 : 100),
    objectFit: "cover",
  },
  profile_root: {
    height: "auto",
    width: "100%",
    marginTop: -35,
  },
  profile_avatar: {
    height: ({ size }) =>
      size === "large" ? theme.spacing(11) : theme.spacing(8),
    width: ({ size }) =>
      size === "large" ? theme.spacing(11) : theme.spacing(8),
  },
  userInfo_root: {
    marginTop: 4,
  },
  channelUserName: {
    fontWeight: theme.typography.fontWeightBold,
    maxWidth: 214,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  btnContainer: {
    paddingTop: "6px",
    width: "100%",
  },
  btn: {
    letterSpacing: ".5px",
    fontWeight: theme.typography.fontWeightMedium,
    textTransform: "none",
    width: "100%",
    backgroundColor: theme.palette.primary["main"],
    boxShadow: theme.shadows[3],
    margin: 0,
    padding: "5px 8px",
  },
}));

function FollowCardTwo({
  handle,
  fullName,
  imageUrl,
  coverPhoto,
  index,
  style = {},
  noBorder,
  variant,
  size,
}) {
  const classes = useStyles({ size, variant });

  const dispatch = useDispatch();
  // const friends = useSelector(state => state.user.data.friends);
  const [value, setValue] = useState("Follow");

  const handleFollowReq = () => {
    return new Promise((res, rej) => {
      if (value.toLowerCase() === "follow") {
        setValue("Unfollow");
        axios
          .post("/user/followrequest", { friend: handle })
          .then(() => {
            return dispatch(addFriend(handle));
          })
          .then(() => res());
      } else {
        setValue("Follow");
        axios
          .post("/user/unfollowrequest", { friend: handle })
          .then(() => {
            return dispatch(removeFriend(handle));
          })
          .then(() => res());
      }
    });
  };
  return (
    <Grid container className={classes.root} style={style}>
      <Header classes={classes} i={index} />
      <CoverPhoto coverPhoto={coverPhoto} classes={classes} />

      <Grid
        container
        style={{
          padding: 8,
          border: noBorder ? "none" : `1.2px solid #e0e0e0`,
          borderRadius: "3px",
        }}>
        <ProfilePic imageUrl={imageUrl} classes={classes} />
        <UserInfo handle={handle} fullName={fullName} classes={classes} />

        <FollowButton
          value={value}
          handleFollow={handleFollowReq}
          classes={classes}
          i={index}
        />
      </Grid>
    </Grid>
  );
}

export default FollowCardTwo;

const Header = ({ classes, i }) => {
  const dispatch = useDispatch();
  return (
    <Grid container style={{ position: "absolute", zIndex: 1 }}>
      <div style={{ flexGrow: 1 }}></div>
      <Grid item>
        <IconButton
          style={{
            padding: "6px 4px",
          }}
          onClick={() => {
            dispatch(popUserSuggest(i));
          }}>
          <ClearIcon className={classes.header} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

const CoverPhoto = ({ coverPhoto, classes }) => {
  return (
    <Grid
      container
      item
      justify="center"
      alignItems="center"
      className={classes.cover_root}>
      {coverPhoto ? (
        <>
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: 20,
              top: 0,
              background: "linear-gradient(180deg, #000, transparent)",
            }}></div>
          <img
            src={coverPhoto}
            alt="A coverPhoto"
            className={classes.cover_img}
          />
        </>
      ) : (
        <Typography variant="body1" component="span" style={{ color: "#fff" }}>
          A Cover Photo
        </Typography>
      )}
    </Grid>
  );
};

const ProfilePic = ({ imageUrl, classes }) => {
  return (
    <Grid container item className={classes.profile_root} justify="center">
      <Avatar src={imageUrl} className={classes.profile_avatar} />
    </Grid>
  );
};

const UserInfo = ({ handle, fullName, classes }) => {
  return (
    <Grid container item className={classes.userInfo_root}>
      <Grid container item justify="center">
        <Link to={handle}>
          <Typography
            className={classes.channelUserName}
            color="textPrimary"
            variant="body2">
            {fullName}
          </Typography>
        </Link>
      </Grid>
      <Grid container item justify="center">
        <Link to={handle}>
          <Typography color="textSecondary" variant="caption">
            {handle}
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );
};

const FollowButton = ({ classes, value, handleFollow, i }) => {
  const dispatch = useDispatch();

  return (
    <div className={classes.btnContainer}>
      <IconButton
        component="span"
        style={{ padding: 0, width: "100%" }}
        onClick={() => {
          handleFollow().then(() => dispatch(popUserSuggest(i)));
        }}>
        <button className={classes.btn}>{value}</button>
      </IconButton>
    </div>
  );
};
