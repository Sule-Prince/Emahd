import React, { useState, useEffect, useRef } from "react";
import { Grid, makeStyles } from "@material-ui/core";

import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    maxHeight: "100%",
    overflowY: "auto",
    position: "relative",
    zIndex: 1,
    width: "100%",
    backgroundColor: "#f9f9f9",
  },
  positionFIx: {
    height: 70,
    width: "100vw",
  },
}));

function RefreshWrapper({ children, onRefresh, style = {} }) {
  const classes = useStyles();
  const [dragLen, setDragLen] = useState(0);
  const [load, setLoad] = useState(false);
  const [dragEnd, setDragEnd] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(true);
  const [drag, setDrag] = useState(true);

  const motionRef = useRef(null);

  useEffect(() => {
    motionRef.current.scrollTop = 5;
  }, []);

  useEffect(() => {
    if (!load || !shouldRefresh) return;
    setShouldRefresh(false);

    const motionEl = motionRef.current;

    onRefresh()
      .then(() => {
        setDragEnd(false);
        setLoad(false);

        setTimeout(() => {
          setShouldRefresh(true);
        }, 2000);

        if (motionEl.scrollTop === 0) {
          setTimeout(() => {
            setDrag(false);
            motionEl.scrollTop = 5;
          }, 3000);
        }
      })
      .catch(() => {
        setDragEnd(false);
        setLoad(false);

        setTimeout(() => {
          setShouldRefresh(true);
        }, 2000);

        if (motionEl.scrollTop === 0) {
          setTimeout(() => {
            setDrag(false);
            motionEl.scrollTop = 5;
          }, 3000);
        }
      });
  }, [load, shouldRefresh, onRefresh]);

  return (
    <div style={{ position: "relative", height: "100%" }}>
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
        ref={motionRef}
        className={classes.root}
        onScroll={(e) => {
          if (motionRef.current.scrollTop === 0) {
            const motionEl = motionRef.current;

            setDrag(true);

            setTimeout(() => {
              if (load) return;

              setDrag(false);
              motionEl.scrollTop = 5;
            }, 2000);
          } else setDrag(false);
        }}
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
          event.preventDefault();
          setDragLen(info.point.y);
        }}
        onDrag={(event, info) => {
          event.preventDefault();

          if (info.point.y - dragLen > 115 && !load) {
            setLoad(true);
          }
        }}
        onDragEnd={(event, info) => {
          if (!load) return;
          setDragEnd(true);
          // setShouldRefresh(true);
        }}>
        {children}
      </motion.div>
    </div>
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
