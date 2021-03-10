import React from "react";
import { Paper } from "@material-ui/core";

const HeaderBase = ({ style, children, elevation }) => {
  style = style || {};
  return (
    <div style={{ width: "100%", ...style }}>
      <Paper
        square
        elevation={elevation || 1}
        style={{ height: "calc(40px + 1.6vmin)" }}>
        {children}
      </Paper>
    </div>
  );
};

export default HeaderBase;
