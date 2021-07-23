import React, { useState, useEffect, useRef } from "react";
import {
  makeStyles,
  TextField,
  Grid,
  Typography,
  InputAdornment,
  CircularProgress,
  Button,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import { courses } from "../assets/courses";
import { universities } from "../assets/universities";
import { isEmpty, isAllowedChar } from "../../utils/validators";
import { axios } from "../../config/axiosConfig";

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1.3),
    "& > * ": {
      width: `100%`,
    },
  },
  button: {
    // backgroundColor: theme.palette.primary["main"],
    width: " 100% ",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    color: "#fff",
  },
  selectForm: {
    minWidth: "100%",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

let timeoutId;

export default ({
  setHandle,
  setCourse,
  setUniversity,
  handle,
  course,
  university,
  ...props
}) => {
  const [error, setError] = useState({ message: "", hasError: false });

  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [textMeta, setTextMeta] = useState({
    isLoading: false,
    error: false,
  });

  const inputChanged = useRef(false);

  useEffect(() => {
    if (handle.length <= 0) {
      setError({ message: "", hasError: false });

      return setShouldDisplay(false);
    }
    let error = false;
    for (let i = 0; i < handle.length; i++) {
      if (!isAllowedChar(handle[i])) {
        error = true;
        setError({
          message: "Username can only contain alphabets, digits, . and _",
          hasError: true,
        });

        return setShouldDisplay(false);
      }
    }

    if (error) return;

    setError({ message: "", hasError: false });
    setShouldDisplay(true);
  }, [handle]);

  useEffect(() => {
    clearTimeout(timeoutId);
    console.log(inputChanged);

    if (handle.length > 0 && shouldDisplay && inputChanged.current) {
      setTextMeta({
        isLoading: true,
        error: false,
      });

      timeoutId = setTimeout(async () => {
        try {
          const data = (
            await axios.post("/exists", {
              user: handle,
            })
          ).data;
          const exists = data.exists;
          if (exists) {
            setError({
              message: "handle is already in use",
              hasError: true,
            });

            setTextMeta({
              isLoading: false,
              error: true,
            });
          } else {
            setError({
              message: "",
              hasError: false,
            });

            setTextMeta({
              isLoading: false,
              error: false,
            });
          }
          setIsLoading(false);
        } catch (error) {
          setError({
            message: "something went wrong, try again later",
            hasError: true,
          });
          setIsLoading(false);
        }
      }, 1500);
    }
  }, [handle, shouldDisplay]);

  const classes = useStyles();
  return (
    <form>
      <Grid container>
        <Grid container justify="center" item xs={12}>
          <Grid
            style={{ marginTop: 35, marginBottom: 10, height: 120 }}
            justify="center"
            container
            item
            xs={12}>
            <Grid style={{ textAlign: "center" }} item xs={12}>
              <Typography
                style={{
                  fontWeight: "bold",
                  marginBottom: 10,
                  display: "block",
                }}
                variant="body2">
                Enter your User Name
              </Typography>
            </Grid>

            <Grid className={classes.textField} item xs={10}>
              <TextField
                label="Username"
                value={handle}
                error={error.hasError}
                id="handle"
                onChange={(e) => {
                  setIsLoading(true);
                  const value = e.target.value.toLowerCase();
                  setHandle(value);
                  inputChanged.current = true;
                }}
                InputProps={
                  shouldDisplay
                    ? {
                        endAdornment: (
                          <InputAdornment position="end">
                            {textMeta.isLoading ? (
                              <CircularProgress
                                thickness={4}
                                style={{ width: 20, height: 20 }}
                              />
                            ) : textMeta.error ? (
                              <CancelRoundedIcon
                                fontSize="small"
                                color="error"
                              />
                            ) : (
                              <CheckCircleIcon
                                fontSize="small"
                                style={{ color: "#4BB543" }}
                              />
                            )}
                          </InputAdornment>
                        ),
                      }
                    : {}
                }
              />
              <div className="error">{error.message}</div>
            </Grid>
          </Grid>

          {/* Select School Form */}
          <Grid container item xs={10}>
            <Grid
              style={{
                background: "#ccc",
                boxShadow:
                  "0px 2px 2px -1px rgba(0,0,200,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                padding: 1,
                borderBottom: "2px solid #64b4f6ef",
                marginBottom: 10,
                minWidth: "80%",
              }}
              container
              justify="center"
              alignItems="center"
              item>
              <InfoOutlinedIcon
                style={{ marginRight: 5, color: "#fff" }}
                size="small"
              />
              <Typography style={{ color: "#fff" }} variant="body2">
                leave as custom if you'd rather not say
              </Typography>
            </Grid>
            <SelectSchoolForm
              university={university}
              setUniversity={setUniversity}
              classes={classes}
            />
            <Grid item xs={2}></Grid>
            <SelectCourseForm
              course={course}
              setCourse={setCourse}
              classes={classes}
            />
          </Grid>
          {/*End Select School Form */}

          <Grid item xs={10}>
            <Button
              className={classes.button}
              variant="contained"
              size="small"
              color="primary"
              disabled={isLoading || error.hasError}
              onClick={(e) => {
                e.preventDefault();
                if (error.hasError || isLoading) return;
                if (isEmpty(handle)) {
                  setError({ message: "Must not be empty", hasError: true });
                  return;
                }

                props.next(3);
              }}>
              Next
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export const SelectSchoolForm = ({ classes, university, setUniversity }) => {
  return (
    <Grid container justify="center" item xs={5}>
      <div className={classes.selectForm}>
        <TextField
          select
          label="University"
          fullWidth
          id="university"
          name="university"
          value={university}
          defaultValue="Custom"
          helperText="Select your university"
          onChange={(e) => setUniversity(e.target.value)}>
          {universities.map((option, i) => (
            <MenuItem key={i} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Grid>
  );
};

export const SelectCourseForm = ({ classes, course, setCourse }) => {
  return (
    <Grid container justify="center" item xs={5}>
      <div className={classes.selectForm}>
        <TextField
          select
          label="Course"
          fullWidth
          id="course"
          name="course"
          value={course}
          defaultValue="Custom"
          helperText="Select your course"
          onChange={(e) => setCourse(e.target.value)}>
          {courses.map((option, i) => (
            <MenuItem key={i} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Grid>
  );
};
