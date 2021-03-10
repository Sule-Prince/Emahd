import { useState } from "react";
import { axios } from "../../config/axiosConfig";

const usePostData = () => {
  const [postError, setPostError] = useState("");

  const sendData = (data, route) => {
    if (!data && !route) return;
    return axios
      .post(route, data)
      .then((res) => {
        return { hasError: false, message: res.data.feedback };
      })
      .catch((err) => {
        if (err.response) {
          setPostError("Ooops!! Something went wrong, please try again");

          return {
            hasError: true,
            message: "Ooops!! Something went wrong, please try again",
          };
        }

        setPostError("Ooops!! you're currently offline");
        return { hasError: true, message: "Ooops!! you're currently offline" };
      });
  };

  return { sendData, postError };
};

export default usePostData;
