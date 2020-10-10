import { makeStyles } from "@material-ui/core";
import { openSnackBar } from "../../redux/userActionsSlice";

// Styles for the Camera functionality
// Located at the CameraDevices component

export const useStyles = makeStyles(theme => ({
	root: {
		height: "100%",
		width: "100%",
		backgroundColor: "#000",
		position: "relative",
		"& > *": {
			position: "absolute",
		},
	},
	headerRoot: {
		height: "auto",
		top: 15,
		zIndex: 1000,
		"& > *": {
			color: "#fff",
			fontWeight: "bold",
			backgroundColor: "rgba(90, 90, 90, .7)",
			padding: "10px 25px",
			borderRadius: "20px",
		},
	},
	recordedRoot: {
		height: "auto",
		top: 0,
		zIndex: 1000,
		"& > *": {
			padding: 10,
			paddingTop: 0,
		},
	},
	footerRoot: {
		height: "calc(15vmin + 30px)",
		position: "relative",
		bottom: 0,
		background:
			"linear-gradient(0deg, rgba(0,0,0, 0), rgba(0,0,0,.3), rgba(0,0,0, 0))",
		"& > *": {
			position: "absolute",
		},
	},
	recordButton: {
		padding: 15,
		backgroundColor: "rgba(255, 255, 255, .4)",
		borderRadius: "50%",
		"& > *": {
			width: "13vmin",
			height: "13vmin",
			maxHeight: 70,
			maxWidth: 70,
			minHeight: 35,
			minWidth: 35,
			backgroundColor: "#fff",
			borderRadius: "50%",
		},
	},
}));

/* =================== This is the heart of the Camera Functionality =================== */

/**
 * This Function gets the Media of the device i.e the Device's camera & microphone
 * It streams the data from the camera to the video element in the DOM
 * It combines multiple audio nodes if present to be fed into the Recorder interface
 *
 */
export const getDeviceCamera = async (
	streamRef,
	videoRef,
	imgRef,
	recorderRef,
	videoConstraint,
	chunks,
	media,
	setTimer
) => {
	try {
		if (streamRef.current) {
			const tracks = streamRef.current.getTracks();
			tracks.forEach(track => track.stop());
			videoRef.current.srcObject = null;
			streamRef.current = null;
			recorderRef.current = null;
		}
		streamRef.current = await navigator.mediaDevices.getUserMedia(
			videoConstraint
		);

		const audioCtx = new AudioContext();
		const gainOpts = { gain: 1 };
		const gainNode = new GainNode(audioCtx, gainOpts);
		// const panOpts = { pan: 0 };
		// const panNode = new StereoPannerNode(audioCtx, panOpts);

		const destination = audioCtx.createMediaStreamDestination();

		const source = audioCtx.createMediaStreamSource(streamRef.current);
		source.connect(gainNode).connect(destination);

		// const
		videoRef.current.srcObject = streamRef.current;
		videoRef.current.volume = 0;

		const tracks = [
			...streamRef.current.getVideoTracks(),
			...destination.stream.getAudioTracks(),
		];
		const stream = new MediaStream(tracks);

		// Media Recorder Initialization
		recorderRef.current = new MediaRecorder(stream);
		recorderRef.current.ondataavailable = e => {
			chunks.push(e.data);
		};
		recorderRef.current.onstop = e => {
			const blob = new Blob(chunks, { type: "video/mp4" });

			chunks = [];

			setTimer(prev => ({ ...prev, size: blob.size / 1048576 }));
			if (media.media === "image") {
				const canvas = document.createElement("canvas");
				const height = videoRef.current.videoHeight,
					width = videoRef.current.videoWidth;
				canvas.width = width;
				canvas.height = height;
				const ctx = canvas.getContext("2d");
				ctx.drawImage(videoRef.current, 0, 0, width, height);
				canvas.toBlob(
					blob => {
						imgRef.current.src = URL.createObjectURL(blob);
						videoRef.current.srcObject = null;
					},
					"image/jpeg",
					1
				);

				return;
			}
			videoRef.current.srcObject = null;

			videoRef.current.volume = 1;
			videoRef.current.src = URL.createObjectURL(blob);
		};
	} catch (error) {
		console.log(error);
	}
};

/* =================== This Function switches the camera =================== */

/**
 *
 *All it does is to switch between the front and rear cameras if present
 *It also changes the views as the original media stream of the front camera is inverted
 */

export const returnChangeView = (setVideoConstraint, setVidScale) => {
	return function () {
		setVideoConstraint(prev => {
			if (prev.video.facingMode === "user") {
				setVidScale("scaleX(1)");
				return {
					...prev,
					video: { facingMode: "environment" },
				};
			} else {
				setVidScale("scaleX(-1)");
				return {
					...prev,
					video: { facingMode: "user" },
				};
			}
		});
	};
};

/* =================== This Function Sets and/or Stops Recording =================== */

// It decides whether the recording is a picture or video depending on the time frame recorded

export const setStopRecord = (
	hasRecorded,
	media,
	dispatch,
	recorderRef,
	setRecord
) => {
	const time = (hasRecorded.time2 - hasRecorded.time1) / 1000;
	media.media = "video";
	if (time < 0.1) {
		setTimeout(() => {
			setRecord({ isRecording: false, recorded: true });
			media.media = "image";
			recorderRef.current.stop();
		}, 120);
		return;
	}
	if (time <= 0.3) {
		setRecord({ isRecording: false, recorded: true });
		media.media = "image";
		recorderRef.current.stop();
		return;
	}
	if (time <= 0.9) {
		dispatch(
			openSnackBar({
				message: "Video is too short",
				duration: 3000,
				type: "error",
			})
		);
		recorderRef.current.stop();
		setRecord({ isRecording: false, recorded: false });

		return;
	}

	setRecord({ isRecording: false, recorded: true });
	recorderRef.current.stop();
};
