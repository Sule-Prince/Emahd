import { useState } from "react";
import { axios } from "../../config/axiosConfig";

const usePostData = () => {
	const [postError, setPostError] = useState("");
	const sendData = (data, route) => {
		if (!data && !route) return;
		axios
			.post(route, data)
			.then(() => {
				console.log("Sent");
				console.log(data.url);
				return;
			})
			.catch(err => {
				setPostError(err.response.data.error);
				return;
			});
	};

	return { sendData, postError };
};

export default usePostData;
