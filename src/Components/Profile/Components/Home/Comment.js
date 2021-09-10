import React from "react";

import { useSelector } from "react-redux";

import { Grid, Typography, Avatar, makeStyles } from "@material-ui/core";

import { Link } from "react-router-dom";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 1, 1, 0),
  },
  avatarGrid: {
    padding: " 4px 12px 8px",
    "& > *": {
      height: 35,
      width: 35,
    },
  },
  handle: {
    fontWeight: "bold",
    marginRight: 6,
    "& > *": {
      color: "#000",
    },
  },
}));

const Comment = ({
  data: { comment, createdAt, handle, imageUrl, userId },
}) => {
  dayjs.extend(updateLocale);
  dayjs.extend(relativeTime);
  dayjs.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "%ds",
      m: "one min",
      mm: "%dmin",
      h: "1h",
      hh: "%dh",
      d: "1d",
      dd: "%dd",
      M: "1m",
      MM: "%dm",
      y: "1y",
      yy: "%dy",
    },
  });

  const classes = useStyles();

  const personalizedHandle = useSelector((state) => {
    if (state.user.personalized[userId])
      return state.user.personalized[userId].handle;
    else return null;
  });

  return (
    <Grid container style={{ flexWrap: "nowrap", paddingRight: 6 }}>
      <Grid className={classes.avatarGrid} item>
        <Avatar src={imageUrl} />
      </Grid>
      <Grid item>
        <Typography
          variant="body2"
          className={classes.handle}
          gutterBottom={true}
          component="span">
          <Link to={`/user/${handle}`}>{personalizedHandle || handle}</Link>
        </Typography>
        <Typography variant="body2" color="textPrimary" component="span">
          {comment}
        </Typography>
        <Typography variant="caption" color="textSecondary" component="div">
          {dayjs(createdAt).fromNow()}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Comment;
