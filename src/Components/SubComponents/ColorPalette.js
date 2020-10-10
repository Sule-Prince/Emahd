import React, { useState, useEffect, useRef } from "react";

import { makeStyles } from "@material-ui/core";

import { motion } from "framer-motion";

import wobbleAudio from "../assets/audio/jelly-wobble.mp3";

const useStyles = makeStyles(theme => ({
	root: {
		position: "fixed",
		zIndex: 10,
		width: "100vw",
	},
	palette: {
		overflowX: "auto",
		overflowY: "hidden",
		whiteSpace: "nowrap",
		textAlign: "center",
		WebkitOverflowScrolling: "touch",
		width: "100%",
		padding: "10px 8px",
		paddingBottom: 14,

		"& > *": {
			margin: "0px 4px",
		},
	},
}));

const ColorPalette = ({ setTextColor, textColor, bottom }) => {
	const colorArray = [
		"#000",
		"#fff",
		"#e91e63",
		"#f50057",
		"#f44336",
		"#d50000",
		"#9c27b0",
		"#4a148c",
		"#673ab7",
		"#6200ea",
		"#2196f3",
		"#0d47a1",
		"#3f51b5",
		"#1a237e",
		"#00bcd4",
		"#006064",
		"#03a9f4",
		"#01579b",
		"#009688",
		"#00bfa5",
		"#00c853",
		"#aeea00",
		"#76ff03",
		"#ffc107",
		"#ffeb3b",
		"#ff6f00",
		"#ffff00",
		"#ef6c00",
		"#e65100",
		"#ff5722",
		"#ff3d00",
		"#dd2c00",
		"#cfd8dc",
		"#9e9e9e",
		"#607d8b",
	];

	const classes = useStyles();

	return (
		<div className={classes.root} style= {{ bottom }}>
			<div style={{ height: 65, overflowY: "hidden" }}>
				<div className={classes.palette}>
					{colorArray.map(color => (
						<Paint
							color={color}
							key={color}
							textColor={textColor}
							setTextColor={setTextColor}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ColorPalette;

const Paint = ({ color, setTextColor, textColor }) => {
	const [style, setStyle] = useState(40);

	const soundRef = useRef(null);

	useEffect(() => {
		if (textColor === color) {
			setStyle(50);
			soundRef.current.play();
			soundRef.current.volume = 0.5;

			return;
		}
		setStyle(40);
	}, [textColor, color]);

	return (
		<>
			<motion.div
				onClick={() => setTextColor(color)}
				initial={{ height: 40, width: 40 }}
				animate={{ height: style, width: style }}
				transition={{ duration: 1, type: "spring", stiffness: 300 }}
				style={{
					backgroundColor: color,

					display: "inline-block",
					borderRadius: "50%",
					border: "1px solid #fff",
					cursor: "pointer",
				}}
			></motion.div>
			<audio
				src={wobbleAudio}
				ref={soundRef}
				style={{ display: "none" }}
			></audio>
		</>
	);
};
