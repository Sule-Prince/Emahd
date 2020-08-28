import React, { useState } from "react";

import { IconButton, Grid, Paper, makeStyles } from "@material-ui/core";

import PhotoCamera from "@material-ui/icons/PhotoCamera";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles(theme => ({
	textarea: {
		border: "none",
		resize: "none",
		flexGrow: 1,
		height: 150,
		marginTop: 0,
		paddingTop: "1rem",
		paddingLeft: "1rem",
		"&:focus": {
			border: "none",
			outline: "none",
		},
	},
	screamContainer: {
		zIndex: 10000,
		overflowY: "auto",
		height: "100vh",
		width: "100vw",
		transition: "all .5s cubic-bezier(0, .4, .6, 1)",
		backgroundColor: "#fff",
		position: "absolute",
		padding: "10px 5px",
		paddingTop: 0,
		top: 0,
	},
	inputDiv: {
		display: "flex",
		paddingRight: 10,
	},
	media: {
		height: "100%",
		width: "100%",
		objectFit: "cover",
	},
}));

const AddScreamPage = ({
	styles,
	setStyles,
	screamInputEl,
	file,
	setScream,
	setFile,
	storeData,
	scream,
}) => {
	const classes = useStyles();

	const [mediaUrl, setMediaUrl] = useState(null);
	const [fileCodec, setFileCodec] = useState(null);

	const handleFileUpload = e => {
		const file = e.target.files[0];
		if (!file) return;
		setFile(file);
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.addEventListener("load", e => setMediaUrl(reader.result));
		if (file.type.startsWith("image")) {
			setFileCodec("image");
			return;
		}
		setFileCodec("video");
	};

	return (
		<div
			className={classes.screamContainer}
			style={{
				transform: `translateY(${styles})`,
			}}
			onClick={() => {
				screamInputEl.current.focus();
			}}
		>
			<Grid
				container
				justify="center"
				alignItems="center"
				style={{
					backgroundColor: "#fff",
					padding: "5px 10px",
					paddingLeft: 0,
				}}
			>
				<Grid item>
					<IconButton
						color="primary"
						onClick={() => {
							setStyles("110vh");
							setMediaUrl(null);
							setScream("");
						}}
					>
						<CloseIcon />
					</IconButton>
				</Grid>
				<Grid
					item
					style={{
						flexGrow: 1,
						display: "flex",
						justifyContent: "flex-end",
					}}
				>
					<IconButton
						disabled={scream.trim() ? false : true}
						color="primary"
						onClick={() => {
							setMediaUrl(null);
							setStyles("110vh");
							setScream("");
							if (scream) storeData("/scream", scream, fileCodec);
						}}
					>
						<SendIcon />
					</IconButton>
				</Grid>
			</Grid>
			<div className={classes.inputDiv}>
				<textarea
					ref={screamInputEl}
					value={scream}
					className={classes.textarea}
					placeholder="Type something here...."
					onChange={e => {
						setScream(e.target.value);
					}}
				></textarea>
				<input
					type="file"
					id="upload-image"
					style={{ display: "none" }}
					accept="image/*, video/*"
					multiple
					onChange={handleFileUpload}
				/>
				<label htmlFor="upload-image">
					<IconButton color="primary" component="span">
						<PhotoCamera />
					</IconButton>
				</label>
			</div>

			{mediaUrl && (
				<Grid container justify="center">
					<Grid item xs={11}>
						<Paper style={{ height: "91vw", padding: 10 }} elevation={3}>
							{fileCodec === "image" ? (
								<img className={classes.media} src={mediaUrl} alt="post" />
							) : (
								<video
									controls
									className={classes.media}
									src={mediaUrl}
									alt="post"
								/>
							)}
						</Paper>
					</Grid>
				</Grid>
			)}
		</div>
	);
};

export default AddScreamPage;
