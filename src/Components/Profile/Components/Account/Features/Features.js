import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Grid,
  Typography,
  Button,
  TextField,
  Box,
  Avatar,
  IconButton,
  Badge,
  makeStyles,
  ButtonBase,
} from "@material-ui/core";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";

import { PulseLoader } from "react-spinners";

import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";

import Header from "../../../../SubComponents/Header";
import SearchBar from "../../../../SubComponents/SearchBar";
import UserInfoButton from "../../../../SubComponents/UserInfoButton";
import { axios } from "../../../../../config/axiosConfig";
import useStoreImage from "../../../../../utils/customHooks/useStoreImage";
import {
  closeSnackBar,
  openSnackBar,
} from "../../../../../redux/userActionsSlice";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 80,
    width: 80,
    maxHeight: 100,
    maxWidth: 100,
    border: "2px solid #fff",
  },
  contentWrapper: {
    overflowY: "auto",
    maxHeight: "80vh",
    "& > *": {
      padding: theme.spacing(1),
    },
  },
  nameWrapper: {},
  searchWrapper: {},
}));

const searchResultKey = Math.floor(Math.random() * 10000);
const btnKey = Math.floor(Math.random() * 10000);

function Features({ setDisplay }) {
  const [featureName, setFeatureName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [userData, setUserData] = useState([]);

  const storeImage = useStoreImage();
  const dispatch = useDispatch();

  const getThumbnail = (e) => {
    const file = e.target.files[0];
    if (imageUrl) URL.revokeObjectURL(imageUrl);

    if (!file) return;
    e.target.value = "";
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const uploadFeature = () => {
    dispatch(openSnackBar({ message: "Uploading Feature", loading: true }));
    storeImage(imageUrl, {
      size: 100,
    })
      .then((downloadUrl) => {
        const data = {
          featureName,
          handle: userData[0].handle,
          userId: userData[0].userId,
          imageUrl: downloadUrl,
          createdAt: Date.now(),
        };

        return axios.post(`extra/feature`, data);
      })
      .then(() => {
        dispatch(closeSnackBar());
        dispatch(
          openSnackBar({
            message: "Feature uploaded successfully!",
            duration: 3000,
          })
        );
        setDisplay(false);
      })
      .catch((error) => {
        dispatch(closeSnackBar());
        dispatch(
          openSnackBar({
            message: `Something went wrong, please try again later!`,
            duration: 3000,
            type: "error",
          })
        );
      });
  };

  const classes = useStyles();

  return (
    <Box
      width="100%"
      zIndex="drawer"
      position="absolute"
      top="0px"
      height="100%"
      bgcolor="background.paper">
      <motion.div
        initial={{ y: "100vh" }}
        animate={{ y: 0 }}
        exit={{ y: "100vh" }}>
        <Header data="Feature" setDisplay={setDisplay} />

        <Grid container className={classes.contentWrapper}>
          <Thumbnail
            classes={classes}
            getThumbnail={getThumbnail}
            imageUrl={imageUrl}
          />

          <FeatureName
            featureName={featureName}
            setFeatureName={setFeatureName}
            classes={classes}
          />

          <UserSearch classes={classes} setData={setUserData} />
          <AnimateSharedLayout>
            <AnimatePresence initial={false}>
              {userData.length > 0 && (
                <SearchResult data={userData[0]} setData={setUserData} />
              )}
            </AnimatePresence>
            <ConfirmButton uploadFeature={uploadFeature} />
          </AnimateSharedLayout>
        </Grid>
      </motion.div>
    </Box>
  );
}

export default React.memo(Features);

const Thumbnail = ({ classes, imageUrl, getThumbnail }) => {
  return (
    <Grid container justify="center" item xs={12}>
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        badgeContent={
          <label htmlFor={"thumbnail"}>
            <AddCircleRoundedIcon fontSize="small" color="primary" />
          </label>
        }>
        <div
          style={{
            position: "relative",
          }}>
          <label htmlFor={"thumbnail"}>
            <IconButton color="primary" component="span" size="small">
              <Avatar className={classes.avatar} src={imageUrl}></Avatar>
            </IconButton>
          </label>
        </div>
        <input
          type="file"
          id="thumbnail"
          accept="image/*"
          style={{ display: "none" }}
          onChange={getThumbnail}
        />
      </Badge>
    </Grid>
  );
};

const FeatureName = ({ featureName, setFeatureName, classes }) => {
  return (
    <Grid container item xs={12} className={classes.nameWrapper}>
      <TextField
        label="Feature Name"
        placeholder="Name of feature"
        value={featureName}
        onChange={(e) => {
          const value = e.target.value;
          if (value.length > 16) return;
          setFeatureName(value);
        }}
        fullWidth
      />
      <Typography align="center" variant="caption">
        Name for this instance of feature
      </Typography>
    </Grid>
  );
};

const UserSearch = ({ classes, setData }) => {
  const [display, setDisplay] = useState(false);
  return (
    <>
      <Grid
        container
        item
        xs={12}
        justify="center"
        className={classes.searchWrapper}>
        {display && <Search setDisplay={setDisplay} setData={setData} />}
        <ButtonBase style={{ width: "100%" }}>
          <Grid
            container
            style={{
              borderBottom: "1px solid #999",
              padding: "3px 8px",
              textAlign: "left",
            }}
            onClick={() => setDisplay(true)}>
            <SearchRoundedIcon color="primary" />
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ marginLeft: 8 }}>
              Search...
            </Typography>
          </Grid>
        </ButtonBase>
        <Grid item xs={12}>
          <Typography variant="caption">
            Name or handle of user you wish to link this instance of feature
            with
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

const Search = ({ setDisplay, setData }) => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const { data: searchResult } = useSelector((state) => state.search);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        minHeight: "100vh",
        zIndex: 100,
        backgroundColor: "#f9f9f9",
      }}>
      <Header data="Search" setDisplay={setDisplay} />
      <Box padding="6px" paddingBottom="12px">
        <SearchBar
          setLoading={setIsloading}
          setSearchText={setSearchText}
          searchText={searchText}
          loading={isLoading}
        />
      </Box>
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{
          position: "absolute",
          zIndex: 1,
          marginTop: -10,
        }}>
        <PulseLoader color="#2196f3" loading={isLoading} size={8} margin={6} />
      </Grid>
      <div style={{ position: "absolute", overflowY: "auto" }}>
        <Grid container style={{ position: "relative" }}>
          {searchResult.length > 0 &&
            searchResult.map((data) => {
              return (
                <Grid
                  key={data.result.userId}
                  item
                  xs={12}
                  style={{ height: 68 }}>
                  <UserInfoButton
                    onClick={() => {
                      setData([data.result]);
                      setDisplay(false);
                    }}
                    imageUrl={data.result.imageUrl}
                    header={data.result.handle}
                    subheader={data.result.fullName}
                  />
                </Grid>
              );
            })}
        </Grid>
      </div>
    </div>
  );
};

const SearchResult = ({ data, setData }) => {
  return (
    <motion.div
      style={{ width: "100%" }}
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      layoutId={searchResultKey}
      exit={{
        scale: 0.5,
        opacity: 0,
        transition: { duration: 0.3 },
      }}>
      <Grid container alignItems="center">
        <Grid item>
          <IconButton onClick={() => setData([])}>
            <CancelRoundedIcon fontSize="small" />
          </IconButton>
        </Grid>
        <Grid item style={{ backgroundColor: "#ececec" }} xs>
          <UserInfoButton
            imageUrl={data.imageUrl}
            header={data.handle}
            subheader={data.fullName}
          />
        </Grid>
      </Grid>
    </motion.div>
  );
};

const ConfirmButton = ({ uploadFeature }) => {
  return (
    <motion.div
      layout
      layoutId={btnKey}
      transition={{
        duration: 0.4,
      }}
      style={{
        width: "100%",
      }}>
      <Grid container>
        <Button
          color="primary"
          variant="contained"
          style={{
            width: "100%",
          }}
          onClick={uploadFeature}>
          Confirm
        </Button>
      </Grid>
    </motion.div>
  );
};
