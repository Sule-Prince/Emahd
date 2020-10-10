import React, { useState, useEffect } from 'react';

import { Grid, Typography, Paper, makeStyles } from "@material-ui/core"

const Messages = () => {
const socket = io()

    const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);


	useEffect(() => {
		socket.emit("join", "123456");
		socket.on("message", data => {
			console.log(data);
		});

		return () => {
			socket.emit("disconnect");
		};
	}, []);

    useEffect(() => {
        
    }, [])
    return (
        <Grid container >

        </Grid>
    );
}

export default Messages;
