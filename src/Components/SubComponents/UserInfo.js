import React from "react";
import { Avatar, CardHeader, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	root: {
		"& > :nth-child(2)": {
			overflow: "hidden",
			"& > span": {
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap",
			},
		},
	},
});

const UserInfo = ({ imageUrl, header, subheader }) => {
	const classes = useStyles();
	return (
		<CardHeader
			className={classes.root}
			style={{ height: 65, background: "none", paddingRight: 10 }}
			title={
				<Typography
					color="textPrimary"
					style={{ fontWeight: "bold", fontSize: ".95rem" }}
				>
					{header}
				</Typography>
			}
			subheader={
				<Typography
					style={{
						fontWeight: "inherit",
						fontSize: ".875rem",
						color: "inherit",
						display: "block",
					}}
					component="span"
				>
					{subheader}
				</Typography>
			}
			avatar={<Avatar style={{ height: 45, width: 45 }} src={imageUrl} />}
		/>
	);
};

export default UserInfo;
