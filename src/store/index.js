import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from "vuex-persistedstate";

import auth from './modules/auth';
import chat from './modules/chat';
import user from './modules/user';
import websocket from './modules/websocket';
import search from "./modules/search";
import contact from "./modules/contact";
import settings from "./modules/settings";

import _ from 'lodash';

Vue.use(Vuex);

const modules = {
  auth,
  chat,
  user,
  websocket,
  search,
  contact,
  settings,
};

export const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ['auth'],
    })],
  mutations: {
    resetState(state) {
      _.forOwn(modules, (value, key) => {
        state[key] = _.cloneDeep(value.state);
      });
    },
  },
  modules: _.cloneDeep(modules),
});
