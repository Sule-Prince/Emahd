import React, { useState, useEffect } from "react";

// Hooks
import { useDispatch, useSelector } from "react-redux";

import {
	CardActions,
	IconButton,
	Typography,
	makeStyles,
} from "@material-ui/core";

import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";

import FavoriteBorderSharpIcon from "@material-ui/icons/FavoriteBorderSharp";
import FavoriteSharpIcon from "@material-ui/icons/FavoriteSharp";
import ChatBubbleOutlineSharpIcon from "@material-ui/icons/ChatBubbleOutlineSharp";

import { handleLike, handleUnlike } from "../../utils/handleLike";

// Assets import
import likeSound from "../assets/audio/likeSound.mp3";
import Comments from "../Profile/Components/Home/Comments";

const useStyles = makeStyles(theme => ({
	cardActions: {
		display: "flex",
		justifyContent: "space-between",
	},
	spanText: {
		paddingLeft: 8,
	},
}));

const ScreamActions = ({ postId, likeCount, commentCount }) => {
	const [isLiked, setIsLiked] = useState(false);
	const [likes, setLikes] = useState(likeCount);
	const [commentDialogueBox, setCommentDialogueBox] = useState("110vh");
	const [openComments, setOpenComments] = useState(false)
	const dispatch = useDispatch();
	const classes = useStyles();
	const likedPosts = useSelector(state => state.user.likes);
	console.log(openComments)
	useEffect(() => {
		if (likedPosts.indexOf(postId) !== -1) {
			setIsLiked(true);
		} else {
			setIsLiked(false);
		}
	}, [likedPosts, postId]);

	const handleOpenComments = () => {
		setOpenComments(true)
		setCommentDialogueBox(0);
	};

	return (
		<>
			<CardActions className={classes.cardActions}>
				<div>
					{isLiked ? (
						<IconButton
							style={{ color: "#f00" }}
							onClick={() => {
								handleUnlike(postId, dispatch, setLikes);
							}}
						>
							<FavoriteSharpIcon fontSize="small" />
						</IconButton>
					) : (
						<IconButton
							onClick={() => {
								handleLike(postId, dispatch, setLikes);
							}}
						>
							<FavoriteBorderSharpIcon fontSize="small" />
						</IconButton>
					)}

					{/* Audio for Pop sound when a user likes a post */}

					<audio
						id="like-audio"
						style={{ display: "none" }}
						controls
						src={likeSound}
					></audio>
					{/* End of Audio component */}

					<Typography
						variant="caption"
						className={classes.spanText}
						component="span"
					>
						{likes}
					</Typography>
				</div>
				<div>
					<IconButton onClick={handleOpenComments}>
						<ChatBubbleOutlineSharpIcon fontSize="small" />
					</IconButton>

					<Typography
						variant="caption"
						className={classes.spanText}
						component="span"
					>
						{commentCount}
					</Typography>
				</div>
				<div>
					<IconButton>
						<ShareOutlinedIcon fontSize="small" />
					</IconButton>
				</div>
			</CardActions>
			{
				openComments === true ? (
					<Comments
				commentDialogueBox={commentDialogueBox}
				setCommentDialogueBox={setCommentDialogueBox}
				postId= {postId}
			/>
				) : null
			}
		</>
	);
};

export default ScreamActions;
