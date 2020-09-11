import io from "socket.io-client";

const ENDPOINT = "localhost:5000";
export let socket = io(ENDPOINT);


