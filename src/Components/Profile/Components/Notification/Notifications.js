import React from "react";

import { Grid, Paper, Typography } from "@material-ui/core";

import { useSelector } from "react-redux";
import Notification from "./Notification";
import { useStyles } from "../Account/styles";

export default () => {
	const readNotifications = useSelector(state => state.user.notifications.read);
	const unreadNotifications = useSelector(
		state => state.user.notifications.unread
	);
	return (
		<div>
			<Grid container spacing= {1}>
				<Grid item xs={12}>
					<Header />
				</Grid>

				<Grid container item xs={12}>
					{unreadNotifications.map(notification => {
						return (
							<Notification key={notification.id} notification={notification} />
						);
					})}
				</Grid>
				<Grid container item xs={12}>
					{readNotifications.map(notification => (
						<Notification
							key={notification.commentId}
							notification={notification}
						/>
					))}
				</Grid>
			</Grid>
		</div>
	);
};

const Header = () => {
	const classes = useStyles();

	return (
		<Paper style={{ borderBottom: "1px solid #aaa" }} square elevation={0}>
			<Grid className={classes.headerRoot} container>
				<Grid className={classes.headerNameContainer} item>
					<Typography
						className={classes.headerName}
						variant="body2"
						component="span"
					>
						Notifications
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};
