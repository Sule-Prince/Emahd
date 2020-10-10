import React from "react";

import { Paper, makeStyles, Typography } from "@material-ui/core";

import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

import notificationSound from "../assets/audio/pling.mp3";

const useStyles = makeStyles(theme => ({
	root: {
		position: "fixed",
		bottom: "calc(65px + 6vw)",
		zIndex: 100,
		left: "35vw",
		[theme.breakpoints.up("sm")]: {
			left: "40vw",
		},
		[theme.breakpoints.up("md")]: {
			left: "45vw",
		},
	},
	bubble: {
		position: "relative",
		boxShadow:
			"0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);",
		background: "linear-gradient(360deg, #2196f3 0%, #ddd 55%, #f0f0f0 100%)",

		maxHeight: 170,
		minWidth: 130,
		minHeight: 80,
		width: "45vw",
		height: "25vw",
		borderRadius: 10,
		[theme.breakpoints.up("sm")]: {
			width: "40vw",
			height: 150,
		},
		[theme.breakpoints.up("md")]: {
			width: "35vw",
			height: 180,
		},
	},
	before: {
		width: "5vw",
		height: "5vw",
		borderRadius: "50%",
		position: "absolute",
		background: "radial-gradient(#2196f3 0%, #64b5f6 100%)",

		minWidth: 16,
		minHeight: 16,
		bottom: "-6vw",
		right: "15vw",
	},
}));

const TalkBubble = () => {
	const classes = useStyles();

	const { message, open } = useSelector(state => state.userActions.talkBubble);
	if (open) {
		const notificationSound = document.getElementById("not-sound");
		notificationSound.play();
	}
	return (
		<>
			<audio
				id="not-sound"
				style={{ display: "none" }}
				src={notificationSound}
			></audio>
			<AnimatePresence exitBeforeEnter>
				{open ? (
					<motion.div
						exit={{ y: ["-20vh", "50vh"], type: "spring", stiffness: 400 }}
						initial={{ y: "50vh", }}
						animate={{ y: 0 }}
						transition={{ duration: 1, type: "spring", stiffness: 400, }}
						
						className={classes.root}
					>
						<Paper variation={2} className={classes.bubble}>
							<Typography>{message}</Typography>
							<Paper className={classes.before} />
						</Paper>
					</motion.div>
				) : null}
			</AnimatePresence>
		</>
	);
};

export default TalkBubble;
