import React, { useEffect, useRef } from "react";

import {
	Button,
	Divider,
	Grid,
	IconButton,
	makeStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import Rotate90DegreesCcwIcon from "@material-ui/icons/Rotate90DegreesCcw";

import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

const useStyles = makeStyles(theme => ({
	root: {
		position: "fixed",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 1200,
		overflow: "hidden",
		backgroundColor: "#123",

		height: "100vh",
	},
	headerRoot: {
		zIndex: 10,
		height: 45,
	},
	imageContainer: {
		height: "calc(100vh - 110px)",
		"& > *": {
			height: "inherit",
		},
	},
	image: {
		maxWidth: "100%",
		height: "auto",
		display: "block",
	},
	footerRoot: {
		position: "fixed",
		bottom: 0,
		height: 65,
		backgroundColor: "#123",
	},
}));

const CropRotate = ({ imageSrc, setDisplay, clear, setImageSrc }) => {
	const classes = useStyles();
	const imageRef = useRef(null);
	const cropperRef = useRef(null);
	useEffect(() => {
		cropperRef.current = new Cropper(imageRef.current, {
			viewMode: 2,
			zoom: function (event) {
				// Keep the image in its natural size
				if (event.detail.oldRatio === 1) {
					event.preventDefault();
				}
			},
		});

		// eslint-disable-next-line
	}, []);

	return (
		<div className={classes.root}>
			<Grid>
				<Header
					classes={classes}
					setDisplay={setDisplay}
					cropper={cropperRef}
					setImageSrc={setImageSrc}
				/>
				<Grid item className={classes.imageContainer} xs={12}>
					<div>
						<img
							ref={imageRef}
							src={imageSrc}
							className={classes.image}
							id="crop-image"
							alt="crop"
						/>
					</div>
				</Grid>
				<Divider />
				<Footer classes={classes} cropper={cropperRef} />
			</Grid>
		</div>
	);
};

export default CropRotate;

const Header = ({ classes, setDisplay, cropper, setImageSrc }) => {
	return (
		<Grid container item alignItems="center" className={classes.headerRoot}>
			<Grid item style={{ flexGrow: 1 }}>
				<IconButton
					onClick={() => {
						setDisplay(false);
					}}
				>
					<CloseIcon style={{ color: "#fff" }} />
				</IconButton>
			</Grid>
			<Grid item style={{ paddingRight: 15 }}>
				<IconButton
					onClick={() => {
						cropper.current.getCroppedCanvas().toBlob(
							blob => {
								const url = URL.createObjectURL(blob);

								setImageSrc(url);
								setDisplay(false);
							},
							"image/jpeg",
							0.9
						);
					}}
				>
					<DoneIcon style={{ color: "#fff" }} />
				</IconButton>
			</Grid>
		</Grid>
	);
};

const Footer = ({ classes, cropper }) => {
	return (
		<Grid
			container
			item
			alignItems="center"
			justify="space-around"
			className={classes.footerRoot}
		>
			<Grid item style={{ paddingRight: 15 }}>
				<IconButton
					onClick={() => {
						let height = window.innerHeight / 2;
						console.log(height);
						let width = window.innerWidth / 2;
						cropper.current.setCropBoxData({
							width: 100,
							height: 100,
							left: width,
							top: height,
						});
						cropper.current.rotate(-90);
					}}
				>
					<Rotate90DegreesCcwIcon
						style={{ fontSize: "1.85rem" }}
						color="primary"
					/>
				</IconButton>
			</Grid>
			<Grid item style={{ paddingRight: 15 }}>
				<Button
					variant="contained"
					color="primary"
					size="small"
					onClick={() => {
						cropper.current.reset();
					}}
				>
					Reset
				</Button>
			</Grid>
		</Grid>
	);
};
