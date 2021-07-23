import React from "react";

import {
  CircularProgress,
  InputAdornment,
  Paper,
  InputBase,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { searchThunk } from "../../redux/searchResultSlice";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 0, 1, 0),
    "&:hover": {
      backgroundColor: fade("#eee", 0.9),
    },
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 1),
    "&:hover": {
      backgroundColor: fade("#eee", 0.9),
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    color: theme.palette.primary["main"],
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    display: "flex",
    flex: 1,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
  },
}));

let timeoutId;

export default function SearchBar({
  setSearchText,
  searchText,
  loading,
  setLoading,
  ...props
}) {
  const classes = useStyles();

  const dispatch = useDispatch();

  return (
    <>
      <Paper variation={2} className={classes.root} {...props}>
        <div className={classes.grow}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              value={searchText}
              onChange={(e) => {
                const text = e.target.value.trim();

                setSearchText(e.target.value);
                clearTimeout(timeoutId);
                if (text.length > 0) {
                  if (setLoading && typeof setLoading === "function")
                    setLoading(true);
                  timeoutId = setTimeout(() => {
                    dispatch(searchThunk(text.trim())).then(() => {
                      if (setLoading && typeof setLoading === "function")
                        setLoading(false);
                    });
                  }, 1000);
                }
              }}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              endAdornment={
                <InputAdornment>
                  {loading && (
                    <div>
                      <CircularProgress
                        color="primary"
                        thickness={5}
                        size={20}
                        style={{ marginRight: 10 }}
                      />
                    </div>
                  )}
                </InputAdornment>
              }
            />
          </div>
        </div>
      </Paper>
    </>
  );
}
