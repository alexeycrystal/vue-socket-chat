import Vue from 'vue';

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

    let chatId = payload.chat_id;
    let messages = payload.messages;

    if (state.messages[chatId]) {
      state.messages[chatId] = state.messages[chatId].concat(messages);
    } else {
      state.messages[chatId] = messages;
    }
  },
  addNewMessage: (state, payload) => {

    if(state.messages['chat' + payload.chat_id])
      state.messages['chat' + payload.chat_id].unshift(payload.message);
  }
};

export default mutations;
