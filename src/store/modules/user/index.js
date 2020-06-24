import axios from 'axios';

const state = {
  isLoaded: false,
  userDetail: {
    name: '',
    nickname: "",
    timezone: '',
    phone: '',
    lang: '',
    avatar: '',
  },
};

const getters = {
  isAccountLoaded(state) {
    return state.isLoaded;
  },
  getAccountDetails(state) {
    return state.userDetail;
  }
}

const mutations = {
  setUserDetail: (state, payload) => {
    state.userDetail = payload;
    state.isLoaded = true;
  },
}

const actions = {
  loadCurrentUserDetail: async (context, userDetail) => {

    let result = await axios.get('/profile/settings/get')
      .then((response) => {

        if (response.data.data)
          context.commit('setUserDetail', response.data.data);

      }).catch(error => {
        return Promise.reject(error);
      });
  },
}

const user = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default user;
