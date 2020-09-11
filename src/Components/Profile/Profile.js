import React, { useEffect } from "react";
import {
	BottomNavigation,
	BottomNavigationAction,
	Avatar,
	Badge,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Home from "./Components/Home/Home";
import Search from "./Components/Search/Search";
import Notification from "./Components/Notification/Notifications";
import Account from "./Components/Account/Account";

import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import "./Profile.css";
import { userDataThunk, notifications } from "../../redux/userDataSlice";
import { screamsDataThunk } from "../../redux/screamsSlice";

import MySnackBar from "../SubComponents/MySnackBar";
import { projectFirestore } from "../../firebase/FBConfig";

const Profile = ({ selectedTab, setSelectedTab, ...props }) => {
	const user = useSelector(state => state.user.data.handle);
	const userImg = useSelector(state => state.user.data.imageUrl);
	const noOfUnread = useSelector( state => state.user.notifications.noOfUnread)
	const dispatch = useDispatch();
	const { push, location } = useHistory();

	const handleTabChange = (ev, newValue) => {
		if (location.pathname !== "/") push("/");

		setSelectedTab(newValue);
		localStorage.setItem("tabNo", newValue);
	};

	const AccountTab = () => {
		setSelectedTab(0);
	};

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
		let unsubscribe = () => {};
		if (user) {
			unsubscribe = projectFirestore
				.collection("notifications")
				.doc(user)
				.onSnapshot(snapshot => {
					
					dispatch(notifications(snapshot.data()));
				});
		}

		return () => {
			unsubscribe();
		};

		// eslint-disable-next-line
	}, [user]);
	useEffect(() => {
		dispatch(screamsDataThunk());

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
					<BottomNavigationAction icon={<SearchOutlinedIcon />} />
					<BottomNavigationAction
						icon={
							<Badge
								badgeContent= {noOfUnread}
								color= "primary"
							>
								<NotificationsIcon />
							</Badge>
						}
					/>

					<BottomNavigationAction icon={<HomeIcon />} />
				</BottomNavigation>
			</div>
			{selectedTab === 0 && <Account />}
			{selectedTab === 1 && <Search />}
			{selectedTab === 2 && <Notification />}
			{selectedTab === 3 && <Home AccountTab={AccountTab} />}
		</div>
	);
};

export default React.memo(Profile);
