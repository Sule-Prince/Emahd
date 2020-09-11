import React, { useState, useEffect } from "react";

import { Grid, CircularProgress, makeStyles } from "@material-ui/core";
import AutorenewIcon from "@material-ui/icons/Autorenew";

import Comment from "./Comment";
import { axios } from "../../../../config/axiosConfig";
import { useDispatch } from "react-redux";
import { openSnackBar } from "../../../../redux/userActionsSlice";
import Header from "../../../SubComponents/Header";

const useStyles = makeStyles(theme => ({
	root: {
		overflowY: "auto",
		height: "100vh",
		width: "100%",
		position: "fixed",
		top: 0,
		display: "block",
		zIndex: 1000,
		backgroundColor: theme.palette.background.paper,
	},
}));

const Comments = ({ postId, setOpenComments }) => {
	const [comments, setComments] = useState([]);
	const [status, setStatus] = useState("");
	const dispatch = useDispatch();
	const classes = useStyles();

	useEffect(() => {
		const fetchComments = async postId => {
			try {
				if (postId) {
					setStatus("loading");
					// const response = await
					axios.get(`/post/${postId}/getcomments`).then(data => {
						setComments(data.data);
						setStatus("success");
					});
				}
			} catch (error) {
				setStatus("error");
				dispatch(
					openSnackBar({
						type: "error",
						duration: 3000,
						message: "Failed to get comments",
					})
				);
			}
		};

		fetchComments(postId);

		// eslint-disable-next-line
	}, [postId]);

	return (
		<div className={classes.root}>
			<Grid container style={{ display: "initial" }}>
				<Header data="Comments" setDisplay={setOpenComments} />
				{status === "loading" && (
					<span
						style={{
							position: "fixed",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
						}}
					>
						<CircularProgress size={30} thickness={8} />
					</span>
				)}
				{status === "error" && (
					<AutorenewIcon
						fontSize="large"
						style={{
							position: "fixed",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
						}}
					/>
				)}
				{status === "success" &&
					comments.map(comment => (
						<Comment
							key={comment.commentId}
							comment={comment.comment}
							createdAt={comment.createdAt}
							handle={comment.handle}
							imgUrl={comment.imageUrl}
						/>
					))}
			</Grid>
		</div>
	);
};

export default Comments;
