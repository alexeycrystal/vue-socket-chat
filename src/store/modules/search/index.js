import getters from './getters'
import mutations from "./mutations";
import actions from "./actions";

const state = {
  search_filter: '',
  isLoadingNow: false,
  chats: {},
  messageIdFoundByActiveChat: null
};

const search = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default search;


