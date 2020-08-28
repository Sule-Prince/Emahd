import React, { useState, useEffect, useRef } from "react";
import {
	BottomNavigation,
	BottomNavigationAction,
	Avatar,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import NotificationsIcon from "@material-ui/icons/Notifications";
// import AvatarSvg from "../assets/graphics/profile_pic.svg";
import Home from "./Components/Home/Home";
import Search from "./Components/Search/Search";
import Notification from "./Components/Notification/Notification";
import Account from "./Components/Account/Account";

import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import "./Profile.css";
import { userDataThunk } from "../../redux/userDataSlice";
import { screamsDataThunk } from "../../redux/screamsSlice";
import { projectFirestore } from "../../firebase/FBConfig";

import MySnackBar from "../SubComponents/MySnackBar"

export default ({ props }) => {
	const { push } = useHistory();
	const userImg = useSelector(state => state.user.data.imageUrl);

	const screamInputEl = useRef(null);

	const [selectedTab, setSelectedTab] = useState(0);
	const handleTabChange = (ev, newValue) => {
		push("/");
		setSelectedTab(newValue);
	};

	const AccountTab = () => {
		setSelectedTab(3);
	};

	const dispatch = useDispatch();

	useEffect(() => {
		const fetchData = async () => {
			const data = await dispatch(userDataThunk("/user/userinfo"));
			if (!data.payload) return;
			const handle = data.payload.handle;
			if (handle) {
				const title = document.getElementsByTagName("title")[0];
				title.innerHTML = handle;
			}
		};

		fetchData();

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		const unsubscribe = projectFirestore
			.collection("screams")
			.onSnapshot(async snapshot => {
				dispatch(screamsDataThunk("/screams"));
			});

		return () => {
			unsubscribe();
		};

		// eslint-disable-next-line
	}, []);

	return (
		<div className="profile-page">
			<MySnackBar />
			<div className="bottom-tab">
				<BottomNavigation
					value={selectedTab}
					onChange={handleTabChange}
					style={{ justifyContent: "space-between" }}
					variant="fullWidth"
				>
					<BottomNavigationAction icon={<HomeIcon />} />
					<BottomNavigationAction icon={<SearchOutlinedIcon />} />
					<BottomNavigationAction icon={<NotificationsIcon />} />
					<BottomNavigationAction
						icon={
							<Avatar
								style={{
									height: "30px",
									width: "30px",
									border: "1px solid #999",
								}}
								src={userImg || null}
							/>
						}
					/>
				</BottomNavigation>
				
			</div>
			{selectedTab === 0 && (
				<Home AccountTab={AccountTab} screamInputEl={screamInputEl} />
			)}
			{selectedTab === 1 && <Search />}
			{selectedTab === 2 && <Notification />}
			{selectedTab === 3 && <Account />}
		</div>
	);
};
