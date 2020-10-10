import React, { useState, useRef } from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import Post from "./Post";
import { motion, AnimatePresence } from "framer-motion";

// import RefreshIcon from "@material-ui/icons/Refresh";

const useStyles = makeStyles(theme => ({
	root: {
		overflowY: "auto",
		minHeight: "100vh",
		position: "absolute",
		marginTop: 5,
		backgroundColor: "#f9f9f9",
	},
	positionFIx: {
		height: 70,
		width: "100vw",
	},
	loading: {
		width: 12,
		height: 12,
		position: "absolute",
		left: "38%",
		// display: "inline-block",
		borderRadius: "50%",
		backgroundColor: theme.palette.primary["main"],
	},
}));

const Posts = ({ posts }) => {
	const classes = useStyles();
	const [deg, setDeg] = useState(0);
	const [load, setLoad] = useState(false);

	const rootRef = useRef(null);

	let sortedPosts = [];

	if (posts) {
		posts.forEach(postArray => {
			sortedPosts = [...sortedPosts, ...postArray];
		});

		sortedPosts.sort((a, b) => {
			let createdAtA = Date.parse(a.createdAt);
			let createdAtB = Date.parse(b.createdAt);

			return createdAtA > createdAtB ? -1 : 1;
		});
	}

	return (
		<>
			<div style={{ height: load && 20, position: "relative" }}>
				<AnimatePresence exitBeforeEnter>
					{!load && deg >= 1 && (
						<motion.svg
							style={{ display: "block", margin: "4px auto" }}
							width="30px"
							height="30px"
							viewBox="0 0 100 100"
						>
							<motion.path
								exit={{ pathLength: 0 }}
								strokeWidth="8"
								initial={{ pathLength: 0, opacity: 0.4 }}
								animate={{
									pathLength: deg <= 360 ? deg / 360 : 1,
									opacity: deg / 360,
								}}
								fill="none"
								stroke="#2196F3"
								d="M93.355,49.034
	c0,22.279-19.466,40.339-43.476,40.339c-24.009,0-43.473-18.061-43.473-40.339c0-22.278,19.464-40.339,43.473-40.339
	C73.89,8.695,93.355,26.756,93.355,49.034"
							/>
						</motion.svg>
					)}
				</AnimatePresence>
				{load && <LoadingAnimation classes={classes} />}
			</div>

			{/* <motion.div */}
			<div
				className={classes.root}
				ref={rootRef}

				/* drag="y"
				dragConstraints={{ left: 0, right: 0, bottom: 0, top: 0 }}
				dragElastic={0.1}
				onDrag={(event, info) => {
					if (info.point.y <= 460 && info.point.y >= 90) {
						setDeg(info.point.y - 80);
					}
				}}
				onDragEnd={(event, info) => {
					if (deg >= 360) setLoad(true);
				}} */
			>
				<Grid style={{ position: "absolute", marginBottom: 170 }} container>
					{posts
						? sortedPosts.map(post => <Post post={post} rootRef= {rootRef} key={post.postId} />)
						: null}
				</Grid>
				<div className={classes.positionFIx}></div>
			</div>
			{/* </motion.div> */}
		</>
	);
};

export default Posts;

const LoadingAnimation = ({ classes, loading }) => {
	return (
		<div
			style={{ display: loading, justifyContent: "center", margin: "15px 0px" }}
		>
			<motion.div
				initial={{ x: 0, opacity: 0 }}
				animate={{ x: [0, 100], opacity: 1 }}
				transition={{ duration: 3, yoyo: Infinity, delay: 1, stiffness: 400 }}
				className={classes.loading}
			></motion.div>
			<motion.div
				initial={{ x: 0, opacity: 0 }}
				animate={{ x: [0, 80], opacity: [0.6, 1, 1] }}
				transition={{ duration: 3, yoyo: Infinity, delay: 1, stiffness: 400 }}
				className={classes.loading}
			></motion.div>
			<motion.div
				initial={{ x: 0, opacity: 0 }}
				animate={{ x: [0, 60], opacity: [0.6, 1, 1] }}
				transition={{ duration: 3, yoyo: Infinity, delay: 1, stiffness: 400 }}
				className={classes.loading}
			></motion.div>
			<motion.div
				initial={{ x: 0, opacity: 0 }}
				animate={{ x: [0, 40], opacity: [0.6, 1, 1] }}
				transition={{ duration: 3, yoyo: Infinity, delay: 1, stiffness: 400 }}
				className={classes.loading}
			></motion.div>
			<motion.div
				initial={{ x: 0, opacity: 0 }}
				animate={{ x: [0, 20], opacity: [0.6, 1, 1] }}
				transition={{ duration: 3, yoyo: Infinity, delay: 1, stiffness: 400 }}
				className={classes.loading}
			></motion.div>
			<motion.div
				initial={{ x: 0, opacity: 0 }}
				animate={{ opacity: [1, 1] }}
				transition={{ duration: 3, delay: 1, yoyo: Infinity }}
				className={classes.loading}
			></motion.div>
		</div>
	);
};
