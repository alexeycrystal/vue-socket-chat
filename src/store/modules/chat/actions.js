import axios from "axios";

const actions = {
  loadChats: async (context, payload) => {

    let queryParams = {
      per_page: payload.per_page,
      page: payload.page,
    };

    let result = await axios.get('/user/chats', {params: queryParams})
      .then(response => {

        let chats = response.data.data;
        let result = {};

        chats.forEach(chat => {
          result[chat.chat_id] = chat;
        });

        context.commit('setChats', result);

        return result;
      }).catch(error => {
        return Promise.reject(error);
      });

    return result;
  },
  updateActiveChat: (context, chatId) => {
    context.commit('setActiveChatId', chatId);
  },
  loadChatMessages: async (context, payload) => {

    let queryParams = {
      chat_id: payload.chat_id,
      per_page: payload.per_page,
      page: payload.page,
    };

    let result = await axios.get('/user/messages', {params: queryParams})
      .then(response => {

        let messages = response.data.data.messages;

        let params = {
          chat_id: payload.chat_id,
          messages: messages,
        };

        context.commit('createMessages', params);

        return messages;
      }).catch(error => {
        return Promise.reject(error);
      });

    return result;
  },
  sendMessage: async (context, payload) => {

    let params = {
      chat_id: payload.chat_id,
      text: payload.text,
    };

    axios.post('/user/messages', params)
      .then((response) => {

        let result = response.data.data.result;

        if(result && response.data.data.message)
          context.commit('addNewMessage', {
            chat_id: payload.chat_id,
            message: response.data.data.message
          });

      }).catch(error => {
        return Promise.reject(error);
    });
  },
  storeMessage: async (context, payload) => {
    context.commit('addNewMessage', {
      chat_id: payload.chat_id,
      message: payload.message
    });
  }
};

export default actions;
