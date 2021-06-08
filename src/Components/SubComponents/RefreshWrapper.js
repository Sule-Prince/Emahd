import React from "react";

import PullToRefresh from "react-simple-pull-to-refresh";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

function RefreshWrapper({ children, onRefresh }) {
  return (
    <PullToRefresh
      onRefresh={onRefresh}
      pullingContent={
        <div
          style={{
            display: "flex",
            paddingTop: 8,
            justifyContent: "center",
          }}>
          <ArrowDownwardIcon />
        </div>
      }>
      {children}
    </PullToRefresh>
  );
}

export default RefreshWrapper;
