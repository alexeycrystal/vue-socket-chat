import Vue from 'vue';

const state = {
  testValue: {},
};

const getters = {
  getTestValue(state) {
    return state.testValue;
  },
};

const mutations = {
  setTestValue: (state, payload) => {
    Vue.set(state.testValue, payload.key, payload.value);
  },
  appendToTestValue: (state, payload) => {
    state.testValue[payload.key].push(payload.value);
  },
};

const actions = {
  updateTestValue: (context, payload) => {
    context.commit('setTestValue', payload);
  },
  appendTestValue: (context, payload) => {
    context.commit('appendToTestValue', payload);
  },
};

const test = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default test;
