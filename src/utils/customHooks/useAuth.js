import { useState } from "react";

import { axios } from "../../config/axiosConfig";

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
		axios
			.post(route, data)
			.then(res => {
				setResponse({
					feedback: "We'll take a moment to sign you in...",
					isLoading: false,
				});
				localStorage.setItem("token", res.data.token);
				if (history) {
					history.push("/");
					return;
				}
				window.location.reload();
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
	};

	return [response, authenticateUser];
};

export default useAuth;
