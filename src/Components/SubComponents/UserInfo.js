import React from "react";
import { Avatar, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
  },
  avatar: {
    height: "40px",
    width: "50px",
    display: "inline-block",
  },
  text: {
    display: "inline-block",
    paddingLeft: "5px",
  },
  userData: {
      height: "1rem"
  }
}));
const UserInfo = ({ userData }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.avatar}>
        <Avatar
        style={{width:"35px", height:"35px"}}
        // src={}
        />
      </div>
      <div className={classes.text}>
        <div className={classes.userData}>
          <Typography style={{ fontWeight: "bold" }} variant="caption">
            {/* {userData.name} */}
            Sule Prince
          </Typography>
        </div>
        <div className={classes.userData}>
          <Typography variant="caption">
          {/* {userData.extra} */}
          @_savage.kvng
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
