import React, { useState } from "react";

import { makeStyles, Grid, Button } from "@material-ui/core";

import Header from "../../../SubComponents/Header";
import { universities } from "../../../assets/universities";
import { courses } from "../../../assets/courses";
import MyInput from "../../../SubComponents/MyInput";
import { axios } from "../../../../config/axiosConfig";
import { useDispatch } from "react-redux";
import { openSnackBar } from "../../../../redux/userActionsSlice";
import { userDataThunk } from "../../../../redux/userDataSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100vw",
    backgroundColor: theme.palette.background.paper,
    zIndex: theme.zIndex.drawer,
    overflowY: "auto",
    transition: "all .5s cubic-bezier(0, .4, .6, 1)",
    position: "absolute",
    top: 0,
  },
  dataContainer: {
    marginBottom: 8,
  },
}));

const EdituserInfo = ({ setDisplay }) => {
  const [bio, setBio] = useState("");
  const [fullName, setFullName] = useState("");
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");

  const classes = useStyles();

  const dispatch = useDispatch();

  const editablesArray = [
    { data: "fullName", label: "Full Name", setData: setFullName },
    { data: "bio", label: "Bio", setData: setBio },

    { data: "university", label: "University", setData: setUniversity },
    { data: "course", label: "Course", setData: setCourse },
  ];

  const updateUserInfo = () => {
    const data = { bio, fullName, university, course };
    if (bio || fullName || university || course) {
      axios
        .post("/user/addbio", data)
        .then((res) => {
          dispatch(userDataThunk());
          dispatch(
            openSnackBar({
              duration: 4000,
              message: res.data.feedback,
            })
          );
        })
        .catch((error) => {
          if (error.response) {
            dispatch(
              openSnackBar({
                type: "error",
                duration: 4000,
                message: error.response.error,
              })
            );
          } else {
            dispatch(
              openSnackBar({
                type: "error",
                duration: 4000,
                message:
                  "We could not update your profile because you're offline",
              })
            );
          }
        });
    }
  };

  return (
    <Grid container className={classes.root} style={{ display: "initial" }}>
      <Header setDisplay={setDisplay} data="Edit Profile" />

      <Grid container>
        {editablesArray.map((data) => {
          if (data.data === "university")
            return (
              <MyInput
                data={data}
                key={data.data}
                label={true}
                setData={data.setData}
                classes={classes}
                dataArray={universities}
              />
            );
          if (data.data === "course")
            return (
              <MyInput
                data={data}
                key={data.data}
                label={true}
                setData={data.setData}
                classes={classes}
                dataArray={courses}
              />
            );
          return (
            <MyInput
              key={data.data}
              setData={data.setData}
              classes={classes}
              data={data}
            />
          );
        })}
      </Grid>

      {/* Update Data Button */}

      <div style={{ padding: "1rem 0px" }}>
        <Grid container justify="center" item xs={12}>
          <Button
            style={{ padding: 8, width: "94%", marginTop: 16 }}
            variant="outlined"
            color="primary"
            onClick={updateUserInfo}>
            Update Data
          </Button>
        </Grid>
      </div>
    </Grid>
  );
};

export default React.memo(EdituserInfo);
