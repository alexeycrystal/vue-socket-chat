import axios from 'axios';

const state = {
  wsUserListened: false,
  usersInChannel: [],
};

const getters = {
  getUsersInChannel(state) {
    return state.usersInChannel;
  }
}

const mutations = {
  setUsersInChannel: (state, users) => {
    state.usersInChannel = users;
  },
}

const actions = {
  saveUsersAsWSListeners: async (context, payload) => {

    let params = {
      chats_ids: payload.chats_ids,
    };

    let result = await axios.post('/user/ws/dependencies', params)
      .then((response) => {

        if (response.data.data)
          console.log('Dependencies was saved!');

      }).catch(error => {
        return Promise.reject(error);
      });
  },
  deleteUserListeners: async (context, payload) => {

    let data = new FormData;

    data.append('append_headers', JSON.stringify({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + payload.token
    }));

    navigator.sendBeacon(axios.defaults.baseURL + '/user/ws/dependencies/destroy', data);
  },
  setOfflineStatusByBeacon: async (context, payload) => {

    let data = new FormData;

    data.append('append_headers', JSON.stringify({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + payload.token
    }));

    data.append('status', payload.status);

    navigator.sendBeacon(axios.defaults.baseURL + '/profile/status/change', data);
  },
  setUserStatus: async (context, status) => {

    let params = {
      status: status,
    };

    let result = await axios.post('/profile/status/change', params)
      .then((response) => {

        if (response.data.data && response.data.data.result)
          console.log('Status was changed!');

      }).catch(error => {
        return Promise.reject(error);
      });
  },
  setUsersInChannel: (context, users) => {
    context.commit('setUsersInChannel', users);
  },
}

const websocket = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default websocket;
