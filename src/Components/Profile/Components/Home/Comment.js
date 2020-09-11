import React from "react";
import { Grid, Typography, Avatar, makeStyles } from "@material-ui/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
	root: {
		margin: theme.spacing(1, 1, 1, 0)
	},
	avatarGrid: {
		padding: " 4px 12px 8px",
		"& > *": {
			height: 35,
			width: 35,
		},
	},
	handle: {
		fontWeight: "bold",
		marginRight: 6,
		"& > *": {
			color: "#000",
		},
	},
}));

const Comment = ({ comment, createdAt, handle, imgUrl }) => {
	dayjs.extend(updateLocale);
	dayjs.extend(relativeTime);
	dayjs.updateLocale("en", {
		relativeTime: {
			future: "in %s",
			past: "%s ago",
			s: "%ds",
			m: "one min",
			mm: "%dmin",
			h: "1h",
			hh: "%dh",
			d: "1d",
			dd: "%dd",
			M: "1m",
			MM: "%dm",
			y: "1y",
			yy: "%dy",
		},
	});
	
	const classes = useStyles();

	return (
		<Grid container  item xs={12}>
			<Grid className={classes.avatarGrid} item >
				<Avatar src={imgUrl} />
			</Grid>
			<Grid item xs= {9} sm= {10} >
				<Typography
					variant="body2"
					className={classes.handle}
					gutterBottom={true}
					component="span"
				>
					<Link to={handle}>{handle}</Link>
				</Typography>
				<Typography variant="body2" color="textPrimary" component="span">
					{comment}
				</Typography>
				<Typography variant="caption" color="textSecondary" component="div">
					{dayjs(createdAt).fromNow()}
				</Typography>
			</Grid>
		</Grid>
	);
};

export default Comment;
