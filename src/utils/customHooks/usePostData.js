import { useState } from "react";
import { axios } from "../../config/axiosConfig";

import { useDispatch } from "react-redux";
import { screamsDataThunk } from "../../redux/screamsSlice";

const usePostData = () => {
	const dispatch = useDispatch();

	const [postError, setPostError] = useState("");
	const sendData = (data, route) => {
		if (!data && !route) return;
		axios
			.post(route, data)
			.then(() => {
				dispatch(screamsDataThunk());
			})
			.catch(err => {
				setPostError(err.response.data.error);
			});
	};

	return { sendData, postError };
};

export default usePostData;
