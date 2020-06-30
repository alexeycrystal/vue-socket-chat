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
    getActiveChatInfo(state) {
        return state.chats['chat' + state.activeChatId];
    },
    getLastLoadedChatId(state) {
        return state.lastLoadedMessagesByChatId;
    },
    getUsers(state) {
      return state.users;
    },
    getNextPageNumber(state) {
      return state.messagesPagination.next_page;
    },
    isMessagesLoadingNow(state) {
      return state.isMessagesLoadingNow;
    }
};

export default getters;
