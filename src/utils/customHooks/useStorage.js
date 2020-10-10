import { useState, useEffect } from "react";
import { projectStorage } from "../../firebase/FBConfig";
import IDGenerator from "../IDGenerator";

const useStorage = (file, setScream, postData) => {
	const { sendData, postError } = postData;
	const [progress, setProgress] = useState(null);

	const [error, setError] = useState([]);

	useEffect(() => {
		if (postError) setError(prev => [...prev, postError]);
		
		// eslint-disable-next-line
	}, [postError]);

	const storeData = (route, scream, mediaType, postSettings) => {
		const post = scream;
		if (!file) {
			sendData({ post, url: "", mediaType }, route);
			return;
		}

		setScream("");
		const fileExtension = file.name.split(".")[1];
		const fileRef = `${IDGenerator()}.${fileExtension}`;

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
				const data = { post, url, mediaType, postSettings };
				sendData(data, route);
				setTimeout(() => {
					setProgress(null);
				}, 2000);
			}
		);
	};

	return { progress, error, storeData };
};

export default useStorage;
