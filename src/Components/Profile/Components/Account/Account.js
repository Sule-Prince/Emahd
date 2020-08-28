import React from "react";
import {
	Grid,
	Paper,
	Typography,
	IconButton,
	Card,
	CardActionArea,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

import FollowCard from "../../../SubComponents/FollowCard";

import { useSelector } from "react-redux";

import "./Account.css";

import { useStyles } from "./styles";
import ProfilePic from "./ProfilePic";
import UserPosts from "./UserPosts/UserPosts";
import useFileUpload from "../../../../utils/useFileUpload";

export default () => {
	const classes = useStyles();

	const userData = useSelector(state => state.user.data);
	// const isLoading = useSelector(state => state.user.isLoading);

	const posts = useSelector(state => state.posts.posts);
	const myPosts = posts[posts.length - 1];

	return (
		<div className={classes.root}>
			<Grid direction="column" container>
				<Grid xs={12} item>
					<Header classes={classes} handle={userData.handle} />
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
					<UtilsNavBar classes={classes} />
				</Grid>
				<Grid container item xs>
					<UserPosts posts={myPosts} />
				</Grid>
			</Grid>
			<div className={classes.positionFIx}></div>
		</div>
	);
};

const Header = ({ classes, handle }) => {
	return (
		<Paper square style={{ borderBottom: "1px solid #aaa" }} elevation={0}>
			<Grid className={classes.headerRoot} container>
				<Grid className={classes.headerNameContainer} item>
					<Typography className={classes.headerName} variant="caption">
						{handle}
					</Typography>
				</Grid>
				<Grid item>
					<IconButton>
						<MenuIcon className={classes.menu} />
					</IconButton>
				</Grid>
			</Grid>
		</Paper>
	);
};

const CoverPhoto = ({ classes, coverPhoto }) => {
	const fileUpload = useFileUpload("coverPhoto");
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
						{coverPhoto ? (
							<img
								className={classes.coverPhoto}
								src={coverPhoto}
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
	return (
		<>
			<Grid item xs={4}>
				<Typography variant="body2" component="span">
					9
				</Typography>
				<Typography variant="caption" color="textSecondary" component="div">
					Posts
				</Typography>
			</Grid>
			<Grid item xs={4}>
				<Typography variant="body2" component="span">
					1875
				</Typography>
				<Typography variant="caption" color="textSecondary" component="div">
					Followers
				</Typography>
			</Grid>
			<Grid item xs={4}>
				<Typography variant="body2" component="span">
					135
				</Typography>
				<Typography variant="caption" color="textSecondary" component="div">
					Following
				</Typography>
			</Grid>
		</>
	);
};

const UtilsNavBar = ({ classes }) => {
	return (
		<div className={classes.utilsNavBar}>
			<span style={{ display: "inline-block" }}>
				<FollowCard />
			</span>
			<span style={{ display: "inline-block" }}>
				<FollowCard />
			</span>
			<span style={{ display: "inline-block" }}>
				<FollowCard />
			</span>
		</div>
	);
};
