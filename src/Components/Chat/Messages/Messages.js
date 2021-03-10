import React, { useState, useEffect } from "react";

import { Grid, Typography, makeStyles, Avatar } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import TextBox from "./TextBox";
import { useDispatch, useSelector } from "react-redux";
import {
	markRead,
	performSocketHandShake,
	updateChatMessages,
	updateLastMessage,
} from "../../../redux/userChatsSlice";
import MyAudio from "../../SubComponents/MyAudio";
import ScrollToBottom from "../../SubComponents/Scroll-To-Bottom";

const useStyles = makeStyles(theme => ({
	root: {
		height: "100vh",
		width: "100vw",
		position: "fixed",
		top: 0,
		zIndex: 10,
		background: "linear-gradient(45deg, #ddd, #ddd, #fff)",
		transition: "all .5s cubic-bezier(0, .4, .6, 1)",
	},
	wrapper: {
		height: "100%",
		paddingBottom: 40,
		overflowY: "auto",
	},
	userMsgs: {
		// background: "linear-gradient(45deg, #e040fb, #aa00ff)",
		backgroundColor: "#ccc",
		borderRadius: 10,
		padding: "6px 12px",
		margin: "3px 0px",
		maxWidth: "90%",
		boxShadow:
			"0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
		alignSelf: "flex-end",
	},
	otherMsgs: {
		// background: "linear-gradient(45deg, #fffdd0, #fdfff5)",
		backgroundColor: "#fdfff5",
		borderRadius: 10,
		padding: "6px 12px",
		margin: "3px 0px",
		maxWidth: "90%",
		boxShadow:
			"0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
		alignSelf: "flex-start",
	},
}));

let connected = false;

const Messages = ({
	msgsData: { socketId, handle, imageUrl, i },
	audioStream,
	setDisplay,
	setStyles,
	styles,
}) => {
	const [roomId, setRoomId] = useState(socketId);

	const [audio, setAudio] = useState({ size: 0, src: "" });

	const classes = useStyles();
	const dispatch = useDispatch();

	const messages = useSelector(state => state.chats.messages.data[handle]);
	const { imageUrl: userImageUrl } = useSelector(state => state.user.data);

	let socket = window.socket || {};

	useEffect(() => {
		// connected = socket.connected
		if (connected) return;

		if (roomId && !connected) socket.emit("join", { roomId, handle });
		else {
			dispatch(performSocketHandShake());
		}

		socket.on("connected", () => (connected = true));

		socket.on("message", message => {
			dispatch(
				updateChatMessages({
					handle,
					data: { sender: "other-user", message },
				})
			);
			dispatch(updateLastMessage([i, message]));
		});

		return () => {
			// socket.emit("disconnect");
			// socket.off();
		};

		// eslint-disable-next-line
	}, [socketId, handle]);

	useEffect(() => {
		if (!messages) return;
		if (messages.unread.length === 0) return;
		dispatch(markRead(handle));

		// eslint-disable-next-line
	}, [messages ? messages.unread : null]);

	return (
		<div
			className={classes.root}
			onTransitionEnd={() => {
				if (styles === "110vh") {
					setDisplay(false);
				}
			}}
			style={{ transform: `translateY(${styles})` }}
		>
			<div className={classes.wrapper}>
				<Header setStyles={setStyles} handle={handle} imageUrl={userImageUrl} />

				<Grid
					container
					direction="column"
					style={{
						padding: 8,
						paddingTop: 57,
						minHeight: "100%",
						flexWrap: "nowrap",
						overflowY: "auto",
					}}
					justify="flex-end"
				>
					<ScrollToBottom>
						{messages &&
							messages.read.map((data, i) =>
								data.sender === "user" ? (
									<div key={i} className={classes.userMsgs}>
										<Typography variant="body2" component="span">
											{data.message}
										</Typography>
									</div>
								) : (
									<div key={i} className={classes.otherMsgs}>
										<Typography variant="body2" component="span">
											{data.message}
										</Typography>
									</div>
								)
							)}
						{messages &&
							messages.unread.map((data, i) =>
								data.sender === "user" ? (
									<div key={i} className={classes.userMsgs}>
										<Typography variant="body2" component="span">
											{data.message}
										</Typography>
									</div>
								) : (
									<div key={i} className={classes.otherMsgs}>
										<Typography variant="body2" component="span">
											{data.message}
										</Typography>
									</div>
								)
							)}
					</ScrollToBottom>
					<div className={classes.userMsgs} style={{ width: "90%", maxWidth: 245, padding: "6px 3px" }}>
						<MyAudio audio={audio} imageUrl={userImageUrl} />
					</div>
				</Grid>

				<TextBox
					handle={handle}
					roomId={roomId}
					i={i}
					setAudio={setAudio}
					audioStream={audioStream}
				/>
			</div>
		</div>
	);
};

export default Messages;

const Header = ({ setStyles, handle, imageUrl }) => {
	const handleBackButton = () => {
		setStyles("110vh");
	};
	return (
		<Grid
			style={{
				borderBottom: "1px solid #aaa",
				color: "#fff",
				position: "fixed",
				top: 0,
				background: "linear-gradient(45deg, #aa00ff, #2196f3)",
			}}
			alignItems="center"
			container
		>
			<Grid
				onClick={handleBackButton}
				style={{ padding: "0px 12px 0px 4px", height: 24 }}
				item
			>
				<KeyboardBackspaceIcon />
			</Grid>
			<Grid item style={{ marginRight: 8, padding: "8px 0px" }}>
				<Avatar src={imageUrl} style={{ height: 35, width: 35 }} />
			</Grid>
			<Grid item>
				<Typography
					style={{ fontWeight: "bold" }}
					variant="caption"
					component="span"
				>
					{handle}
				</Typography>
			</Grid>
		</Grid>
	);
};
