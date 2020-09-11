import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

import MediaPost from "../../../SubComponents/MediaPost";
import TextPost from "../../../SubComponents/TextPost";

const useStyles = makeStyles({
	root: {
		marginBottom: 8,
	},
});

const Post = ({ post }) => {
	const classes = useStyles();
	return (
		<Grid item xs={12} className={classes.root}>
			{post && post.mediaUrl ? (
				<MediaPost post={post} />
			) : (
				<TextPost post={post} />
			)}
		</Grid>
	);
};

export default Post;
