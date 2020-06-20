import Vue from 'vue'
import App from './App.vue'

import {store} from './store'
import {router} from './router'

import axios from 'axios'

import echo from './util/echo'

import development from './config/development.json'
import production from './config/production.json'

import veevalidate from './util/veevalidate'

let config = process.env.NODE_ENV === 'production'
  ? production
  : development;
Vue.prototype.$config = Object.freeze(config);

Vue.prototype.$echo = echo;

axios.defaults.baseURL = config.apiUrl;

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
