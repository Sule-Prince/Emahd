import React, { useEffect, useState } from "react";
import Profile from "./Profile/Profile";
import Login from "./Login/Login";
import jwtDecode from "jwt-decode";
import Loading from "./SubComponents/Loading";
import { useLocation } from "react-router-dom";
import { useStyles } from "./Profile/Components/Account/styles";
import { axios } from "../config/axiosConfig";

const AuthRender = ({ setSelectedTab, selectedTab, ...props }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [shouldRender, setShouldRender] = useState(false);
	const { pathname } = useLocation();
	const classes = useStyles();

	useEffect(() => {
		setIsLoading(true);
		if (
			pathname !== "/signup" &&
			pathname !== "/forgot" &&
			pathname !== "/chat"
		) {
			setShouldRender(true);
		} else {
			setShouldRender(false);
		}
	}, [pathname]);

	useEffect(() => {
		setTimeout(() => {
			let token = localStorage.getItem("token");
			if (token) {
				axios.defaults.headers["Authorization"] = `Bearer ${token}`;

				const decodedToken = jwtDecode(token);
				if (decodedToken.exp * (1000 + 1000) < Date.now()) {
					localStorage.removeItem("token");
					setIsAuthenticated(false);
					setIsLoading(false);
					return;
				}

				setIsAuthenticated(true);
			}
			setIsLoading(false);
		}, 100);
	}, [isAuthenticated, pathname]);

	if (shouldRender) {
		return isLoading ? (
			<Loading classes={classes} />
		) : isAuthenticated ? (
			<Profile selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
		) : (
			<Login />
		);
	}
	return <></>;
};

export default React.memo(AuthRender);
