import React, { useEffect } from "react";

import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const StoryHeader = ({ setStyle, setDisplay, children, style }) => {
	style = style || {};

	const handleBackButton = () => {
		setStyle("-110vw");
		setTimeout(() => {
			setDisplay(false);
		}, 600);
	};

	useEffect(() => {
		setStyle(0);

		// eslint-disable-next-line
	}, []);

	return (
		<Grid
			style={{
				position: "relative",
				height: "45px",
				alignItems: "center",
				background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))",
				...style,
			}}
			container
		>
			<Grid style={{ flexGrow: 1 }} item>
				{children}
			</Grid>
			<Grid style={{ paddingLeft: "1rem" }} item>
				<IconButton
					onClick={handleBackButton}
					style={{ marginRight: 5, marginLeft: ".5rem", color: "#fff" }}
				>
					<KeyboardBackspaceIcon style={{ transform: "rotateY(180deg)" }} />
				</IconButton>
			</Grid>
		</Grid>
	);
};

export default StoryHeader;
