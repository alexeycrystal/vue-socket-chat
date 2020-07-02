import getters from './getters'
import mutations from "./mutations";
import actions from "./actions";

const state = {
  users: {},

  /**
   * Chats part
   */
  activeChatId: null,
  chats: {},

  /**
   * Messages part
   */
  isMessagesLoadingNow: false,
  messages: {},
  messagesPagination: {
    /*
    per_page: 20,
    previous_page: null,
    page: 1,
    next_page: null,
    total_pages: null,
    pages_already_loaded: {},
     */
  },
  lastLoadedMessagesByChatId: false,
};

const chat = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default chat;


