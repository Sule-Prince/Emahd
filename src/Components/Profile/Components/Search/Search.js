import React, { useState } from "react";
import {
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";

import SearchBar from "../../../SubComponents/SearchBar";
import UserInfoButton from "../../../SubComponents/UserInfoButton";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
  },
  searchBar: {
    padding: "5px 5px",
  },
}));

const Search = () => {
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");

  const { isLoading, data: searchResult } = useSelector(
    (state) => state.search
  );
  return (
    <div className={classes.root}>
      <div className={classes.searchBar}>
        <SearchBar
          setSearchText={setSearchText}
          searchText={searchText}
          loading={isLoading}
        />
      </div>
      <div style={{ position: "absolute", overflowY: "auto", height: "90%" }}>
        <Grid container>
          {searchResult.length === 0 && (
            <Grid
              container
              alignItems="center"
              justify="center"
              direction="column"
              style={{
                height: "calc(90vh - 70px)",
                padding: "0px 12px",
              }}>
              {!isLoading && (
                <>
                  <span>
                    <SearchIcon
                      style={{ height: 80, width: 80 }}
                      color="action"
                    />
                  </span>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: "bold" }}
                    align="center"
                    color="textSecondary">
                    Search and connect with loved ones on Emahd
                  </Typography>
                </>
              )}
              {isLoading && (
                <div style={{ margin: "auto" }}>
                  <CircularProgress thickness={6} />
                </div>
              )}
            </Grid>
          )}
          {searchResult.length > 0 &&
            searchResult.map((data) => {
              return (
                <Grid
                  key={data.result.userId}
                  item
                  xs={12}
                  style={{ height: 68 }}>
                  <Link
                    to={`/user/${data.result.handle}`}
                    style={{ color: "#555" }}>
                    <UserInfoButton
                      imageUrl={data.result.imageUrl}
                      header={data.result.handle}
                      subheader={data.result.fullName}
                    />
                  </Link>
                </Grid>
              );
            })}
        </Grid>
        <div className="positionFix"></div>
      </div>
    </div>
  );
};

export default Search;
