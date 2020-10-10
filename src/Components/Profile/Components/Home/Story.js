import React, { useState } from "react";

import { motion } from "framer-motion";

import { Tab, Tabs, makeStyles } from "@material-ui/core";

import CameraDevice from "../../../SubComponents/CameraDevice";
import TypeSelect from "./TypeSelect";
import MediaSelect from "./MediaSelect";

const useStyles = makeStyles(theme => ({
	root: {
		height: "100vh",
		width: "100vw",
		position: "fixed",
		zIndex: 1100,
		top: 0,
		backgroundColor: "#fff",
		color: "#fff",
	},
	footerTab: {
		position: "fixed",
		bottom: 0,
		zIndex: 10,
		width: "100%",
		paddingBottom: 3,
		background: "linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.3))",
	},
}));

const Story = ({ setDisplay }) => {
	const [styles, setStyles] = useState("-100vw");
	const [selected, setSelected] = useState(0);

	const classes = useStyles();

	const handleChange = (e, newSelected) => {
		setSelected(newSelected);
	};

	return (
		<motion.div
			className={classes.root}
			style= {{ transform: `translateX(${styles})`, transition: "all .5s cubic-bezier(0, .4, .6, 1)"}}
		>
			<div style={{ height: "100%", width: "100%", position: "relative" }}>
				<div className={classes.footerTab}>
					<Tabs
						indicatorColor="secondary"
						value={selected}
						variant="fullWidth"
						textColor="inherit"
						onChange={handleChange}
					>
						<Tab
							style={{ fontSize: ".7rem", FontWeight: "bold" }}
							label="TYPE"
						/>
						<Tab
							style={{ fontSize: ".7rem", FontWeight: "bold" }}
							label="CAMERA"
						/>
						<Tab
							style={{ fontSize: ".7rem", FontWeight: "bold" }}
							label="MEDIA"
						/>
					</Tabs>
				</div>

				{selected === 0 && (
					<TypeSelect setStyles={setStyles} setDisplay={setDisplay} />
				)}
				{selected === 1 && <CameraDevice classes={classes} />}
				{selected === 2 && (
					<MediaSelect setStyles={setStyles} setDisplay={setDisplay} />
				)}
			</div>
		</motion.div>
	);
};
export default Story;
