import Vue from 'vue';
import axios from 'axios';

const state = {
  activeChatId: null,
  chats: [],
  messages: {},
  lastLoadedMessagesByChatId: false,
};

const getters = {
  getChats(state) {
    return state.chats;
  },
  getActiveChatId(state) {
    return state.activeChatId;
  },
  getMessagesByChats(state) {
    return state.messages;
  },
  getLastLoadedChatId(state) {
    return state.lastLoadedMessagesByChatId;
  }
};

const mutations = {
  appendChats: (state, payload) => {

    let chats = state.chats

    payload.forEach(chat => {
      chats[chat.chat_id] = chat;
    })

    state.chats = chats;
  },
  setChats: (state, payload) => {
    state.chats = payload;
  },
  setActiveChatId: (state, payload) => {
    state.activeChatId = payload;
  },
  setLastLoadedMessagesByChatId: (state, payload) => {
    state.lastLoadedMessagesByChatId = payload;
  },
  createMessages: (state, payload) => {

    let chatId = payload.chat_id;
    let messages = payload.messages;

    Vue.set(state.messages, 'chat' + chatId, messages);
  },
  appendMessages: (state, payload) => {

    console.log('appendMessages');

    let chatId = payload.chat_id;
    let messages = payload.messages;

    if (state.messages[chatId]) {
      state.messages[chatId] = state.messages[chatId].concat(messages);
    } else {
      state.messages[chatId] = messages;
    }
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
        let result = {};

        chats.forEach(chat => {
          result[chat.chat_id] = chat;
        });

        context.commit('setChats', result);

        return result;
      }).catch(error => {
        return Promise.reject(error);
      });

    return result;
  },
  updateActiveChat: (context, chatId) => {
    context.commit('setActiveChatId', chatId);
  },
  loadChatMessages: async (context, payload) => {

    let queryParams = {
      chat_id: payload.chat_id,
      per_page: payload.per_page,
      page: payload.page,
    };

    console.log('loadChatMessages');

    let result = await axios.get('/user/messages', {params: queryParams})
      .then(response => {

        console.log('Messages response received');

        let messages = response.data.data.messages;

        let params = {
          chat_id: payload.chat_id,
          messages: messages,
        };

        context.commit('createMessages', params);
        context.commit('setLastLoadedMessagesByChatId', payload.chat_id);

        return messages;
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


