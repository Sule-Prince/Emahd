import React from "react";

import { Grid, Typography, IconButton } from "@material-ui/core";

import MediaPost from "../../../../SubComponents/MediaPost";
import NoPostUpload from "./NoPostUpload";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

const Media = ({ posts, error, otherUser, rootRef }) => {
	posts.sort((a, b) => {
		let createdAtA = Date.parse(a.createdAt);
		let createdAtB = Date.parse(b.createdAt);

		return createdAtA > createdAtB ? -1 : 1;
	});

	return (
		<>
			{error ? (
				<Grid
					style={{ height: 300 }}
					container
					justify="center"
					alignItems="center"
				>
					<Grid item xs={2}>
						<IconButton color="primary">
							<AutorenewIcon fontSize="large" />
						</IconButton>
					</Grid>
				</Grid>
			) : posts.length === 0 ? (
				otherUser ? (
					<>
						<NoPostUpload>
							<PhotoCameraIcon color="primary" fontSize="large" />
							<Typography color="primary" variant="h5">
								No Media yet
							</Typography>
						</NoPostUpload>
					</>
				) : (
					<NoPostUpload type="media">
						<div>
							<PhotoCameraIcon color="primary" fontSize="large" />
						</div>
						<Typography color="primary" variant="h4" component="div">
							Media
						</Typography>
						<Typography color="primary" align="center" variant="body2">
							When you upload Media they will appear here!!
						</Typography>
					</NoPostUpload>
				)
			) : (
				posts.map(post => (
					<Grid key={post.postId} item xs={12} style={{ marginBottom: 8 }}>
						<MediaPost post={post} rootRef={rootRef} />
					</Grid>
				))
			)}
		</>
	);
};

export default Media;
