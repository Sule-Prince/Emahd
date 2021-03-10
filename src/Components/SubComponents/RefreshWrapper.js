import React, { useState, useEffect, useRef } from "react";
import { Grid, makeStyles } from "@material-ui/core";

import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: "auto",
    minHeight: "100vh",
    position: "relative",
    zIndex: 1,
    marginTop: 5,
    width: "100%",
    backgroundColor: "#f9f9f9",
  },
  positionFIx: {
    height: 70,
    width: "100vw",
  },
}));

function RefreshWrapper({ rootRef, children, onRefresh }) {
  const classes = useStyles();
  const [dragLen, setDragLen] = useState(0);
  const [load, setLoad] = useState(false);
  const [dragEnd, setDragEnd] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(true);
  const [drag, setDrag] = useState(false);

  const dragRef = useRef(null);

  useEffect(() => {
    const dragEl = dragRef.current;
    const observeConfig = {
      root: rootRef ? rootRef.current : null,
    };

    const mediaObserver = new IntersectionObserver(
      observeElement,
      observeConfig
    );

    mediaObserver.observe(dragEl);

    function observeElement(entry) {
      entry = entry[0];

      if (entry.intersectionRatio !== 1) {
        setDrag(false);

        return;
      }
      setDrag(true);
    }

    return () => {
      mediaObserver.unobserve(dragEl);
    };

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!load || !shouldRefresh) return;
    setShouldRefresh(false);

    onRefresh()
      .then(() => {
        setDragEnd(false);
        setLoad(false);
      })
      .catch(() => {
        setDragEnd(false);
        setLoad(false);
      });
    setTimeout(() => {
      setShouldRefresh(true);
    }, 2000);
  }, [load, shouldRefresh, onRefresh]);

  return (
    <>
      <div
        style={{
          height: 50,
          position: "absolute",
          width: "100%",
          zIndex: 0,
        }}>
        <LoadingAnimation loading={load} />
      </div>

      <motion.div
        className={classes.root}
        ref={rootRef}
        animate={{
          y: dragEnd && load && 50,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
        }}
        drag={!dragEnd && drag && "y"}
        dragConstraints={{ left: 0, right: 0, bottom: 0, top: 0 }}
        dragElastic={0.3}
        onDragStart={(event, info) => {
          setDragLen(info.point.y);
        }}
        onDrag={(event, info) => {
          if (info.point.y - dragLen > 115 && !load) {
            setLoad(true);
          }
        }}
        onDragEnd={(event, info) => {
          setDragEnd(true);
        }}>
        <div ref={dragRef}></div>
        {children}
      </motion.div>
    </>
  );
}

export default RefreshWrapper;

const LoadingAnimation = ({ loading }) => {
  const radius = useState(28)[0];
  return (
    <div
      style={{
        padding: "15px 0px",
      }}>
      <Grid container justify="center">
        {loading ? (
          <div
            style={{
              width: radius,
              height: radius,
              borderRadius: "50%",
              border: "1px solid #f3f3f3",
              borderTop: "2px solid #999",
              animation: "spin 2s linear infinite",
            }}></div>
        ) : (
          <div
            style={{
              width: radius,
              height: radius,
              borderRadius: "50%",
              position: "absolute",
              border: "2px solid #e0e1e1",
            }}></div>
        )}
      </Grid>
    </div>
  );
};
