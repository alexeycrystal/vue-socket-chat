import SocketIO from "socket.io-client";
import Echo from "laravel-echo";

window.io = SocketIO;

const echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001',
    transports: ['websocket', 'polling'],
});

export default echo;
