const getters = {
  getSearchFilter(state) {
    return state.search_filter;
  },
  getChatsBySearch(state) {
    return state.chats;
  },
  getMessageIdFoundByActiveChat(state) {
    return state.messageIdFoundByActiveChat;
  },
  getLoadingStatus(state) {
    return state.isLoadingNow;
  }
}

export default getters;
