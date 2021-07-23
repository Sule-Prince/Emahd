import React from "react";

import { Typography } from "@material-ui/core";

const RecordTimer = ({ min, sec, ...props }) => {
  return (
    <Typography align="center" variant="body1" component="span">
      {`${min} : ${sec}`}
    </Typography>
  );
};

export default RecordTimer;
