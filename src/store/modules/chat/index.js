import getters from './getters'
import mutations from "./mutations";
import actions from "./actions";

const state = {
  users: {},
  activeChatId: null,
  chats: {},
  messages: {},
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


