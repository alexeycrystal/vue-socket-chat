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

    let lastElementIndex = state.messages['chat' + chatId].length > 0
      ? state.messages['chat' + chatId].length - 1
      : 0;
    state.messages['chat' + chatId].splice(state.messages['chat' + chatId].length, 0, ...messages);
  },
  addNewMessage: (state, payload) => {

    if(state.messages['chat' + payload.chat_id])
      state.messages['chat' + payload.chat_id].unshift(payload.message);
  },
  setMessagesLoadingStatus:(state, payload) => {
    state.isMessagesLoadingNow = payload;
  },
  saveUsers: (state, payload) => {
    state.users = payload;
  },
  updateChatUserStatus: (state, payload) => {

    if(state.users['user' + payload.user_id])
      state.users['user' + payload.user_id].status = payload.status;
  },
  updateLastMessageByChat: (state, payload) => {
    Vue.set(state.chats['chat' + payload.chat_id], 'last_message', payload.last_message)
  },
  updatePaginationResult: (state, payload) => {
      state.messagesPagination.previous_page = payload.previous_page
        ? parseInt(payload.previous_page)
        : null;
      state.messagesPagination.page = payload.page
        ? parseInt(payload.page)
        : null;
      state.messagesPagination.next_page = payload.next_page
        ? parseInt(payload.next_page)
        : null;
      state.messagesPagination.total_pages = payload.total_pages
        ? parseInt(payload.total_pages)
        : payload.total_pages;
  }
};

export default mutations;
