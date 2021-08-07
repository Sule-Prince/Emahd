import React from "react";
import {
  Paper,
  CardMedia,
  Avatar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { MoreVertical } from "../../../../SubComponents";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 12,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    position: "relative",
  },
  media: {
    height: "100%",
  },
  moreVert: {
    top: 8,
    right: 10,
    position: "absolute",
  },
  avatar: {
    width: 35,
    height: 35,
    top: 10,
    left: 10,
    position: "absolute",
    border: "2px solid #bdbdbd",
  },
  featureNameRoot: {
    width: "100%",
    padding: 10,
    left: 0,
    bottom: 0,
    position: "absolute",
    background: "linear-gradient(transparent, rgba(0, 0, 0, .5))",
  },
  featureName: {
    color: "#fff",
    fontWeight: "bold",
  },
}));
function FeaturedCard({ src, thumb, featureName, moreOptions, ...props }) {
  const classes = useStyles();

  return (
    <Paper elevation={5} className={classes.root} {...props}>
      <CardMedia image={src} className={classes.media} />
      <MoreVertical className={classes.moreVert} {...moreOptions} />
      <ThumbAvatar thumb={thumb} classes={classes} />
      <FeatureName featureName={featureName} classes={classes} />
    </Paper>
  );
}

export default FeaturedCard;

const ThumbAvatar = ({ thumb, classes }) => {
  return <Avatar src={thumb} className={classes.avatar} />;
};

const FeatureName = ({ featureName, classes }) => {
  return (
    <div className={classes.featureNameRoot}>
      <Typography variant="caption" className={classes.featureName}>
        {featureName}
      </Typography>
    </div>
  );
};
