import React, { useEffect, useState } from "react";
import Profile from "./Profile/Profile";
import Login from "./Login/Login";
import jwtDecode from "jwt-decode";
import Loading from "./SubComponents/Loading";
import { useLocation } from "react-router-dom"
import { useStyles } from "./Profile/Components/Account/styles";

const AuthRender = ({ props }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [shouldRender, setShouldRender ] = useState(false)
	const { pathname } = useLocation()
	const classes = useStyles()
	
	useEffect(() => {
	
		let token = localStorage.getItem("token");

		if (token) {
			const decodedToken = jwtDecode(token);
			if (decodedToken.exp * 1000 < Date.now()) {
				localStorage.removeItem("token");
				setIsAuthenticated(false);
				setIsLoading(false);
				return;
			}

			setIsAuthenticated(true);
		}
		setIsLoading(false);
	}, [isAuthenticated]);

	useEffect(() => {
		if(pathname !== "/signup" && pathname !== "/forgot")  {
			setShouldRender(true)
		} else {
			setShouldRender(false)
		}
	}, [pathname])

	
	if(shouldRender) {
		return (
			isLoading ? <Loading classes= {classes} /> : (
				isAuthenticated ? <Profile /> : <Login />
			)
		)
	
	}
	return (
		<></>
	)

};

export default AuthRender;
