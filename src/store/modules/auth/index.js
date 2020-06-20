import axios from 'axios';

const state = {
  auth: {
    token: null,
  }
};

const getters = {
  getToken(state) {
    return state.auth.token;
  }
};

const mutations = {
  setToken: (state, payload) => {
    state.auth.token = payload;
  },
};

const actions = {
  login: async (context, payload) => {

    let params = {
      email: payload.email,
      password: payload.password,
    };

    let result = await axios.post('/auth/login', params)
      .then(response => {

        let data = response.data.data;

        if (data && data.token) {
          context.commit('setToken', data.token);
          return {data};
        }
      }).catch(error => {
        return Promise.reject(error);
      });

    return result;
  },
  setToken: (context, payload) => {
    context.commit('setToken', payload);
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


