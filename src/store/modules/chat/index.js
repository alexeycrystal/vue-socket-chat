import axios from 'axios';

const state = {
  chats: [],
};

const getters = {
  getChats(state) {
    return state.chats;
  }
};

const mutations = {
  appendChats: (state, payload) => {
    state.chats = state.chats.concat(payload);
  },
};

const actions = {
  loadChats: async (context, payload) => {

    let queryParams = {
      per_page: payload.per_page,
      page: payload.page,
    };

    let result = await axios.get('/user/chats', {params: queryParams})
      .then(response => {

        let chats = response.data.data;

        console.log(chats);

        if (chats.length > 0) {
          context.commit('appendChats', chats);
          return chats;
        }
      }).catch(error => {
        return Promise.reject(error);
      });

    return result;
  },
};

const chat = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default chat;


