import axios from 'axios';

const state = {
  wsUserListened: false,
};

const getters = {

}

const mutations = {
  setUserDetail: (state, payload) => {

  },
}

const actions = {
  saveUsersAsWSListeners: async (context, payload) => {

    let params = {
      users_ids: payload,
    };

    let result = await axios.post('/user/ws/dependencies', params)
      .then((response) => {

        if (response.data.data)
          console.log('Dependencies was saved!');

      }).catch(error => {
        return Promise.reject(error);
      });
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
