import React from "react";

import {
	Avatar,
	Grid,
	CardActionArea,
	CardHeader,
	Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

const Notification = ({ notification }) => {
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

	return (
		<Grid item xs={12}>
			<CardActionArea style={{ height: 70 }}>
				<Link to="" style={{ height: "inherit", width: "inherit" }}>
					<CardHeader
						style={{ height: 60, background: "none", paddingLeft: 10 }}
						title={
							<div style={{ paddingTop: 8 }}>
								<Typography
									color="textPrimary"
									style={{ fontWeight: "bold", flexGrow: 1 }}
									component="span"
									variant="body2"
									gutterBottom
								>
									{notification.sender}

									{notification.type === "comment"
										? " commented on your post"
										: " liked your post"}
								</Typography>
								{notification.type === "like" ? (
									<Typography
										color="textSecondary"
										variant="caption"
										style={{ marginRight: 5, marginLeft: 10 }}
										component="p"
									>
										{dayjs(notification.createdAt).fromNow()}
									</Typography>
								) : null}
							</div>
						}
						subheader={
							notification.type === "comment" ? (
								<div style={{ display: "flex" }}>
									<Typography
										color="textSecondary"
										style={{ flexGrow: 1 }}
										component="span"
										variant="body2"
										gutterBottom
									>
										{notification.comment + "..."}
									</Typography>
									<Typography
										color="textSecondary"
										variant="caption"
										style={{ marginRight: 5 }}
										component="span"
									>
										{dayjs(notification.createdAt).fromNow()}
									</Typography>
								</div>
							) : null
						}
						avatar={
							<Avatar
								style={{ height: 45, width: 45 }}
								src={notification.senderUrl ? notification.senderUrl : null}
							/>
						}
					/>
				</Link>
			</CardActionArea>
		</Grid>
	);
};

export default Notification;
