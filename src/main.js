import Vue from 'vue'
import App from './App.vue'

import {store} from './store'
import router from './router'
import axios from './util/axios'

import echo from './util/echo'

import development from './config/development.json'
import production from './config/production.json'

import veevalidate from './util/veevalidate'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import VModal from 'vue-js-modal'

//import 'font-awesome/scss/font-awesome.scss';
//import 'reset-css/sass/_reset.scss'

let config = process.env.NODE_ENV === 'production'
  ? production
  : development;
Vue.prototype.$config = Object.freeze(config);

Vue.prototype.$echo = echo;

axios.defaults.baseURL = config.apiUrl;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VModal, {
  dynamic: true,
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
