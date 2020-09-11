import React, { useEffect } from "react";

import { makeStyles, Grid } from "@material-ui/core";

import Post from "../Home/Post";
import PostSkeleton from "../../../SubComponents/PostSkeleton";

import { useSelector, useDispatch } from "react-redux";
import { openSnackBar } from "../../../../redux/userActionsSlice";
import Header from "../../../SubComponents/Header";

const useStyles = makeStyles(theme => ({
	root: {
		height: "100vh",
		width: "100%",
		backgroundColor: theme.palette.background.paper,
		zIndex: 1100,
		// overflowY: "hidden",
		position: "absolute",
		top: 0,
	},
}));

const LikedPosts = ({ setDisplayPosts }) => {
	const classes = useStyles();

	const likedPosts = useSelector(state => state.user.likedPosts);
	const dispatch = useDispatch();

	useEffect(() => {
		if (likedPosts.error)
			dispatch(
				openSnackBar({
					type: "error",
					duration: 4000,
					message: likedPosts.error,
				})
			);
	}, [likedPosts.error, dispatch]);

	/* Reverse the values of the array */
	const reArrangeArray = array => {
		const newArray = Array(array.length);
		for (let i = array.length - 1; i >= 0; i--) {
			newArray[array.length - 1 - i] = array[i];
		}
		return newArray;
	};

	return (
		<div className={classes.root}>
			<Grid container style={{ display: "initial", overflowY: "auto" }}>
				<Header setDisplay={setDisplayPosts} data="Liked Posts" />
				{likedPosts.isLoading ? (
					<PostSkeleton />
				) : (
					likedPosts.data &&
					reArrangeArray(likedPosts.data).map(post => {
						return <Post post={post} key={post.postId} />;
					})
				)}
			</Grid>
			<div className="positionFix"></div>
		</div>
	);
};

export default LikedPosts;
