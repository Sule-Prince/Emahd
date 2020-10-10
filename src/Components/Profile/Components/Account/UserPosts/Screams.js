import React from "react";

import { Grid, Typography, IconButton } from "@material-ui/core";

import TextPost from "../../../../SubComponents/TextPost";
import NoPostUpload from "./NoPostUpload";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import AllInboxIcon from "@material-ui/icons/AllInbox";

const Screams = ({ posts, error, otherUser }) => {
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
					<NoPostUpload>
						<AllInboxIcon color="primary" fontSize= "large" />
						<Typography color= "primary" variant= "h5" >No Screams yet</Typography>
					</NoPostUpload>
				) : (
					<NoPostUpload>
						<div>
							<AllInboxIcon color= "primary" fontSize="large" />
						</div>
						<Typography color= "primary" variant="h4" component="div">
							Screams
						</Typography>
						<Typography color= "primary" align= "center" variant="body2">
							When you upload Screams they will appear here!!
						</Typography>
					</NoPostUpload>
				)
			) : (
				posts.map(post => (
					<Grid key={post.postId} item xs={12} style={{ marginBottom: 8 }}>
						<TextPost post={post} />
					</Grid>
				))
			)}
		</>
	);
};

export default Screams;
