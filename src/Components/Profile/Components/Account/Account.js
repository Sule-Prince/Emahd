import React, { useState, useEffect, useRef } from "react";
import {
	Grid,
	Paper,
	Typography,
	IconButton,
	Card,
	CardActionArea,
	Divider,
	Button,
} from "@material-ui/core";

import SettingsIcon from "@material-ui/icons/Settings";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

import FollowCard from "../../../SubComponents/FollowCard";

import { useSelector, useDispatch } from "react-redux";

import "./Account.css";

import { useStyles } from "./styles";
import ProfilePic from "./ProfilePic";
import UserPosts from "./UserPosts/UserPosts";
import useFileUpload from "../../../../utils/useFileUpload";
import Settings from "./Settings";
import Chat from "../../../Chat/Chat";
import { getImageUrl } from "../../../../utils/getImageUrl";
import { followSuggestThunk } from "../../../../redux/extraDataSlice";
import { motion } from "framer-motion";

const Account = () => {
	// Styles to be used by the settings Component to display the Settings
	const [styles, setStyles] = useState("110vw");
	const [display, setDisplay] = useState(false);

	const rootRef = useRef(null);

	const dispatch = useDispatch();

	const classes = useStyles();

	const userData = useSelector(state => state.user.data);
	// const isLoading = useSelector(state => state.user.isLoading);

	const posts = useSelector(state => state.posts.posts);
	const followSuggest = useSelector(state => state.extra.followSuggest);

	let myPosts = [];
	if (posts) myPosts = posts[posts.length - 1];

	useEffect(() => {
		dispatch(followSuggestThunk());

		// eslint-disable-next-line
	}, []);

	return (
		<>
			<div className={classes.root} ref={rootRef}>
				<Settings styles={styles} setStyles={setStyles} />

				<Grid direction="column" container>
					<Grid xs={12} item style={{ position: "sticky", top: 0, zIndex: 10 }}>
						<Header
							classes={classes}
							handle={userData.handle}
							setStyles={setStyles}
						/>
					</Grid>
					<Grid xs={12} item>
						<CoverPhoto classes={classes} coverPhoto={userData.coverPhoto} />
					</Grid>
					<Grid xs={12} item>
						<ProfilePic classes={classes} imageUrl={userData.imageUrl} />
					</Grid>
					<Grid container item xs={12}>
						<Bio data={userData} />
					</Grid>
					<Grid justify="center" container item xs={12}>
						{display && <Chat setDisplay={setDisplay} />}
						<Button
							variant="contained"
							size="small"
							onClick={() => setDisplay(true)}
							style={{
								width: "92%",
								fontSize: ".72rem",
								color: "#2196f3",
								marginTop: "1rem",
							}}
							fullWidth
						>
							Messages
						</Button>
						<Grid
							container
							alignItems="flex-end"
							item
							xs={12}
							style={{ height: 14 }}
						>
							<Divider style={{ width: "100%" }} />
						</Grid>
					</Grid>
					<Grid container className={classes.followTab} item xs={12}>
						<FollowTab />
					</Grid>

					<Grid
						style={{
							borderBottom: "1px solid #ccc",
							maxHeight: 230,
							overflow: "hidden",
						}}
						xs={12}
						item
					>
						{followSuggest.isLoading ? (
							<Loader classes={classes} />
						) : (
							followSuggest.users.length > 0 && (
								<UtilsNavBar users={followSuggest.users} classes={classes} />
							)
						)}
					</Grid>
					<Grid container item xs>
						<UserPosts posts={myPosts} rootRef={rootRef} />
					</Grid>
				</Grid>
				<div className="positionFix"></div>
			</div>
		</>
	);
};

export default React.memo(Account);

const Header = ({ classes, handle, setStyles }) => {
	const openSettings = () => {
		setStyles("0px");
	};

	return (
		<Paper square elevation={2}>
			<Grid className={classes.headerRoot} container>
				<Grid className={classes.headerNameContainer} item>
					<Typography className={classes.headerName} variant="caption">
						{handle}
					</Typography>
				</Grid>
				<Grid item>
					<IconButton onClick={openSettings}>
						<SettingsIcon color="primary" className={classes.settings} />
					</IconButton>
				</Grid>
			</Grid>
		</Paper>
	);
};

const CoverPhoto = ({ classes, coverPhoto }) => {
	const fileUpload = useFileUpload("coverPhoto");
	const coverPhotoUrl = getImageUrl("coverPhoto", coverPhoto);
	return (
		<Grid item>
			<Card square color="primary">
				<label htmlFor="upload-cover-photo">
					<CardActionArea
						onClick={() => {
							const fileInput = document.getElementById("upload-cover-photo");
							fileInput.click();
						}}
					>
						{coverPhotoUrl ? (
							<img
								className={classes.coverPhoto}
								src={coverPhotoUrl}
								alt="cover"
							/>
						) : (
							<div className={classes.coverPhoto}>
								<PhotoCameraIcon style={{ marginRight: 5 }} color="action" />
								<Typography variant="body2" component="span">
									Add a cover photo
								</Typography>
							</div>
						)}
					</CardActionArea>
				</label>
			</Card>
			<input
				type="file"
				id="upload-cover-photo"
				accept="image/*"
				style={{ display: "none" }}
				onChange={fileUpload}
			/>
		</Grid>
	);
};

const Bio = ({ data }) => {
	return (
		<Grid style={{ paddingLeft: "8px", marginTop: -10 }} container xs={12} item>
			{data.fullName && (
				<Grid item xs={10}>
					<Typography
						style={{ fontWeight: "bold", fontSize: "1.1rem" }}
						variant="caption"
					>
						{data.fullName}
					</Typography>
				</Grid>
			)}
			{data.course && (
				<Grid item xs={10}>
					<Typography style={{ fontWeight: "bold" }} variant="caption">
						{data.course}
					</Typography>
				</Grid>
			)}
			{data.university && (
				<Grid item xs={10}>
					<Typography style={{ fontWeight: "bold" }} variant="caption">
						{data.university}
					</Typography>
				</Grid>
			)}
			{data.bio && (
				<Grid item xs={10}>
					<Typography style={{ fontWeight: "bold" }} variant="caption">
						{data.bio}
					</Typography>
				</Grid>
			)}
		</Grid>
	);
};

const FollowTab = () => {
	const [displayFollowers, setDisplayFollowers] = useState(false);
	const [displayFollowing, setDisplayFollowing] = useState(false);

	const { friends: following, followers, noOfPosts } = useSelector(
		state => state.user.data
	);

	let noOfFollowers, noOfFollowing;
	if (following && followers) {
		noOfFollowers = followers.length;
		noOfFollowing = following.length;
	}

	const displayPage = setDisplay => {
		setDisplay(true);
	};
	return (
		<>
			{/* Followers and Following Page */}
			{/* 
			{displayFollowers && (
				<DisplayCardList
					data="Followers"
					dataList={followers}
					setDisplay={setDisplayFollowers}
				/>
			)}
			{displayFollowing && (
				<DisplayCardList
					data="Following"
					dataList={following}
					setDisplay={setDisplayFollowing}
				/>
			)} */}

			<Grid item xs={4}>
				<Typography variant="body2" component="span">
					{noOfPosts >= 0 ? noOfPosts : "_ _"}
				</Typography>
				<Typography variant="caption" color="textSecondary" component="div">
					Posts
				</Typography>
			</Grid>
			<Grid item xs={4}>
				<Typography variant="body2" component="span">
					{noOfFollowers >= 0 ? noOfFollowers : "_ _"}
				</Typography>
				<Typography
					variant="caption"
					color="textSecondary"
					style={{ cursor: "pointer" }}
					component="div"
					onClick={() => {
						displayPage(setDisplayFollowers);
					}}
				>
					Followers
				</Typography>
			</Grid>
			<Grid item xs={4}>
				<Typography variant="body2" component="span">
					{noOfFollowing >= 0 ? noOfFollowing : "_ _"}
				</Typography>
				<Typography
					variant="caption"
					color="textSecondary"
					style={{ cursor: "pointer" }}
					component="div"
					onClick={() => {
						displayPage(setDisplayFollowing);
					}}
				>
					Following
				</Typography>
			</Grid>
		</>
	);
};

const UtilsNavBar = ({ classes, users }) => {
	return (
		<div className={classes.utilsNavBar}>
			{users.map(user => (
				<span key={user.handle} style={{ display: "inline-block" }}>
					<FollowCard
						handle={user.handle}
						fullName={user.fullName}
						imageUrl={user.imageUrl}
					/>
				</span>
			))}
		</div>
	);
};

const Loader = ({ classes }) => {
	const loadVariant = {
		animate: {
			x: [-80, 80],
			y: [0, -60],
			backgroundColor: ["#2196f3", "#ff5722", "#c6ff00", "#ff1744", "#d500f9"],
			transition: {
				x: {
					yoyo: Infinity,
					duration: 3,
				},
				y: {
					yoyo: Infinity,
					duration: 0.4,
					ease: "easeOut",
				},
				backgroundColor: {
					yoyo: Infinity,
					duration: 4,
					ease: "easeInOut",
				},
			},
		},
	};

	return (
		<>
			<Divider />
			<Grid
				container
				item
				justify="center"
				alignItems="flex-end"
				className={classes.suggestionTab}
				style={{ height: 100 }}
			>
				<motion.span
					variants={loadVariant}
					animate="animate"
					style={{ backgroundColor: "#2196f3" }}
				></motion.span>
			</Grid>
		</>
	);
};
