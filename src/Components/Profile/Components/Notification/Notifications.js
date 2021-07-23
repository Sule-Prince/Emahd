import React, { useEffect } from "react";

import { Grid, Paper, Typography } from "@material-ui/core";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import { useSelector } from "react-redux";
import Notification from "./Notification";

import { useStyles } from "../Account/styles";
import { projectFirestore } from "../../../../firebase/FBConfig";

import notificationSvg from "../../../assets/graphics/placeholder_svg/push_notifications.svg";

export default () => {
  const readNotifications = useSelector(
    (state) => state.user.notifications.read
  );
  const unreadNotifications = useSelector(
    (state) => state.user.notifications.unread
  );
  const userId = useSelector((state) => state.user.data.userId);

  useEffect(() => {
    if (userId && unreadNotifications.length > 0) {
      setTimeout(() => {
        let readNotifications = [];
        projectFirestore
          .doc(`/notifications/${userId}`)
          .get()

          .then((snapshot) => {
            readNotifications = [
              ...snapshot.data().unread,
              ...snapshot.data().read,
            ];
            if (readNotifications.length > 30)
              readNotifications = readNotifications.slice(0, 30);
            projectFirestore.doc(`/notifications/${userId}`).set({
              read: readNotifications,
              unread: [],
            });
          })
          .catch((err) => {
            console.error(err);
          });
      }, 3000);
    }

    // eslint-disable-next-line
  }, [userId, unreadNotifications]);

  return (
    <div style={{ backgroundColor: "#f9f9f9", height: "calc(100vh - 60px)" }}>
      <Grid
        container
        style={{ maxHeight: "calc(100vh - 56px)", overflowY: "auto" }}
        spacing={1}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        {readNotifications.length === 0 && unreadNotifications.length === 0 ? (
          <Grid
            container
            direction="column"
            justify="center"
            spacing={1}
            style={{
              padding: "0px 16px",
              height: "calc(100vh - 100px - 1.6vmin)",
            }}>
            <Grid item>
              <img
                style={{ width: "100%" }}
                src={notificationSvg}
                alt="notifications placeholder"
              />
            </Grid>
            <Grid item>
              <Typography
                variant="h5"
                style={{ fontWeight: "bold" }}
                align="center"
                color="textSecondary">
                Catch up with the activities going on around you, friends and
                family.
              </Typography>
            </Grid>
          </Grid>
        ) : null}

        {unreadNotifications.map((notification) => {
          return (
            <Notification
              key={notification.id}
              color="#e0e0e0"
              notification={notification}
            />
          );
        })}

        {readNotifications.map((notification) => (
          <Notification key={notification.id} notification={notification} />
        ))}
      </Grid>
    </div>
  );
};

const Header = () => {
  const classes = useStyles();

  return (
    <>
      <Paper
        style={{
          zIndex: 1,
          position: "fixed",
          width: "100%",
        }}
        square
        elevation={2}>
        <Grid alignItems="center" className={classes.headerRoot} container>
          <Grid className={classes.headerNameContainer} item>
            <Typography
              className={classes.headerName}
              variant="body1"
              component="span">
              Activities
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <div style={{ height: "calc(40px + 1.6vmin)" }}></div>
    </>
  );
};
