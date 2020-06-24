import SocketIO from "socket.io-client";
import Echo from "laravel-echo";
import { store } from '../../store'


window.io = SocketIO;

const echo = new Echo({
  broadcaster: 'socket.io',
  host: window.location.hostname + ':6001',
  transports: ['websocket', 'polling'],
  auth: {
    headers: {
      'Authorization': 'Bearer ' + store.getters["auth/getToken"],
    }
  }
});

export default echo;
