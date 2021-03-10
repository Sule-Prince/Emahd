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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "calc(220px + 2vw)",
    border: `1.2px solid ${theme.palette.grey[300]}`,
    paddingTop: 4,
    padding: theme.spacing(1),
    margin: theme.spacing(2.5),
    borderRadius: "3px",
  },
  header: {
    color: theme.palette.grey[400],
    height: "15px",
  },
  cover_root: {
    marginTop: 4,
    width: "100%",
    height: 120,
    background:
      "linear-gradient(360deg, #3f51b5 0%, #2196f3 75%, #64b5f6 100%)",
  },
  cover_img: {
    width: "100%",
    height: 120,
    objectFit: "cover",
  },
  profile_root: {
    height: "auto",
    width: "100%",
    marginTop: -35,
  },
  profile_avatar: {
    height: theme.spacing(11),
    width: theme.spacing(11),
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

function FollowCardTwo({ handle, fullName, imageUrl, coverPhoto }) {
  const classes = useStyles();

  const dispatch = useDispatch();
  // const friends = useSelector(state => state.user.data.friends);
  const [value, setValue] = useState("Follow");

  const handleFollowReq = () => {
    if (value.toLowerCase() === "follow") {
      axios.post("/user/followrequest", { friend: handle }).then(() => {
        setValue("Unfollow");
        dispatch(addFriend(handle));
      });
    } else {
      axios.post("/user/unfollowrequest", { friend: handle }).then(() => {
        setValue("Follow");
        dispatch(removeFriend(handle));
      });
    }
  };
  return (
    <Grid container className={classes.root}>
      <Header classes={classes} />
      <CoverPhoto coverPhoto={coverPhoto} classes={classes} />
      <ProfilePic imageUrl={imageUrl} classes={classes} />
      <UserInfo handle={handle} fullName={fullName} classes={classes} />

      <FollowButton
        value={value}
        handleFollow={handleFollowReq}
        classes={classes}
      />
    </Grid>
  );
}

export default FollowCardTwo;

const Header = ({ classes }) => {
  return (
    <Grid container justify="flex-end">
      <Grid item>
        <ClearIcon className={classes.header} />
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
        <img
          src={coverPhoto}
          alt="A coverPhoto"
          className={classes.cover_img}
        />
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

const FollowButton = ({ classes, value, handleFollow }) => {
  return (
    <div className={classes.btnContainer}>
      <IconButton
        component="span"
        style={{ padding: 0, width: "100%" }}
        onClick={() => {
          handleFollow();
        }}>
        <button className={classes.btn}>{value}</button>
      </IconButton>
    </div>
  );
};
