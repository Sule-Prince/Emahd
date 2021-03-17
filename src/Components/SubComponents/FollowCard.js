import React, { useState } from "react";
import {
  Avatar,
  Grid,
  IconButton,
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
    border: `1.2px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(1),
    borderRadius: "3px",
    width: "calc(130px + 2vw)",
  },
  header: {
    color: theme.palette.grey[400],
    height: "15px",
  },
  photoContainer: {
    paddingBottom: theme.spacing(1),
  },
  channelPhoto: {
    height: theme.spacing(10),
    width: theme.spacing(10),
  },
  channelUserName: {
    fontWeight: theme.typography.fontWeightBold,
    maxWidth: "calc(120px - .3vw)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  channelName: {
    overflowX: "hidden",
    maxWidth: 120,
  },
  btnContainer: {
    paddingTop: "8px",
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
    padding: "3px 8px",
  },
}));

const FollowCard = ({ handle, fullName, imageUrl, index }) => {
  const classes = useStyles();

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
    <>
      <Grid
        container
        item
        className={classes.root}
        alignItems="center"
        justify="center"
        direction="column">
        <Header classes={classes} i={index} />
        <ChannelPhoto imageUrl={imageUrl} classes={classes} />
        <ChannelUserName
          fullName={fullName}
          handle={handle}
          classes={classes}
        />
        <ChannelName handle={handle} classes={classes} />
        <FollowButton
          classes={classes}
          handleFollow={handleFollowReq}
          value={value}
          i={index}
        />
      </Grid>
    </>
  );
};

export default FollowCard;

const Header = ({ classes, i }) => {
  const dispatch = useDispatch();
  return (
    <Grid container>
      <div style={{ flexGrow: 1 }}></div>
      <Grid item>
        <span
          style={{
            marginRight: -6,
          }}
          onClick={() => {
            dispatch(popUserSuggest(i));
          }}>
          <ClearIcon className={classes.header} />
        </span>
      </Grid>
    </Grid>
  );
};

const ChannelPhoto = ({ classes, imageUrl }) => {
  return (
    <div className={classes.photoContainer}>
      <Avatar className={classes.channelPhoto} src={imageUrl} />
    </div>
  );
};

const ChannelUserName = ({ classes, fullName, handle }) => {
  return (
    <Link to={handle}>
      <Typography
        className={classes.channelUserName}
        color="textPrimary"
        variant="body2">
        {fullName}
      </Typography>
    </Link>
  );
};
const ChannelName = ({ classes, handle }) => {
  return (
    <Link to={handle}>
      <Typography
        className={classes.channelName}
        color="textSecondary"
        component="p"
        variant="caption">
        {handle}
      </Typography>
    </Link>
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
