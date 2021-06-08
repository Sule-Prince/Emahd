import { useState } from "react";

import { axios } from "../../config/axiosConfig";
import encryptor from "../encryptor";

const useAuth = () => {
  const [response, setResponse] = useState({
    error: [],
    feedback: "",
    isLoading: false,
  });

  const authenticateUser = (route, data, history) => {
    setResponse({
      feedback: "please wait while we validate the data...",
      isLoading: true,
    });
    if (route === "/signupusers") {
      axios
        .post(route, data)
        .then((res) => {
          const encrypted = encryptor.encrypt(data.password);
          localStorage.setItem("p-s-w", encrypted);
          return localStorage.setItem("token", res.data.token);
        })
        .then(() => {
          setResponse({
            error: [],
            feedback: "We'll take a moment to sign you in...",
            isLoading: false,
          });
        })
        .then(() => {
          if (history) {
            history.push("/");
            return;
          }
          return;
        })

        .catch((err) => {
          if (err.response === undefined) {
            setResponse({
              error: [
                "Please make sure you have a network connection and try again",
              ],
              feedback: "",
              isLoading: false,
            });
          } else {
            setResponse({
              error: [err.response.data.error],
              feedback: "",
              isLoading: false,
            });
          }
        });
    } else {
      axios
        .post(route, { user: data.email, password: data.password })
        .then((res) => {
          return localStorage.setItem("token", res.data.token);
        })
        .then(() => {
          const encrypted = encryptor.encrypt(data.password);
          localStorage.setItem("p-s-w", encrypted);
          setResponse({
            error: [],
            feedback: "We'll take a moment to sign you in...",
            isLoading: false,
          });
          window.location.reload();
          return;
        })
        .catch((err) => {
          if (err.response === undefined) {
            setResponse({
              error: [
                "Please make sure you have a network connection and try again",
              ],
              feedback: "",
              isLoading: false,
            });
            return;
          }
          setResponse({
            error: ["Wrong credentials, please try again"],
            feedback: "",
            isLoading: false,
          });
          console.log(err);
        });
    }
  };

  return [response, authenticateUser];
};

export default useAuth;
