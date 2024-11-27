import { io } from "socket.io-client";

let socket = null;

if (!socket) {
    socket = io("http://localhost:3000", {
        autoConnect: false, // Desactiva conexión automática
        withCredentials: true,
        extraHeaders: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
}

export default socket;
