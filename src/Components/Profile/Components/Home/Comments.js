import React, { useState, useEffect } from "react";

import { Grid, CircularProgress, makeStyles } from "@material-ui/core";
import AutorenewIcon from "@material-ui/icons/Autorenew";

import Comment from "./Comment";
import { axios } from "../../../../config/axiosConfig";
import { useDispatch } from "react-redux";
import { openSnackBar } from "../../../../redux/userActionsSlice";

const useStyles = makeStyles(theme => ({
	root: {
		overflowY: "auto",
        height: "100vh",
        position: "relative",
        top: 0,
        transform: `translateY(100vh)`,
        zIndex: 1000,
		backgroundColor: "#f4f4f4",
		paddingLeft: 8,
	},
}));

const Comments = ({ postId, commentDialogueBox, setCommentDialogueBox }) => {
	const [comments, setComments] = useState([]);
	const [status, setStatus] = useState("");
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchComments = async postId => {
            console.log(postId)
			try {
				if (postId) {
                    console.log("postId")
					setStatus("loading");
                    // const response = await 
                    axios.get(`/post/${postId}/getcomments`).then( data => {
                        setComments(data.data);
                    console.log(data.data)
					setStatus("success");
                    })
                    
				}
			} catch (error) {
				console.log(error);
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
    
    console.log(comments)
    console.log(postId)

	const classes = useStyles();

	return (
		<div className={classes.root} style= {{
            transform: `translateY(${commentDialogueBox})`
        }}>
			<Grid container>
				{status === "loading" && (
					<CircularProgress
						size={30}
						style={{
							position: "fixed",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
						}}
						thickness={8}
					/>
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
