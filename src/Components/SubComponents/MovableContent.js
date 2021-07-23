import { makeStyles } from "@material-ui/core";
import fitty from "fitty";
import React, { useRef, useEffect } from "react";

const useStyles = makeStyles({
  root: {
    whiteSpace: "normal !important",
    display: "inline-block",
  },
});
function MovableContent() {
  const movableRef = useRef(null);

  const classes = useStyles();
  useEffect(() => {
    fitty(movableRef.current, {
      minSize: 4,
      maxSize: 35,
      multiLine: true,
    });

    // eslint-disable-next-line
  }, []);
  return (
    <div className={classes.root} ref={movableRef} contentEditable>
      Hello
    </div>
  );
}

export default MovableContent;
