import React, { useState } from "react";
import { makeStyles, TextareaAutosize } from "@material-ui/core";

const useStyles = makeStyles({
	textField: {
		backgroundColor: "transparent",
		top: "50%",
		transform: "translateY(-50%)",
		fontSize: "12vw",
		textAlign: "center",
		position: "fixed",
		width: "100vw",
		zIndex: 10,
		border: "none",
		padding: 8,
		minHeight: 100,
		"&:focus": {
			border: "none",
			outline: "none",
		},
	},
});

const MyTextArea = ({ setFocus, textColor, fontFamily, textRef, setPostText }) => {
	const [text, setText] = useState("");
	const classes = useStyles();

	return (
		<TextareaAutosize
			aria-label="minimum height"
			onFocus={() => {
				setFocus(true);
			}}
			style={{
				color: textColor,
				fontFamily,
			}}
			className={`text-placeholder ${classes.textField}`}
			value={text}
			ref= {textRef}
			onChange={e => {
				setText(e.target.value);
				setPostText(e.target.value);
			}}
		/>
	);
};

export default MyTextArea;
