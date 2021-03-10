import React, { useEffect, useState } from "react";
import Profile from "./Profile/Profile";
import Login from "./Login/Login";
import jwtDecode from "jwt-decode";
import Loading from "./SubComponents/Loading";
import { useLocation } from "react-router-dom";
import { useStyles } from "./Profile/Components/Account/styles";
import { axios } from "../config/axiosConfig";
import encryptor from "../utils/encryptor";
import { projectAuth } from "../firebase/FBConfig";

const AuthRender = ({ setSelectedTab, selectedTab, ...props }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);
  const { pathname } = useLocation();
  const classes = useStyles();

  useEffect(() => {
    setIsLoading(true);
    if (
      pathname !== "/signup" &&
      pathname !== "/forgot" &&
      pathname !== "/chat"
    ) {
      setShouldRender(true);
    } else {
      setShouldRender(false);
    }
  }, [pathname]);

  useEffect(() => {
    let token = localStorage.getItem("token");

    setTimeout(() => {
      if (token) {
        axios.defaults.headers["Authorization"] = `Bearer ${token}`;

        setIsAuthenticated(true);
      }
      setIsLoading(false);
    }, 100);
  }, [isAuthenticated, pathname]);

  useEffect(() => {
    let token = localStorage.getItem("token");

    axios.interceptors.request.use(
      async (request) => {
        if (!token) return request;

        const decodedToken = jwtDecode(token);

        if (decodedToken.exp * 1000 > Date.now()) return request;
        let email = decodedToken.email;
        let psw = localStorage.getItem("p-s-w");
        if (!psw) return request;
        psw = encryptor.decrypt(psw);

        const data = await projectAuth.signInWithEmailAndPassword(email, psw);

        const newToken = await data.user.getIdToken();

        localStorage.setItem("token", newToken);

        return request;
      },
      (err) => Promise.reject(err)
    );
  }, [isAuthenticated]);

  if (shouldRender) {
    return isLoading ? (
      <Loading classes={classes} />
    ) : isAuthenticated ? (
      <Profile selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    ) : (
      <Login />
    );
  }
  return <> </>;
};

export default React.memo(AuthRender);
