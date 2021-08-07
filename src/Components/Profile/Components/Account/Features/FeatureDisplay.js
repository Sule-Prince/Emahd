import React from "react";

import { Grid, Typography, IconButton, Avatar } from "@material-ui/core";

const FeatureDisplay = ({
  imageUrl,
  featureName,
  classes,
  avatarProps,
  ...props
}) => {
  return (
    <div {...props}>
      <Grid container className={classes.featureWrapper}>
        <Grid container item justify="center" xs={12}>
          <IconButton size="small" {...avatarProps}>
            <Avatar className={classes.featureAvatar} src={imageUrl} />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="caption"
            component="p"
            style={{
              paddingRight: 8,
              paddingLeft: 4,
              fontWeight: 500,
              textAlign: "center",
              overflow: "hidden",
              fontSize: ".7rem",
              textOverflow: "ellipsis",
            }}>
            {featureName}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default FeatureDisplay;
