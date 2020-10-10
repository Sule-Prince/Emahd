import React, { useState, useRef } from "react";

import { makeStyles, IconButton } from "@material-ui/core";
import PhotoLibraryRoundedIcon from "@material-ui/icons/PhotoLibraryRounded";

import StoryHeader from "./StoryHeader";
import PostEdits from "../../../SubComponents/PostEdits";

const useStyles = makeStyles({
	root: {
		height: "100%",
		width: "100%",
		background: "#607d8b",
	},
});

const MediaSelect = ({ setStyles, setDisplay }) => {
	const classes = useStyles();
	const [src, setSrc] = useState(null);
	const [imgstyles, setImgStyles] = useState({ height: 0, width: 0 });

	const imgRef = useRef(null);

	const handleImageSelect = e => {
		if (src) URL.revokeObjectURL(src);
		const file = e.target.files[0];
		if (!file) return;
		const url = URL.createObjectURL(file);

		setSrc(url);
	};

	return (
		<div className={classes.root}>
			<StoryHeader setDisplay={setDisplay} setStyles={setStyles}>
				<label htmlFor="media-input">
					<IconButton color="primary" component="span">
						<PhotoLibraryRoundedIcon />
					</IconButton>
				</label>
			</StoryHeader>
			<input
				type="file"
				id="media-input"
				accept="image/*, video/*"
				style={{ display: "none" }}
				onChange={handleImageSelect}
			/>

			{src && (
				<div style= {{ position: "relative"}}>
					<PostEdits src={src} setSrc={setSrc} />

					<img
						src={src}
						style={{ ...imgstyles, transformOrigin: "top left" }}
						ref={imgRef}
						onLoad={e => {
							const height = e.target.naturalHeight;
							const width = e.target.naturalWidth;

							let scale = 1,
								scaleX = window.innerWidth / width,
								scaleY = (window.innerHeight - 95) / height;

							if (scaleX > scaleY) scale = scaleX;
							else scale = scaleY;
							setImgStyles({
								height,
								width,
								transform: `scale(${scale})`,
							});
						}}
						alt="Story Media"
					/>
				</div>
			)}
		</div>
	);
};

export default MediaSelect;
