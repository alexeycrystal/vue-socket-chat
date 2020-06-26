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
        return state.chats[state.activeChatId];
    },
    getLastLoadedChatId(state) {
        return state.lastLoadedMessagesByChatId;
    },
    getUsers(state) {
      return state.users;
    }
};

export default getters;
