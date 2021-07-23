import React from "react";
import { Typography, Grid, IconButton, Avatar } from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import { useStyles } from "../Profile/Components/Account/styles";
import HeaderBase from "./HeaderBase";

const Header = ({ setDisplay, data, imageUrl, ...props }) => {
  const classes = useStyles();

  const handleCancelButton = () => {
    setDisplay(false);
  };
  return (
    <>
      <HeaderBase style={{ zIndex: 1, position: "absolute" }} {...props}>
        <Grid className={classes.headerRoot} container>
          <Grid
            style={{ display: "flex", alignItems: "center" }}
            item
            className={classes.headerNameContainer}>
            <Grid item>
              <IconButton
                color="primary"
                onClick={handleCancelButton}
                style={{ marginRight: 5, marginLeft: "-1rem" }}>
                <CloseIcon />
              </IconButton>
            </Grid>

            <Grid item>
              <Typography
                className={classes.headerName}
                variant="body1"
                component="span">
                {data}
              </Typography>
            </Grid>
          </Grid>
          {imageUrl && (
            <Grid item style={{ marginRight: 10 }}>
              <Avatar src={imageUrl} style={{ height: 35, width: 35 }} />
            </Grid>
          )}
        </Grid>
      </HeaderBase>
      <div
        style={{
          height: "calc(40px + 1.6vmin)",
          width: "100%",
        }}></div>
    </>
  );
};

export default Header;
