import React, { useState } from "react";
import { Popover, Paper, MenuList, MenuItem } from "@material-ui/core";
import useStyles from "../../../../styles";

const MoreOptions = ({
  setAnchorEl,
  anchorEl,
  featureId,
  viewFeature,
  setOpenAddFeature,
}) => {
  const handleClose = () => {
    setAnchorEl(null);
  };

  const addFeatureHandler = () => {
    setOpenAddFeature(true);
    handleClose();
  };

  const viewFeatureHandler = () => {
    viewFeature();
    handleClose();
  };

  const open = Boolean(anchorEl);

  const classes = useStyles();

  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}>
        <Paper>
          <MenuList className={classes.menuList}>
            <MenuItem onClick={addFeatureHandler}>Add Feature Post</MenuItem>
            <MenuItem onClick={() => {}}>Delete Feature</MenuItem>
            <MenuItem onClick={viewFeatureHandler}>View Feature Posts</MenuItem>
          </MenuList>
        </Paper>
      </Popover>
    </>
  );
};

export default MoreOptions;
