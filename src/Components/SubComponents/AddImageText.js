import React, { useState, useEffect, useRef } from "react";

import { Grid, makeStyles, IconButton, Backdrop } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import ColorPalette from "./ColorPalette";
import ImageEdits from "../../utils/ImageEditor";
import FontsSelectOptions from "./FontSelectionOptions";
import MyTextArea from "./MyTextArea";

const useStyles = makeStyles(theme => ({
	root: {
		position: "fixed",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 1200,
		overflow: "hidden",
		backgroundColor: "#000",
	},
	text: {
		position: "relative",
	},

	image: {
		width: "100%",
		height: "auto",
		position: "fixed",
		top: 0,
		zIndex: -1,
	},
}));

const AddImageText = ({ src, setOpen }) => {
	const [textColor, setTextColor] = useState("#fff");
	const [postText, setPostText] = useState("");
	const [fontFamily, setFontFamily] = useState("Tahoma");
	const [openBackDrop, setOpenBackDrop] = useState(false);
	const [style, setStyle] = useState({});

	const textAreaRef = useRef(null);
	window.ref = textAreaRef

	const classes = useStyles();

	useEffect(() => {
		const imageEdits = new ImageEdits(
			src,
			window.innerWidth,
			window.innerHeight
		);
		const style = imageEdits.computeImageConfig();
		setStyle(style.canvasStyle);
	}, [src]);

	return (
		<div className={classes.root}>
			<Header
				classes={classes}
				setOpen={setOpen}
				fontFamily={fontFamily}
				setFontFamily={setFontFamily}
			/>

			<Grid
				container
				style={{ height: "100%" }}
				alignItems="center"
				justify="center"
				onClick= { () => {textAreaRef.current.focus()}}
			>
				<Grid
					container
					alignItems="center"
					justify="center"
					item
					xs={12}
					className={classes.text}
				>
					<MyTextArea
						textRef={textAreaRef}
						setFocus={setOpenBackDrop}
						fontFamily={fontFamily}
						textColor={textColor}
						setPostText={setPostText}
					/>

					<Backdrop
						open={openBackDrop}
						onClick={(e) => {
							e.stopPropagation()
							setOpenBackDrop(false);
						}}
						style={{ zIndex: 1 }}
					/>
					{/* Removed The From Here */}
					<img
						className={classes.image}
						src={src}
						alt="Editing version"
						style={{
							height: style.height,
							top: "50%",
							width: style.width,
							transformOrigin: "top",
							transform: `scale(${style.scale}, ${style.scale}) translateY(-50%)`,
						}}
					/>
				</Grid>
			</Grid>
			<ColorPalette
				setTextColor={setTextColor}
				textColor={textColor}
				bottom={0}
			/>
		</div>
	);
};

export default AddImageText;

const Header = ({ setOpen, fontFamily, setFontFamily, classes }) => {
	return (
		<Grid
			container
			alignItems="center"
			style={{
				marginLeft: -6,
				marginBottom: 10,
				zIndex: 10,
				position: "relative",
			}}
		>
			<Grid item style={{ flexGrow: 1 }}>
				<IconButton
					onClick={() => {
						setOpen(false);
					}}
				>
					<CloseIcon style={{ color: "#fff" }} />
				</IconButton>
			</Grid>

			<Grid item>
				<FontsSelectOptions
					classes={classes}
					fontFamily={fontFamily}
					setFontFamily={setFontFamily}
				/>
			</Grid>
		</Grid>
	);
};
