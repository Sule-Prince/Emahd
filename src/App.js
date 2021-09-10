import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";

// import SignUp from "./Components/SignUp/SignUp";
// import ForgotPsw from "./Components/Login/ForgotPsw";
import { Provider } from "react-redux";
import store from "./redux/store";
import AuthRender from "./Components/AuthRender";
// import OtherUserAccount from "./Components/OtherUsersProfile/OtherUserAccount";
import MySnackBar from "./Components/SubComponents/MySnackBar";

import "./index.css";
import Loading from "./Components/SubComponents/Loading";
import Test from "./Components/SubComponents/Test";
import PostPage from "./Components/SubComponents/PostPage";

const theme = createMuiTheme({
  overrides: {
    MuiMenuItem: {
      root: {
        fontSize: ".875rem",
      },
    },
    MuiButton: {
      containedSizeSmall: {
        padding: "1vmin 10px",
      },
    },
    MuiInputBase: {
      root: {
        fontSize: "0.875rem",
      },
      input: "0.875rem",
    },
    MuiInputLabel: {
      root: {
        fontSize: "0.875rem",
      },
    },
    MuiFormControlLabel: {
      root: {
        marginRight: 0,
      },
      label: {
        fontSize: "0.875rem",
      },
    },
    MuiBottomNavigationAction: {
      root: {
        minWidth: 60,
      },
    },
  },
  palette: {
    primary: {
      light: "#42a5f5",
      main: "#2196f3",
      dark: "#1976d2",
    },
    secondary: {
      light: "#e65100",
      main: "#aa00ff",
      dark: "#6a1b9a",
    },
  },
});

const App = () => {
  const [selectedTab, setSelectedTab] = useState(() => {
    const tabNo = localStorage.getItem("tabNo");
    if (tabNo && tabNo >= 0) return parseInt(tabNo);
    else return 4;
  });

  const SignUp = lazy(() => import("./Components/SignUp/SignUp"));

  const ForgotPsw = lazy(() => import("./Components/Login/ForgotPsw"));

  const OtherUserAccount = lazy(() =>
    import("./Components/OtherUsersProfile/OtherUserAccount")
  );

  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MySnackBar />
          <Helmet>
            <meta
              name="description"
              content="Create an account or log into Emahd. Connect with friends, loved ones, and other people you know. Share photos, videos and screams, send messages and get updates."
            />
          </Helmet>
          <Router>
            <Suspense
              fallback={
                <Loading
                  styles={{
                    height: "100vh",
                  }}
                />
              }>
              <Switch>
                <Route path="/signup" component={SignUp} />
                <Route path="/forgot" component={ForgotPsw} />
                <Route path="/test" component={Test} />
                <Route path="/post/:postId" component={PostPage} />

                <Route
                  path="/user/:user"
                  render={() => (
                    <OtherUserAccount setSelectedTab={setSelectedTab} />
                  )}
                />
                <Route
                  path="/"
                  render={() => (
                    <AuthRender
                      selectedTab={selectedTab}
                      setSelectedTab={setSelectedTab}
                    />
                  )}
                />
              </Switch>
            </Suspense>
          </Router>
        </ThemeProvider>
      </Provider>
    </>
  );
};
export default App;
