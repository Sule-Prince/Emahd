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

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

import ScreamActions from "./ScreamActions";
import CommentField from "./CommentField";
import LazyLoadMedia from "./LazyLoadMedia";

const useStyles = makeStyles(theme => ({
	avatar: {
		height: 38,
		width: 38,
	},
	commentContainer: {
		padding: "10px 5px",
		paddingBottom: 12,
	},
	media: {
		height: "auto",
		width: "100%",
	},
}));

const MediaPost = ({ post: scream, rootRef }) => {
	const {
		mediaUrl,
		post,
		postId,
		likeCount,
		commentCount,
		createdAt,
		imageUrl: userImg,
		handle,
		mediaType,
	} = scream;

	dayjs.extend(relativeTime);

	const classes = useStyles();

	// const [commentNo, setCommentNo] = useState(commentCount);

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
					<LazyLoadMedia
						type={mediaType}
						src={mediaUrl}
						rootRef={rootRef}
						settings={{ aspectRatio: 1 }}
					/>
				</CardActionArea>

				{/* Card Actions */}
				<ScreamActions
					scream={scream}
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
			<CommentField setCommentNo={commentCount} postId={postId} />
		</div>
	);
};

export default MediaPost;
