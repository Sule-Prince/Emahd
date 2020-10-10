import { useState } from "react";
import { axios } from "../../config/axiosConfig";

import { useDispatch } from "react-redux";
import { screamsDataThunk } from "../../redux/screamsSlice";

const usePostData = () => {
	const [postError, setPostError] = useState("");
	const dispatch = useDispatch();

	const sendData = (data, route) => {
		
		if (!data && !route) return;
		axios
			.post(route, data)
			.then(() => {
				dispatch(screamsDataThunk());
			})
			.catch(err => {
				console.log({ ...err });
				if (err.response) {
					setPostError(err.response.data.error);

					return;
				}

				setPostError("Ooops!! you're currently offline");
			});
	};

	return { sendData, postError };
};

export default usePostData;
