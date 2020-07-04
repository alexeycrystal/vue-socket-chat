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
  messagesPagination: {},
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


