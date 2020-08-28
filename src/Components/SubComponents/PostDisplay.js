import React, { useState } from "react";
import { Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import UserInfo from "./UserInfo";

// Icons
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";
import FavoriteBorderSharpIcon from "@material-ui/icons/FavoriteBorderSharp";
import FavoriteSharpIcon from "@material-ui/icons/FavoriteSharp";
import ChatBubbleOutlineSharpIcon from "@material-ui/icons/ChatBubbleOutlineSharp";

// Variables

const changeDisplayIcon = (ev, state, setState) => {
  if (state === false) {
    setState(!state);
  } else {
    setState(!state);
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(1),
    borderTop: `1px solid ${theme.palette.grey[400]}`,
  },
  postMedia: {
    width: "100vw",
    height: "80vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

const PostDisplay = ({ userData }) => {
  const classes = useStyles();
  return (
    <div>
      <Grid className={classes.root} container direction="column">
        <Grid container item>
          <div style={{ flexGrow: 1 }}>
            <UserInfo userData={userData} />
          </div>
          <IconButton>
            <MoreVertRoundedIcon />
          </IconButton>
        </Grid>
        <Grid container item>
          <MediaConatiner userData={userData} classes={classes} />
        </Grid>
        <ReactionBar />
        <Typography variant="caption" > Guy Howfa you na me i no sabi you again ohh...</Typography>
      </Grid>
    </div>
  );
};

export default PostDisplay;

const MediaConatiner = ({ classes, userData }) => {
  return (
    <Grid container item>
      <Grid item>
        <img
          className={classes.postMedia}
          src={userData.postMedia}
          alt="post media"
        />
      </Grid>
    </Grid>
  );
};

const ReactionBar = () => {
 
  const [favouriteIcon, setFavouriteIcon] = useState(false);
 
  return (
    <Grid container justify="space-around" item>
      <Grid item>
        <IconButton
          onClick={(e) => {
            changeDisplayIcon(e, favouriteIcon, setFavouriteIcon);
          }}
        >
          {favouriteIcon ? (
            <FavoriteSharpIcon fontSize="small" style={{ color: "#f00" }} />
          ) : (
            <FavoriteBorderSharpIcon fontSize="small" />
          )}
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton>
          <ChatBubbleOutlineSharpIcon fontSize="small" />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton>
            <ShareOutlinedIcon fontSize="small" />
        </IconButton>
      </Grid>
    </Grid>
  );
};
