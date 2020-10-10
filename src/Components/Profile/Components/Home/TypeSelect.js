import React, { useEffect, useState } from "react";

import {
	Grid,
	makeStyles,
	IconButton,
} from "@material-ui/core";
import PaletteIcon from "@material-ui/icons/Palette";

import StoryHeader from "./StoryHeader";
import MyTextArea from "../../../SubComponents/MyTextArea";
import FontsSelectOptions from "../../../SubComponents/FontSelectionOptions";
import ColorPalette from "../../../SubComponents/ColorPalette";

const useStyles = makeStyles({
	root: {
		height: "100%",
		width: "100%",
	},
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

const TypeSelect = ({ setStyles, setDisplay }) => {
	const [num, setNum] = useState(0);
	const [textColor, setTextColor] = useState("#fff");
	const [fontFamily, setFontFamily] = useState("Tahoma");
	const [postText, setPostText] = useState("");

	useEffect(() => {
		console.clear();
		console.log(num);
	}, [num]);
	const colorSwatch = [
		"linear-gradient(45deg, #311b92, #2196f3)",
		"linear-gradient(45deg, #d50000, #e65100)",
		"linear-gradient(45deg, #e65100, #aa00ff)",
		"linear-gradient(45deg, #ffea00, #e65100)",
		"linear-gradient(45deg, #4caf50, #76ff03, #00c853)",
		"linear-gradient(45deg, #d50000, #f50057, #dd2c00, #ff5722)",
		"linear-gradient(45deg, #757575, #212121)",
		"linear-gradient(45deg, #ddd, #aaa)",
	];
	const classes = useStyles();
	return (
		<div
			className={classes.root}
			style={{
				background: colorSwatch[num % colorSwatch.length],
			}}
		>
			<StoryHeader setDisplay={setDisplay} setStyles={setStyles}>
				<IconButton
					color="primary"
					onClick={() => {
						setNum(prev => (prev += 1));
					}}
				>
					<PaletteIcon style={{ fontSize: "1.8rem" }} />
				</IconButton>
				<span
					style={{
						position: "absolute",
						left: "50%",
						transform: "translateX(-50%)",
					}}
				>
					<FontsSelectOptions
						fontFamily={fontFamily}
						setFontFamily={setFontFamily}
					/>
				</span>
			</StoryHeader>
			<Grid
				container
				alignItems="center"
				justify="center"
				item
				xs={12}
				className={classes.text}
			>
				<MyTextArea
					textColor={textColor}
					fontFamily={fontFamily}
					setFocus={() => {}}
					setPostText={setPostText}
				/>
			</Grid>

			<ColorPalette textColor={textColor} setTextColor={setTextColor} bottom= {50} />
		</div>
	);
};

export default TypeSelect;
