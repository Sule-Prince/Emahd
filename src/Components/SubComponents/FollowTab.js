import React from "react";

import { Grid, Typography } from "@material-ui/core";

const FollowTab = ({ followers, friends: following, noOfPosts }) => {
	let noOfFollowers, noOfFollowing;
	if (following && followers) {
		noOfFollowers = followers.length;
		noOfFollowing = following.length;
	}

	return (
		<>
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
				<Typography variant="caption" color="textSecondary" component="div">
					Followers
				</Typography>
			</Grid>
			<Grid item xs={4}>
				<Typography variant="body2" component="span">
					{noOfFollowing >= 0 ? noOfFollowing : "_ _"}
				</Typography>
				<Typography variant="caption" color="textSecondary" component="div">
					Following
				</Typography>
			</Grid>
		</>
	);
};

export default FollowTab;
