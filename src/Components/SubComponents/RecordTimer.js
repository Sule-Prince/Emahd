import React, { useEffect } from "react";

import { Typography } from "@material-ui/core";

const RecordTimer = ({ timer, setTimer, ...props }) => {
  useEffect(() => {
    if (timer.sec === 60) {
      setTimer((prev) => ({
        ...prev,
        sec: 0,
        min: (prev.min += 1),
      }));
    }
  }, [timer, setTimer]);

  return (
    <Typography align="center" variant="body1" component="span">
      {`${timer.min
        .toString()
        .padStart(2, 0)} : ${timer.sec.toString().padStart(2, 0)}`}
    </Typography>
  );
};

export default RecordTimer;
