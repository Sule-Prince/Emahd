import React, { useEffect } from "react";
import {
	BottomNavigation,
	BottomNavigationAction,
	Avatar,
	Badge,
} from "@material-ui/core";

import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";

import Home from "./Components/Home/Home";
import Search from "./Components/Search/Search";
import Notification from "./Components/Notification/Notifications";
import Account from "./Components/Account/Account";

import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import "./Profile.css";
import { userDataThunk, notifications } from "../../redux/userDataSlice";
import { screamsDataThunk } from "../../redux/screamsSlice";
import { openTalkBubble, closeTalkBubble } from "../../redux/userActionsSlice";

import { projectFirestore, projectAuth } from "../../firebase/FBConfig";
import TalkBubble from "../SubComponents/TalkBubble";
import AddMedia from "./Components/AddMedia/AddMedia";

const Profile = ({ selectedTab, setSelectedTab, ...props }) => {
	const user = useSelector(state => state.user.data.handle);
	const userImg = useSelector(state => state.user.data.imageUrl);
	const noOfUnread = useSelector(state => state.user.notifications.noOfUnread);
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
			const data = await dispatch(userDataThunk());
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
					const data = snapshot.data();
					if (data) {
						let { latest } = data;
						dispatch(notifications(data));

						if (latest > 0) {
							dispatch(closeTalkBubble());
							dispatch(
								openTalkBubble({
									message: latest,
									type: "comment",
								})
							);
							setTimeout(() => {
								dispatch(closeTalkBubble());
							}, 5000);
						}
					}
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
		<div className="profile-page" onDrag={e => e.preventDefault()}>
			<TalkBubble />
			<div className="bottom-tab">
				<BottomNavigation
					value={selectedTab}
					onChange={handleTabChange}
					style= {{ justifyContent: "space-between" }}
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
							selectedTab === 2 ? (
								<AddBoxRoundedIcon style={{ fontSize: "1.7rem" }} />
							) : (
								<AddBoxOutlinedIcon style={{ fontSize: "1.7rem" }} />
							)
						}
					/>
					<BottomNavigationAction
						icon={
							selectedTab === 3 ? (
								<Badge badgeContent={noOfUnread} color="primary">
									<NotificationsRoundedIcon />
								</Badge>
							) : (
								<Badge badgeContent={noOfUnread} color="primary">
									<NotificationsOutlinedIcon />
								</Badge>
							)
						}
					/>

					<BottomNavigationAction
						icon={
							selectedTab === 4 ? <HomeRoundedIcon /> : <HomeOutlinedIcon />
						}
					/>
				</BottomNavigation>
			</div>
			{selectedTab === 0 && <Account />}
			{selectedTab === 1 && <Search />}
			{selectedTab === 2 && <AddMedia />}
			{selectedTab === 3 && <Notification />}
			{selectedTab === 4 && <Home AccountTab={AccountTab} />}
		</div>
	);
};

export default React.memo(Profile);
