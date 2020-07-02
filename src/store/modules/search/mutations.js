const mutations = {
  setSearchFilter: (state, payload) => {
    state.search_filter = payload;
  },
  setLoadingStatus: (state, status) => {
    state.isLoadingNow = status;
  },
  setChats: (state, chats) => {
    state.chats = chats;
  },
  setMessageIdFoundByActiveChat: (state, messageId) => {
    state.messageIdFoundByActiveChat = messageId;
  }
}

export default mutations;
