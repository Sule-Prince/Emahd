import React, { useState } from "react";

import {
	TextField,
	InputAdornment,
	makeStyles,
	IconButton,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

import { handleAddComment } from "../../utils/handleComment";
import { useDispatch } from "react-redux";



const useStyles = makeStyles({
	commentContainer: {
		padding: "10px 5px",
		paddingBottom: 12,
	},
});

const useMuiTextStyles = makeStyles(
	{
		root: {
			borderRadius: 26,
			backgroundColor: "#fff",
		},
	},
	{ name: "MuiOutlinedInput" }
);

const CommentField = ({ postId }) => {
	const classes = useStyles();
	const textClasses = useMuiTextStyles();

    const [comment, setComment] = useState("");
    
    const dispatch = useDispatch()

	return (
		<div className={classes.commentContainer}>
			<TextField
				className={textClasses.root}
                // id= {`${postId}-commentField`}
				label="add a comment"
				variant="outlined"
                value= {comment}
				fullWidth
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton color="primary"
                                onClick= {() => {
                                    
                                    
                                    handleAddComment(comment, postId, dispatch)
                                }}
                            >
								<SendIcon />
							</IconButton>
						</InputAdornment>
					),
				}}
                onChange= {(e) => {
                    setComment(e.target.value)
                }}
			/>
		</div>
	);
};

export default CommentField;
