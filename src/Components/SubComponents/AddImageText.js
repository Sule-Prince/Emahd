import React, { useState, useEffect, useRef } from "react";

import { Grid, makeStyles, IconButton, Backdrop } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";

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
		height: "100%",
		width: "95%",
	},

	image: {
		width: "100%",
		height: "auto",
		position: "fixed",
		top: 0,
		zIndex: -1,
	},
}));

const AddImageText = ({ src, setOpen, setTextSettings, textSettings }) => {
	const [color, setColor] = useState("#fff");
	const [postText, setPostText] = useState("");
	const [fontFamily, setFontFamily] = useState("Tahoma");
	const [openBackDrop, setOpenBackDrop] = useState(false);
	const [style, setStyle] = useState({});
	const [fontSize, setFontSize] = useState(12);
	const [transform, setTransform] = useState(`translate3d(0px, 0px, 0px)`);

	const textAreaRef = useRef(null);
	const textWrapRef = useRef(null);

	let posObj = useRef({ clientX: 0, clientY: 0 });
	let origin = useRef({ x: 0, y: 0 });

	const classes = useStyles();

	useEffect(() => {
		setTextSettings(prev => ({
			...prev,
			text: postText,
			style: {
				...prev.style,
				fontSize: `${fontSize}vmin`,
				color,
				fontFamily,
			},
		}));
	}, [color, fontSize, fontFamily, postText, setTextSettings]);

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
			>
				<Grid
					container
					alignItems="center"
					justify="center"
					className={classes.text}
					onClick={() => {
						textAreaRef.current.focus();
					}}
				>
					<MyTextArea
						textRef={textAreaRef}
						value={postText}
						setFocus={setOpenBackDrop}
						setValue={setPostText}
						setFontSize={setFontSize}
						style={{
							zIndex: openBackDrop ? 1 : -1,
							color,
							fontFamily,
							fontSize: `${fontSize}vmin`,
						}}
					/>

					{/* Element that will hold the value in TextArea when blurred */}

					<div
						ref={textWrapRef}
						onTouchStart={e => {
							e.persist();

							origin.current = {
								x: e.touches[0].clientX - posObj.current.clientX,
								y: e.touches[0].clientY - posObj.current.clientY,
							};
						}}
						onTouchMove={e => {
							e.persist();
							const clientX = e.touches[0].clientX - origin.current.x;
							const clientY = e.touches[0].clientY - origin.current.y;
							posObj.current = { clientX, clientY };
							setTransform(`translate3d(${clientX}px, ${clientY}px, 0px)`);
							textWrapRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0px)`;
						}}
						onTouchEnd={e => {
							setTextSettings(prev => ({
								...prev,
								text: postText,
								style: {
									fontSize: `${fontSize}vmin`,
									color,
									fontFamily,
									transform
								},
							}));
						}}
						style={{
							color,
							fontFamily,
							fontSize: `${fontSize}vmin`,
							minHeight: 80,
							textAlign: "center",
							position: "absolute",
							display: openBackDrop && "none",
						}}
					>
						{postText}
					</div>

					{openBackDrop && (
						<Backdrop
							open={openBackDrop}
							onClick={e => {
								e.stopPropagation();
								setOpenBackDrop(false);
							}}
							style={{ zIndex: 0 }}
						/>
					)}

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
			<div
				style={{
					position: "absolute",
					bottom: 10,
					maxWidth: "100%",
					zIndex: 10,
				}}
			>
				<ColorPalette setTextColor={setColor} textColor={color} />
			</div>
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
				position: "absolute",
			}}
		>
			<Grid item>
				<IconButton
					onClick={() => {
						setOpen(false);
					}}
				>
					<CloseIcon style={{ color: "#fff" }} />
				</IconButton>
			</Grid>

			<Grid
				item
				style={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
			>
				<FontsSelectOptions
					classes={classes}
					fontFamily={fontFamily}
					setFontFamily={setFontFamily}
				/>
			</Grid>
			<Grid item>
				<IconButton
					onClick={() => {
						setOpen(false);
					}}
				>
					<DoneIcon style={{ color: "#fff" }} />
				</IconButton>
			</Grid>
		</Grid>
	);
};
