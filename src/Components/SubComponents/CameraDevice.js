import React, { useState, useEffect, useRef } from "react";

import { Grid, IconButton, Typography } from "@material-ui/core";
import FlipCameraAndroidIcon from "@material-ui/icons/FlipCameraAndroid";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import {
	getDeviceCamera,
	returnChangeView,
	setStopRecord,
	useStyles,
} from "./CameraDevicesFuncs";

const CameraDevice = () => {
	const [timer, setTimer] = useState({ sec: 0, min: 0, size: 0 });
	const [record, setRecord] = useState({ recorded: false, isRecording: false });
	const classes = useStyles();

	let media = useRef({ media: "video" }).current;

	return (
		<div className={classes.root}>
			<Header
				timer={timer}
				classes={classes}
				record={record}
				media={media}
				setRecord={setRecord}
			/>
			<VideoStream
				classes={classes}
				setTimer={setTimer}
				timer={timer}
				record={record}
				media={media}
				setRecord={setRecord}
			/>
		</div>
	);
};

export default CameraDevice;

const Header = ({ timer, classes, record, media, setRecord }) => {
	return (
		<>
			<Grid
				container
				justify="center"
				alignItems="flex-start"
				className={classes.headerRoot}
			>
				{record.isRecording && (
					<Typography align="center" variant="body1" component="span">
						{`${timer.min
							.toString()
							.padStart(2, 0)} : ${timer.sec.toString().padStart(2, 0)}`}
					</Typography>
				)}
			</Grid>

			{record.recorded && (
				<Grid container className={classes.recordedRoot} direction="column">
					<Grid
						container
						item
						style={{
							background:
								"linear-gradient(180deg, rgba(0,0,0,.3) 45%, rgba(0,0,0,.0)) 100%",
						}}
					>
						<Grid item style={{ flexGrow: 1 }}>
							<IconButton
								style={{ color: "#fff" }}
								onClick={() => {
									setRecord({ recorded: false, isRecording: false });
								}}
							>
								<CloseIcon />
							</IconButton>
						</Grid>
						<Grid item>
							<IconButton style={{ color: "#fff" }}>
								<DoneIcon />
							</IconButton>
						</Grid>
					</Grid>

					<Grid container item>
						{media.media !== "image" && (
							<Grid container item xs={6}>
								<Typography
									style={{
										color: "#fff",
										fontWeight: "bold",
										backgroundColor: "rgba(90, 90, 90, .7)",
										padding: "8px 15px",
										borderRadius: "15px",
									}}
									variant="body2"
									component="span"
								>
									{`${timer.min
										.toString()
										.padStart(2, 0)} : ${timer.sec.toString().padStart(2, 0)}`}
								</Typography>
							</Grid>
						)}
						<Grid
							container
							item
							justify="flex-end"
							xs={media.media === "image" ? 12 : 6}
						>
							<Typography
								variant="body2"
								component="span"
								style={{
									color: "#fff",
									fontWeight: "bold",
									backgroundColor: "rgba(90, 90, 90, .7)",
									padding: "8px 10px",
									borderRadius: "15px",
								}}
							>
								{`${timer.size.toPrecision(1)}mb`}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			)}
		</>
	);
};

const VideoStream = ({
	classes,
	setTimer,
	timer,
	record,
	media,
	setRecord,
}) => {
	// States
	const [videoConstraint, setVideoConstraint] = useState({
		video: { facingMode: "user" },
		audio: true,
	});
	const [vidScale, setVidScale] = useState("scaleX(-1)");
	const [hasRecorded, setHasRecorded] = useState({
		rec: false,
		time1: null,
		time2: null,
	});

	// Refs
	const videoRef = useRef(null);
	const imgRef = useRef(null);
	const streamRef = useRef(null);
	const recorderRef = useRef(null);
	let chunks = useRef([]).current;

	const changeView = returnChangeView(setVideoConstraint, setVidScale);

	useEffect(() => {
		getDeviceCamera(
			streamRef,
			videoRef,
			imgRef,
			recorderRef,
			videoConstraint,
			chunks,
			media,
			setTimer
		);

		// eslint-disable-next-line
	}, [videoConstraint]);

	useEffect(() => {
		if (timer.sec === 60) {
			setTimer(prev => ({
				...prev,
				sec: 0,
				min: (prev.min += 1),
			}));
		}
	}, [timer, setTimer]);

	useEffect(() => {
		if (!record.isRecording && !record.recorded) {
			setTimeout(() => {
				videoRef.current.src = null;
				videoRef.current.volume = 0;
				videoRef.current.srcObject = streamRef.current;
			}, 10);
		}
	}, [record]);

	return (
		<>
			<DisplayMedia
				videoRef={videoRef}
				imgRef={imgRef}
				vidScale={vidScale}
				record={record}
				hasRecorded={hasRecorded}
			/>

			{/* Footer Should Be Here */}
			<Footer
				classes={classes}
				record={record}
				media={media}
				recorderRef={recorderRef}
				hasRecorded={hasRecorded}
				changeView={changeView}
				setRecord={setRecord}
				setTimer={setTimer}
				setHasRecorded={setHasRecorded}
			/>
		</>
	);
};

const DisplayMedia = ({
	videoRef,
	imgRef,
	vidScale,
	hasRecorded: rec,
	record,
}) => {
	const [display, setDisplay] = useState({ video: "initial", image: "none" });
	const [opacity, setOpacity] = useState(0);
	useEffect(() => {
		if ((rec.time2 - rec.time1) / 1000 <= 0.3 && record.recorded) {
			setTimeout(() => {
				setDisplay({ video: "none", image: "initial" });
			}, 100);
			return;
		}

		setDisplay({ video: "initial", image: "none" });
	}, [record, rec]);

	return (
		<Grid
			container
			style={{
				height: "100%",
			}}
		>
			<Grid item xs={12}>
				<img
					ref={imgRef}
					style={{
						maxWidth: "100vw",
						maxHeight: "100vh",
						width: "100%",
						height: "100%",
						display: display.image,
						objectFit: "cover",
						transform: vidScale,
					}}
					alt="Feed from Device's camera"
				/>

				<video
					ref={videoRef}
					onCanPlay={() => {
						setOpacity(1);
					}}
					autoPlay
					loop
					style={{
						maxWidth: "100vw",
						maxHeight: "100vh",
						width: "100%",
						height: "100%",
						display: display.video,
						objectFit: "cover",
						opacity,
						transition: "all .5s cubic-bezier(0, .4, .6, 1)",
						transform: vidScale,
					}}
				></video>
			</Grid>
		</Grid>
	);
};

const Footer = ({
	classes,
	record,
	media,
	recorderRef,
	changeView,
	hasRecorded,
	setRecord,
	setTimer,
	setHasRecorded,
}) => {
	const [bgColor, setBgColor] = useState("#fff");
	const [className, setClassName] = useState(`${classes.recordButton}`);
	const [scale, setScale] = useState({ scale: 1, yoyo: 1 });
	const [intervalId, setIntervalId] = useState({ video: 0, picture: 0 });

	const dispatch = useDispatch();

	const startRecord = e => {
		if (recorderRef.current.state === "recording") recorderRef.current.stop();
		setHasRecorded({ rec: false, time1: Date.now(), time2: null });
		recorderRef.current.start();

		setBgColor("#f00");
		setClassName(` ${classes.recordButton} bgPos`);
		setScale({ scale: [1.2, 1], yoyo: Infinity });
		setRecord({ isRecording: true, recorded: false });
		setTimer(prev => ({ size: 0, min: 0, sec: 0 }));

		setIntervalId(
			setInterval(() => {
				setTimer(prev => ({ ...prev, sec: (prev.sec += 1) }));
			}, 1000)
		);
	};

	const stopRecord = e => {
		e.preventDefault();
		setBgColor("#fff");
		setClassName(`${classes.recordButton}`);
		setScale({ scale: [1, 1], yoyo: 1 });
		setHasRecorded(prev => ({ ...prev, rec: true, time2: Date.now() }));

		clearInterval(intervalId);
	};

	useEffect(() => {
		if (!hasRecorded.rec) return;

		setStopRecord(hasRecorded, media, dispatch, recorderRef, setRecord);

		// eslint-disable-next-line
	}, [hasRecorded]);

	return (
		<div style={{ position: "fixed", bottom: 50, width: "100%", zIndex: 1000 }}>
			<AnimatePresence exitBeforeEnter>
				{!record.recorded && (
					<motion.div
						exit={{ opacity: 0, y: "40vh" }}
						transition={{ duration: 0.5 }}
					>
						<Grid
							container
							alignItems="center"
							justify="center"
							className={classes.footerRoot}
						>
							<motion.span
								className={className}
								animate={{ scale: scale.scale }}
								transition={{
									duration: 0.7,
									yoyo: scale.yoyo,
									type: "spring",
								}}
							>
								<motion.div
									animate={{ backgroundColor: bgColor }}
									transition={{ duration: 0.5 }}
									onTouchStart={startRecord}
									onTouchEnd={stopRecord}
								></motion.div>
							</motion.span>
							<IconButton
								style={{ color: "#fff", left: "75%" }}
								onClick={changeView}
							>
								<FlipCameraAndroidIcon fontSize="large" />
							</IconButton>
						</Grid>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
