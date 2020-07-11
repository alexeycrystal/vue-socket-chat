import axios from 'axios';
import router from "../../../router";

const state = {
  auth: {
    token: null,
    logged_user_id: null,
  }
};

const getters = {
  getToken(state) {
    return state.auth.token;
  },
  getLoggedUserId(state) {
    return state.auth.logged_user_id;
  }
};

const mutations = {
  setToken: (state, payload) => {
    state.auth.token = payload;
  },
  setLoggedUserId: (state, payload) => {
    state.auth.logged_user_id = payload;
  },
};

const actions = {
  login: async (context, payload) => {

    let params = {
      email: payload.email,
      password: payload.password,
    };

    await axios.post('/auth/login', params)
      .then(response => {

        let data = response.data.data;

        if (data && data.token) {

          context.commit('setToken', data.token);
          context.commit('setLoggedUserId', data.user_id);

          return {data};
        }
      }).catch(error => {
        return Promise.reject(error);
      });
    },
  register: async (context, payload) => {
    let params = {
      email: payload.email,
      password: payload.password,
      password_confirmation: payload.password_confirmation,
      name: payload.name,
      lang: payload.lang,
    };

    await axios.post('/auth/registration', params)
      .then(response => {

        let data = response.data.data;

        if (data && data.token) {
          context.commit('setToken', data.token);
          context.commit('setLoggedUserId', data.user_id);
          return {data};
        }
      }).catch(error => {
        return Promise.reject(error);
      });
  },
  setToken: (context, payload) => {
    context.commit('setToken', payload);
  },
  logout({commit}, payload) {
    commit('setToken', null);
    commit('setLoggedUserId', null);
    router.push('/login');
    commit("resetState", null, { root: true });
  }
};

const auth = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default auth;


