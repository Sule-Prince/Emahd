import React from "react";
import {
	Card,
	CardActionArea,
	CardHeader,
	CardContent,
	Avatar,
	IconButton,
	makeStyles,
	Typography,
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVertRounded";

// import LazyLoad from "react-lazyload";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

import ScreamActions from "./ScreamActions";
import CommentField from "./CommentField";

const useStyles = makeStyles(theme => ({
	avatar: {
		height: 38,
		width: 38,
	},
	media: {
		height: "auto",
		minHeight: "50vw",
		width: "100%",
	},

	commentContainer: {
		padding: "10px 5px",
		paddingBottom: 12,
	},
}));


const MediaPost = ({
	post: {
		mediaUrl,
		post,
		postId,
		likeCount,
		commentCount,
		createdAt,
		imageUrl: userImg,
		handle,
		mediaType,
	},
}) => {

	dayjs.extend(relativeTime);

	const classes = useStyles();

	return (
		<div>
			<Card>
				<CardHeader
					style={{ paddingLeft: 8, paddingRight: 8 }}
					avatar={
						<Avatar src={userImg ? userImg : null} className={classes.avatar} />
					}
					action={
						<IconButton>
							<MoreVertIcon />
						</IconButton>
					}
					title={
						<Link style={{ color: "#000", fontWeight: "bold" }} to={handle}>
							{handle}
						</Link>
					}
				/>
				<CardActionArea>
					{mediaType === "image" ? (
						<img className={classes.media} src={mediaUrl} alt="post" />
					) : (
						<video controls className={classes.media} src={mediaUrl} />
					)}
				</CardActionArea>

				{/* Card Actions */}
				<ScreamActions
					postId={postId}
					likeCount={likeCount}
					commentCount={commentCount}
				/>

				<CardContent>
					<Typography variant="body2" color="textPrimary" component="div">
						{post}
					</Typography>
					<Typography variant="caption" color="textSecondary" component="p">
						{dayjs(createdAt).fromNow()}
					</Typography>
				</CardContent>
			</Card>
			{/* Comment Field  */}
			<CommentField />
		</div>
	);
};

export default MediaPost;
