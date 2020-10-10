import React, { useState, useEffect, useRef } from "react";

import { IconButton, makeStyles } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

const useStyles = makeStyles({
	root: {
		height: 0,
		position: "relative",
		"& > *": {
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
		},
		"& > span": {
			width: "auto",
			top: "50%",
			left: "50%",
			borderRadius: "50%",
			backgroundColor: "rgba(255, 255, 255, .4)",
			transform: "translate(-50%, -50%)",
		},
	},
	thumb: {
		filter: "blur(2vw)",
	},
	img: {
		zIndex: 1,
		transition: "opacity .5s ease-in",
		willChange: "opacity",
	},
});

const LazyLoadMedia = ({ type, src, thumb, rootRef, settings }) => {
	const mediaPad = useState(() => {
		return 100 / settings.aspectRatio;
	})[0];

	const [showThumb, setShowThumb] = useState(true);
	const [mediaLoaded, setMediaLoaded] = useState(false);

	const mediaRef = useRef(null);
	const thumbRef = useRef(null);
	const classes = useStyles();

	useEffect(() => {
		const mediaConfig = {
			root: rootRef.current,
			threshold: [0.01, 1],
			rootMargin: "50px 0px",
		};

		const mediaObserver = new IntersectionObserver(observeElement, mediaConfig);
		if (type === "image") {
			const thumbConfig = {
				root: rootRef.current,
				threshold: 0.01,
				rootMargin: "150px 0px",
			};
			const thumbObserver = new IntersectionObserver(
				observeElement,
				thumbConfig
			);
			thumbObserver.observe(thumbRef.current);
		}

		mediaObserver.observe(mediaRef.current);

		function observeElement(entry) {
			entry = entry[0];
			if (entry.intersectionRatio > 0) {
				if (!entry.target.getAttribute("preview")) mediaRef.current.src = src;
				if (type === "image") {
					this.unobserve(entry.target);
					return;
				}
				if (entry.intersectionRatio === 1) {
					mediaRef.current.play();
					this.unobserve(entry.target);
				}
			}
		}

		return () => {};

		// eslint-disable-next-line
	}, []);

	return (
		<>
			<div
				className={classes.root}
				style={{
					paddingBottom: `${mediaPad}%`,
				}}
			>
				{type === "image" ? (
					<>
						{showThumb && (
							<img
								preview="true"
								ref={thumbRef}
								className={classes.thumb}
								src={thumb}
								alt="This is a media thumbnail"
							/>
						)}
						<img
							ref={mediaRef}
							className={classes.img}
							style={{ opacity: mediaLoaded ? 1 : 0 }}
							alt="This is a media post"
							onLoad={() => {
								setMediaLoaded(true);
							}}
							onTransitionEnd={() => {
								setShowThumb(false);
							}}
						/>
					</>
				) : (
					<>
						<video ref={mediaRef} loop />
						<span>
							<IconButton color="secondary" component= "span">
								<PlayArrowIcon fontSize="large" />
							</IconButton>
						</span>
					</>
				)}
			</div>
		</>
	);
};

export default LazyLoadMedia;
