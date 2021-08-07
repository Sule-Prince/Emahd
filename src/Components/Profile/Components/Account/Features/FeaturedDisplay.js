import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, CardActionArea, makeStyles } from "@material-ui/core";
import FeaturedCard from "./FeaturedCard";
import { useSelector } from "react-redux";
import { Header, DisplayStories } from "../../../../SubComponents";

import MoreOptions from "./MoreOptions";
import AddFeaturePost from "./AddFeaturePost";

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
  const [height, setHeight] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [metaData, setMetaData] = useState({
    featureName: "",
    imageUrl: "",
    handle: "",
    featureId: "",
  });
  const [openViewFeature, setOpenViewFeature] = useState(false);
  const [openAddFeature, setOpenAddFeature] = useState(false);

  const dummyRef = useRef();

  const featured = useSelector((state) => state.extra.featured.feature);
  const featuredData = useSelector((state) => state.extra.featured.data);

  const openMoreOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    const { width } = dummyRef.current.getBoundingClientRect();
    setHeight(width * 1.25);
  }, []);

  const classes = useStyles();
  return (
    <>
      <Box
        bgcolor="background.paper"
        width="100vw"
        height="100vh"
        position="fixed"
        overflow="hidden auto"
        top={0}
        zIndex="drawer">
        {openAddFeature && (
          <AddFeaturePost
            setDisplay={setOpenAddFeature}
            featureId={metaData.featureId}
          />
        )}
        {openViewFeature && (
          <DisplayStories
            style={{
              width: "100%",
              height: "100%",
              top: 0,
              zIndex: 1200,
              position: "fixed",
            }}
            handle={metaData.handle}
            imageUrl={metaData.imageUrl}
            stories={featuredData[metaData.featureId]}
            setDisplay={setOpenViewFeature}
          />
        )}
        <MoreOptions
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          featureId={metaData.featureId}
          viewFeature={() => {
            if (
              !featuredData[metaData.featureId] ||
              featuredData[metaData.featureId].length <= 0
            ) {
              setOpenAddFeature(true);
              return;
            }
            setOpenViewFeature(true);
          }}
          setOpenAddFeature={setOpenAddFeature}
        />

        <Header data="Featured" sticky setDisplay={setDisplay} />
        <Grid container className={classes.featuredRoot}>
          {featured.map((featured) => (
            <Grid key={featured.createdAt} item xs={6} sm={4}>
              <CardActionArea
                onClick={() => {
                  setMetaData({
                    handle: featured.handle,
                    featureName: featured.featureName,
                    imageUrl: featured.imageUrl,
                    featureId: featured.id,
                  });
                  if (
                    !featuredData[featured.id] ||
                    featuredData[featured.id].length <= 0
                  ) {
                    setOpenAddFeature(true);
                    return;
                  }
                  setOpenViewFeature(true);
                }}>
                <div
                  style={{
                    width: "100%",
                    height,
                  }}>
                  <FeaturedCard
                    thumb={featured.thumb ? featured.thumb : featured.imageUrl}
                    src={featured.imageUrl}
                    featureName={featured.featureName}
                    moreOptions={{
                      onClick: (e) => {
                        e.stopPropagation();
                        openMoreOptions(e);
                        setMetaData({
                          handle: featured.handle,
                          featureName: featured.featureName,
                          imageUrl: featured.imageUrl,
                          featureId: featured.id,
                        });
                      },
                    }}
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
    </>
  );
}

export default FeaturedDisplay;
