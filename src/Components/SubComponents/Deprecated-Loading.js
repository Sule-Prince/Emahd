import React from "react";
import { CircularProgress } from "@material-ui/core";

const Loading = ({ classes, children }) => {
	return (
		<div className={classes.loadingRoot}>
			{children}
			<div className={classes.loadingDiv}>
				<CircularProgress />
			</div>
		</div>
	);
};

export default Loading;
