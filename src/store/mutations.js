export const mutations = {
  setToken: (state, payload) => {
    state.auth.token = payload;
  },
};
