import axios from 'axios';

const actions = {
  setSearchFilter: (context, payload) => {
    context.commit("setSearchFilter", payload);
  },
  loadChatsBySearchFilter: async (context, payload) => {

    context.commit("setLoadingStatus", true);

    let queryParams = {
      per_page: payload.per_page,
      page: payload.page,
      filter: payload.filter,
    };

    let result = await axios.get('/user/chats', {params: queryParams})
      .then(response => {

        let chats = response.data.data;

        if(chats) {

          let chatsResult = {};

          chats.forEach(function(element, $index) {

            chatsResult['chat' + element.chat_id] = element;

          })

          context.commit('setChats', chatsResult);

          return chats;
        }

        return null;

      }).catch(error => {
        return Promise.reject(error);
      });
  },
  setMessageIdFoundByActiveChat: (context, messageId) => {
    context.commit("setMessageIdFoundByActiveChat", messageId);
  }
}

export default actions;
