import { useState } from "react";

import { axios } from "../../config/axiosConfig";
import { projectAuth } from "../../firebase/FBConfig";

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
				.then(res => {
					// localStorage.setItem("token", res.data.token);
					return projectAuth.signInWithEmailAndPassword(
						data.email,
						data.password
					);
				})
				.then(data => {
					return data.user.getIdToken();
				})
				.then(token => {
					setResponse({
						error: [],
						feedback: "We'll take a moment to sign you in...",
						isLoading: false,
					});
					return localStorage.setItem("token", token);
				})
				.then(() => {
					if (history) {
						history.push("/");
						return;
					}
					return;
				})

				.catch(err => {
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
			projectAuth
				.signInWithEmailAndPassword(data.email, data.password)
				.then(data => {
					return data.user.getIdToken();
				})
				.then(token => {
					setResponse({
						error: [],
						feedback: "We'll take a moment to sign you in...",
						isLoading: false,
					});
					localStorage.setItem("token", token);
					window.location.reload();
					return;
				})
				.catch( err => {
					if(err.code === "auth/network-request-failed") {
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
						error: [
							"Wrong credentials, please try again",
						],
						feedback: "",
						isLoading: false,
					});
					console.log(err)
				})
		}
	};

	return [response, authenticateUser];
};

export default useAuth;
