import Vue from 'vue';

const mutations = {
  appendChat: (state, payload) => {
    Vue.set(state.chats, 'chat' + payload.chat_id, payload);
  },
  setChats: (state, payload) => {
    state.chats = payload;
  },
  setActiveChatId: (state, payload) => {
    state.activeChatId = payload;
  },
  createMessages: (state, payload) => {

    let chatId = payload.chat_id;
    let messages = payload.messages;

    Vue.set(state.messages, 'chat' + chatId, messages);
  },
  appendMessages: (state, payload) => {

    let chatId = payload.chat_id;
    let messages = payload.messages;

    let toStart = payload.append_to_start;

    if (!state.messages['chat' + chatId])
      Vue.set(state.messages, 'chat' + chatId, []);

    let index;
    if (toStart) {
      index = 0
    } else {
      index = state.messages['chat' + chatId].length
    }

    state.messages['chat' + chatId].splice(index, 0, ...messages);
  },
  addNewMessage: (state, payload) => {

    if (state.messages['chat' + payload.chat_id])
      state.messages['chat' + payload.chat_id].unshift(payload.message);
  },
  setMessagesLoadingStatus: (state, payload) => {
    state.isMessagesLoadingNow = payload;
  },
  saveUsers: (state, payload) => {
    state.users = payload;
  },
  updateChatUserStatus: (state, payload) => {

    if (state.users['user' + payload.user_id])
      state.users['user' + payload.user_id].status = payload.status;
  },
  updateLastMessageByChat: (state, payload) => {
    Vue.set(state.chats['chat' + payload.chat_id], 'last_message', payload.last_message)
  },
  updatePaginationResult: (state, payload) => {
    let previous_page = payload.previous_page
      ? parseInt(payload.previous_page)
      : null;
    let page = payload.page
      ? parseInt(payload.page)
      : null;
    let next_page = payload.next_page
      ? parseInt(payload.next_page)
      : null;
    let total_pages = payload.total_pages
      ? parseInt(payload.total_pages)
      : payload.total_pages;

    let property = 'chat' + payload.chat_id;

    if (!state.messagesPagination[property]) {

      let pages_already_loaded = {}
      let pageProperty = 'page' + page;
      pages_already_loaded[pageProperty] = page;

      Vue.set(state.messagesPagination, property, {
        per_page: 20,
        previous_page,
        page,
        next_page,
        total_pages,
        pages_already_loaded,
      });
    } else {
      state.messagesPagination[property].per_page = 20;
      state.messagesPagination[property].previous_page = previous_page;
      state.messagesPagination[property].page = page;
      state.messagesPagination[property].next_page = next_page;
      state.messagesPagination[property].total_pages = total_pages;
      Vue.set(state.messagesPagination[property].pages_already_loaded, 'page' + page, payload.page);
    }
  },
  resetPaginationState: (state, page) => {
    state.messagesPagination = {
      per_page: 20,
      previous_page: null,
      page: 1,
      next_page: null,
      total_pages: null,
      pages_already_loaded: {},
    };
  },
  appendNewUser: (state, payload) => {

    let key = 'user' + payload.user_id;

    if(!state.users[key])
      state.users[key] = {};

    state.users[key].status = payload.status;
  }

};

export default mutations;
