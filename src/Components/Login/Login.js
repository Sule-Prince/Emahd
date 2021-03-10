import React, { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import AuthButton from "../SubComponents/AuthButton";
import PswInput from "../SubComponents/PswInput";

import imageOne from "../assets/graphics/slideshow/imageOne.jpg";

import "./Login.css";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    position: "relative",
    backgroundColor: theme.palette.grey[100],
  },
  inputRoot: {
    "& > *": {
      width: "90%",
      paddingBottom: "5%",
    },
  },
  inputPaper: {
    height: 380,
    maxWidth: 348,
    marginTop: "20%",
    marginBottom: 20,

    "& > *": {
      margin: theme.spacing(2),
    },
    [theme.breakpoints.up("xs")]: {
      width: "100%",
    },
    [theme.breakpoints.up(460)]: {
      width: 348,
    },
  },
  imgGallery: {
    display: "none",
    height: "80vh",

    [theme.breakpoints.up("md")]: {
      display: "initial",
      marginTop: "3%",
    },
  },
  galleryImg: {
    height: "inherit",
    width: "100%",
    objectFit: "cover",
  },
  signupPaper: {
    maxWidth: 348,
    padding: theme.spacing(2.5),
    [theme.breakpoints.up("xs")]: {
      width: "100%",
    },
    [theme.breakpoints.up(460)]: {
      width: 348,
    },
  },
  footer: {
    borderTop: "1px solid #ccc",
    position: "absolute",
    bottom: "0px",
  },
}));
const Login = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Helmet>
        <title>Login | Emahd</title>
        <meta
          name="description"
          content="Log in to Emahd to start sharing and connecting with your friends, family and loved ones
"
        />
      </Helmet>
      <form>
        <Grid container justify="space-around" spacing={2} alignItems="center">
          {/* TODO:: Make a gallery to be viewed on big screens and invinsible on smaller screens */}
          <Gallery classes={classes} />
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
            className={classes.inputRoot}
            xs={11}
            sm={8}
            md={5}
            xl={4}
            item>
            <InputForm classes={classes} />
            <SignupRedirect classes={classes} />
          </Grid>

          <Grid container item style={{ height: 84 }}></Grid>
          <Footer classes={classes} />
        </Grid>
      </form>
    </div>
  );
};

export default Login;

const Gallery = ({ classes }) => {
  return (
    <>
      <Grid md={6} xl={7} className={classes.imgGallery} container item>
        <img className={classes.galleryImg} src={imageOne} alt="gallery" />
      </Grid>
    </>
  );
};

const InputForm = ({ classes }) => {
  const [userCred, setUserCred] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: { message: "", hasError: false },
    password: { message: "", hasError: false },
  });

  const handleChange = (e, setData) => {
    setData(e.target.value.trim());
  };

  return (
    <Paper elevation={1} className={classes.inputPaper}>
      <Grid xs item>
        <Typography align="center" variant="h5">
          Emahd
        </Typography>
      </Grid>

      <Grid xs item>
        <TextField
          value={userCred}
          onChange={(e) => {
            handleChange(e, setUserCred);
          }}
          error={error.email.hasError}
          fullWidth
          label="Phone number, or email, or handle"
        />
        <div style={{ padding: "3px 6px" }} className="error">
          {error.email.message}
        </div>
      </Grid>
      <Grid xs item>
        <PswInput
          password={password}
          error={error.password}
          setPassword={setPassword}
        />
        <div style={{ padding: "3px 6px" }} className="error">
          {error.password.message}
        </div>
      </Grid>
      <Grid item>
        <AuthButton
          btnText="Log In"
          route="/login"
          userDetails={{ email: userCred, password }}
          setError={setError}
          inputError={error}
        />
      </Grid>
      <Grid xs item className="login-or">
        <div></div>
        <span className="login-or-text">OR</span>
        <div></div>
      </Grid>

      <Grid xs item>
        <Typography align="center" variant="body2">
          <Link to="/forgot">Forgot Password</Link>
        </Typography>
      </Grid>
    </Paper>
  );
};

const SignupRedirect = ({ classes }) => {
  return (
    <Paper elevation={1} className={classes.signupPaper}>
      <Typography align="center" variant="body2">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </Typography>
    </Paper>
  );
};

const Footer = ({ classes }) => {
  return (
    <Grid container className={classes.footer} spacing={1} item>
      <Grid item xs={12} style={{ marginBottom: 4 }}>
        <Typography align="center" variant="body1">
          By AstroXTechnologies
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          align="center"
          className={classes.copyright}
          variant="body2">
          copyright &copy; AstroXTechnologies 2020
        </Typography>
      </Grid>
    </Grid>
  );
};
