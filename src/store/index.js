import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from "vuex-persistedstate";

import auth from './modules/auth';
import chat from './modules/chat';
import user from './modules/user';
import websocket from './modules/websocket';
import search from "./modules/search";

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ['auth'],
    })],
  modules: {
    auth,
    chat,
    user,
    websocket,
    search,
  }
});
