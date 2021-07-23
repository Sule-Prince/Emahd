import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, CardActionArea, makeStyles } from "@material-ui/core";
import FeaturedCard from "./FeaturedCard";
import { useSelector } from "react-redux";
import { Header } from "../../../../SubComponents";

const useStyles = makeStyles((theme) => ({
  featuredRoot: {
    padding: theme.spacing(1, 0),
    position: "relative",
    "& > *": {
      padding: theme.spacing(1),
    },
  },
}));
function FeaturedDisplay({ setDisplay }) {
  const [height, setHeight] = useState();

  const dummyRef = useRef();

  const featured = useSelector((state) => state.extra.featured.data);

  useEffect(() => {
    const { width } = dummyRef.current.getBoundingClientRect();
    setHeight(width * 1.25);
  }, []);

  const classes = useStyles();
  return (
    <Box
      bgcolor="background.paper"
      width="100vw"
      height="100vh"
      position="fixed"
      top={0}
      zIndex="drawer">
      <Header data="Featured" setDisplay={setDisplay} />
      <Grid container className={classes.featuredRoot}>
        {featured.map((featured) => (
          <Grid key={featured.createdAt} item xs={6} sm={4}>
            <CardActionArea>
              <div
                style={{
                  width: "100%",
                  height,
                }}>
                <FeaturedCard
                  thumb={featured.thumb ? featured.thumb : featured.imageUrl}
                  src={featured.imageUrl}
                  featureName={featured.featureName}
                />
              </div>
            </CardActionArea>
          </Grid>
        ))}

        <Grid
          item
          xs={6}
          sm={4}
          style={{
            position: "relative",
            zIndex: -1000,
            opacity: 0,
          }}>
          <div
            ref={dummyRef}
            style={{
              width: "100%",
            }}></div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FeaturedDisplay;
