import { useDispatch } from "react-redux";

import { axios } from "../config/axiosConfig";
import { userDataThunk } from "../redux/userDataSlice";

import {
	uploadingprofilePic,
	uploadedProfilePic,
	uploadError,
} from "../redux/userActionsSlice";

const useFileUpload = type => {
	const dispatch = useDispatch();
	const fileUpload = async e => {
		const image = e.target.files[0];

		const formData = new FormData();
		dispatch(uploadingprofilePic());
		formData.append("image", image, image.name);
		console.log(type);
		axios
			.post(`/user/upload/${type}`, formData)
			.then(() => {
				dispatch(userDataThunk());
				dispatch(uploadedProfilePic());
				const reader = new FileReader();
				if (image) {
					reader.readAsDataURL(image);
					reader.addEventListener("load", () =>
						localStorage.setItem(type, reader.result)
					);
				}
			})
			.catch(err => {
				dispatch(uploadError());
			});
	};
	return fileUpload;
};

export default useFileUpload;
