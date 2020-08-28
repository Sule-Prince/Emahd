import { useState } from "react";
import { projectStorage } from "../../firebase/FBConfig";
import IDGenerator from "../IDGenerator";
import usePostData from "./usePostData";

const useStorage = (file, setScream) => {
	
	const { sendData, postError } = usePostData();

	const [progress, setProgress] = useState(null);

	const [error, setError] = useState([]);
	if (postError) setError([...error, postError]);
	
	const storeData = (route, scream, mediaType) => {
		const post = scream;
		if (!file) {
			sendData({post, url: "", mediaType}, route)
			return ;
		}
		
		setScream("");
		const fileExtension = file.name.split(".")[1];
		const fileRef = `${IDGenerator()}.${fileExtension}`;
		console.log(fileRef);
		const storageRef = projectStorage.ref(fileRef);
		storageRef.put(file).on(
			"state_changed",
			snap => {
				let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
				setProgress(percentage);
			},
			err => setError(err),
			async () => {
				const url = await storageRef.getDownloadURL();
				const data = { post, url, mediaType };
				sendData(data, route);
				setTimeout( () => {
					setProgress(null)
				}, 2000)
			}
		);
	};

	return { progress, error, storeData };
};

export default useStorage;
