import Vue from 'vue'
import App from './App.vue'

import {store} from './store'
import {router} from "./router";

import development from "./config/development.json";
import production from "./config/production.json";

import Echo from "laravel-echo"
import SocketIO from "socket.io-client"

window.io = SocketIO;

if (typeof io !== 'undefined') {
  window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: window.location.hostname + ':6001',
    transports: ['websocket', 'polling'],
  });
} else {
  console.log('Not connected to socket.io');
}

if (process.env.NODE_ENV === "production") {
  Vue.prototype.$config = Object.freeze(production);
} else {
  Vue.prototype.$config = Object.freeze(development);
}

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
