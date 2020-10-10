import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

import MediaPost from "../../../SubComponents/MediaPost";
import TextPost from "../../../SubComponents/TextPost";

const useStyles = makeStyles({
	root: {
		marginBottom: 10,
	},
});

const Post = ({ post, rootRef }) => { 
	const classes = useStyles();
	return (
		<Grid item xs={12} className={classes.root}>
			{post && post.mediaUrl ? (
				<MediaPost post={post} rootRef= {rootRef} />
			) : (
				<TextPost post={post} />
			)}
		</Grid>
	);
};

export default Post;
