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

        if(chats) {

          let users = {};
          let chatsResult = {};

          chats.forEach(function(element, $index) {

            chatsResult['chat' + element.chat_id] = element;

            if(element.user_id) {

              let prefix = 'user' + element.user_id;
              users[prefix] = {};
              users[prefix].status = element.status;
            }
          })

          context.commit('setChats', chatsResult);
          context.commit('saveUsers', users);

          return chats;
        }

        return null;

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

    context.commit("setMessagesLoadingStatus", true);

    let result = await axios.get('/user/messages', {params: queryParams})
      .then(response => {

        let data = response.data.data;
        let messages = data.messages;

        let params = {
          chat_id: payload.chat_id,
          messages: messages,
        };

        if(payload.page === 1)
          context.commit('createMessages', params);
        else
          context.commit('appendMessages', params);

        let links = response.data.links;

        console.log(links);

        let page = payload.page;
        let previous_page = null;
        if(links.previous_page) {
          const urlParams = new URLSearchParams(links.previous_page);
          previous_page = urlParams.get('page');
        }

        let next_page = null;
        if(links.next_page) {
          const urlParams = new URLSearchParams(links.next_page);
          next_page = urlParams.get('page');
        }

        let total_pages = links.total_pages;

        let paginationParams = {
          previous_page,
          page,
          next_page,
          total_pages
        };

        context.commit('updatePaginationResult', paginationParams);

        return messages;
      }).catch(error => {
        return Promise.reject(error);
      }).finally(() => {
        context.commit("setMessagesLoadingStatus", false);
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

        if(result && response.data.data.message) {

          context.commit('addNewMessage', {
            chat_id: payload.chat_id,
            message: response.data.data.message
          });

          context.commit('updateLastMessageByChat', {
            chat_id: payload.chat_id,
            last_message: response.data.data.message.text
          });
        }
      }).catch(error => {
        return Promise.reject(error);
    });
  },
  updateLastMessageByChat: async (context, payload) => {

    context.commit('updateLastMessageByChat', {
      chat_id: payload.chat_id,
      last_message: payload.message
    });
  },
  storeMessage: async (context, payload) => {
    context.commit('addNewMessage', {
      chat_id: payload.chat_id,
      message: payload.message
    });
  },
  updateChatUserStatus: async (context, payload) => {

    let params = {
      user_id: payload.user_id,
      status: payload.status,
    };

    context.commit('updateChatUserStatus', params);
  }
};

export default actions;
