import React, { useEffect, useState } from "react";

import { Grid, IconButton, makeStyles } from "@material-ui/core";

import TextFormatIcon from "@material-ui/icons/TextFormat";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import CropRotateIcon from "@material-ui/icons/CropRotate";
import AddImageText from "./AddImageText";
import CropRotate from "./CropRotate";

const useStyles = makeStyles(theme => ({
	root: {
		position: "absolute",
		zIndex: 10,
		padding: "4px 0px",
		height: 50,
		width: "100%",
		background:
			"linear-gradient(180deg, rgba(0, 0, 0, .4) 35%, rgba(0, 0, 0, 0) 100%)",
	},
	container: {
		display: "flex",
		"& > *": {
			marginRight: "9%",
		},
		"& > :last-child": {
			marginRight: "0px",
		},
	},
	freeDraw: {
		"& > :nth-child(2)": {
			fillOpacity: 1,
		},
	},
}));

const PostEdits = ({ src, clear, setSrc, textSettings, setTextSettings, style }) => {
	style= style || {}
	const classes = useStyles();

	const [openText, setOpenText] = useState(false);
	const [openCropRotate, setOpenCropRotate] = useState(false);

	const openAddText = () => {
		setOpenText(true);
	};

	useEffect(() => {
		if (clear) {
			clear(true);
		}

		return () => {
			if (clear) {
				clear(false);
			}
		};
	}, [clear]);

	return (
		<div className={classes.root} style= {style}>
			<Grid justify="center" container className={classes.container}>
				<Grid item>
					<IconButton onClick={() => setOpenCropRotate(true)}>
						<CropRotateIcon style={{ color: "#fff", fontSize: 32 }} />
					</IconButton>

					{openCropRotate && (
						<CropRotate
							imageSrc={src}
							setImageSrc={setSrc}
							setDisplay={setOpenCropRotate}
						/>
					)}
				</Grid>

				<Grid item>
					<IconButton onClick={openAddText}>
						<TextFormatIcon
							style={{ color: "#fff", fontSize: 40, marginTop: -3 }}
						/>
					</IconButton>
					{openText && (
						<AddImageText
							src={src}
							setOpen={setOpenText}
							textSettings={textSettings}
							setTextSettings={setTextSettings}
						/>
					)}
				</Grid>

				<Grid item>
					<IconButton style={{ marginTop: 3 }}>
						<BorderColorIcon
							className={classes.freeDraw}
							style={{ color: "#fff", fontSize: 25 }}
						/>
					</IconButton>
				</Grid>
			</Grid>
		</div>
	);
};

export default PostEdits;
