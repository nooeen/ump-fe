import socketIOClient from "socket.io-client";
const serverEndpoint = "http://localhost:3000";


export const socket = socketIOClient(serverEndpoint, {
    transports: ['websocket']
});