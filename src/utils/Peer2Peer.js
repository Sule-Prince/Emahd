import React, { useEffect, useRef } from "react";

import Peer from "simple-peer";

const Peer2Peer = () => {

    const videoRef = useRef();

	useEffect(() => {
		navigator.getUserMedia(
			{ media: true, audio: true },
			stream => {
				let peer = new Peer({
					initiator: window.location.hash === "#init",
					stream,
					trickle: false,
				});
				peer.on("signal", data => {
					document.getElementById("myId").value = JSON.stringify(data);
				});

				document.getElementById("connect").addEventListener("click", () => {
					let otherId = JSON.parse(document.getElementById("otherId").value);
					peer.signal(otherId);
				});

				peer.on("stream", stream => {
					const video = document.getElementById("stream");
					console.log(stream);
					console.log(video);
					video.srcObject = stream;
					video.play();
				});
			},
			error => {
				console.log(error);
			}
		);



		const videoElem = document.getElementById("video-share");
		const logElem = document.getElementById("log");
		const startElem = document.getElementById("start");
		const stopElem = document.getElementById("stop");

		// Options for getDisplayMedia()

		var displayMediaOptions = {
			video: {
				cursor: "always",
			},
			audio: true,
		};

		// Set event listeners for the start and stop buttons
		startElem.addEventListener(
			"click",
			function (evt) {
				startCapture();
			},
			false
		);

		stopElem.addEventListener(
			"click",
			function (evt) {
				stopCapture();
			},
			false
		);

		console.log = msg => (logElem.innerHTML += `${msg}<br>`);
		console.error = msg =>
			(logElem.innerHTML += `<span class="error">${msg}</span><br>`);
		console.warn = msg =>
			(logElem.innerHTML += `<span class="warn">${msg}<span><br>`);
		console.info = msg =>
			(logElem.innerHTML += `<span class="info">${msg}</span><br>`);

		async function startCapture() {
			logElem.innerHTML = "";

			try {
				videoRef.current.srcObject = await navigator.mediaDevices.getDisplayMedia(
					displayMediaOptions
				);
				dumpOptionsInfo();
			} catch (err) {
				console.error("Error: " + err);
			}
		}

		function stopCapture(evt) {
			let tracks = videoElem.srcObject.getTracks();

			tracks.forEach(track => track.stop());
			videoElem.srcObject = null;
		}

		function dumpOptionsInfo() {
			const videoTrack = videoElem.srcObject.getVideoTracks()[0];

			console.info("Track settings:");
			console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
			console.info("Track constraints:");
			console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
		}

		return () => {};
	}, []);

	return (
		<div style= {{ maxHeight: "70vh", overflowY: "auto"}}>
			<textarea type="text" id="myId" placeholder="Enter your id" />
			<textarea type="text" id="otherId" placeholder="Other id" />
			<input type="button" id="connect" value="Connect" />
			<video
				id="stream"
				style={{
					minWidth: 300,
					minHeight: 500,
				}}
			></video>

			<p>
				This example shows you the contents of the selected part of your
				display. Click the Start Capture button to begin.
			</p>

			<p>
				<button id="start">Start Capture</button>&nbsp;
				<button id="stop">Stop Capture</button>
			</p>

			<video ref= {videoRef} id="video-share" autoPlay></video>
			<br />

			<strong>Log:</strong>
			<br />
			<pre id="log"></pre>
		</div>
	);
};

export default Peer2Peer;
