import Vue from 'vue';
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
  updateAvatar: (state, avatarPath) => {
    Vue.set(state.userDetail, 'avatar', avatarPath);
  }
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
  saveNewProfilePhoto: async (context, photo) => {

    let formData = new FormData();
    formData.append('photo', photo);

    await axios.post('/profile/photo',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {

      if (response.data.data.result) {
        context.commit("updateAvatar", response.data.data.path + '?' + Date.now());
      }
    }).catch(error => {
      return Promise.reject(error);
    });
  }
}

const user = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default user;
