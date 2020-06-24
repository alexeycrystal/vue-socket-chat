import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth'
import chat from './modules/chat'
import test from './modules/test'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    auth,
    chat,
    test,
  }
});
