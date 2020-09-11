import React from "react";

import {
	Avatar,
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
		<CardActionArea style={{ height: 65 }}>
			<Link to="" style={{ height: "inherit", width: "inherit" }}>
				<CardHeader
					style={{ height: 60, background: "none", paddingLeft: 10 }}
					title={
						<Typography
							color="textPrimary"
							style={{ fontWeight: "bold" }}
							component="span"
							variant="body2"
							gutterBottom
						>
							{notification.sender}

							{notification.type === "comment"
								? " commented on your post"
								: " liked your post"}
						</Typography>
					}
					subheader={
						<>
							<div style={{ display: "flex" }}>
								<Typography
									color="textSecondary"
									style={{ flexGrow: 1 }}
									component="span"
									variant="body2"
									gutterBottom
								>
									{/* {notification.post.slice(0, 25)}... */}
									Hello world...
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
						</>
					}
					avatar={
						<Avatar
							style={{ height: 45, width: 45 }}
							src={notification.senderUrl}
						/>
					}
				/>
			</Link>
		</CardActionArea>
	);
};

export default Notification;
