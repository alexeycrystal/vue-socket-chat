<template>
  <div class="messages" @scroll="processMessageScroll" ref="messagesBlock">
    <ul class="reverseorder">
      <li v-for="(message, index) in getMessages"
          :class="currentUserId === message.user_id
          ? 'sent'
          : 'replies'"
          :key="message.id">
        <img :src="message.avatar" alt=""/>
        <p>(ID: {{message.id}})  (IND: {{index}}) {{message.text}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: "MessagesBlock",
    computed: {
      ...mapGetters('auth', {currentUserId: 'getLoggedUserId',}),
      ...mapGetters('chat', {
        getActiveChatId: 'getActiveChatId',
        getMessagesByChats: 'getMessagesByChats',
        isMessagesLoadingNow: 'isMessagesLoadingNow',
        getChatsPagination: 'getChatsPagination',
      }),
      nextPage() {

        let pagination = this.getChatsPagination['chat' + this.getActiveChatId];

        if(pagination)
          return pagination.next_page;

        return null;
      },
      previousPage() {
        let pagination = this.getChatsPagination['chat' + this.getActiveChatId];

        if(pagination)
          return pagination.previous_page;

        return null;
      },
      alreadyLoadedPages() {
        let pagination = this.getChatsPagination['chat' + this.getActiveChatId];

        if(pagination)
          return pagination.pages_already_loaded;

        return null;
      },
      ...mapGetters('search', {
        messageFoundId: "getMessageIdFoundByActiveChat",
      }),
      getMessages() {
        return this.getMessagesByChats['chat' + this.getActiveChatId];
      }
    },
    created() {
      this.refreshMessagesByActiveChat();
    },
    data() {
      return {
        messages: [],
      }
    },
    watch: {
      getActiveChatId() {
        this.refreshMessagesByActiveChat();
      },
    },
    methods: {
      processMessageScroll(event) {

        let ref = event.target;

        let maximumHeightForCurrentContent = ref.scrollHeight - ref.clientHeight;

        let scrollPercentage = 0;
        if(maximumHeightForCurrentContent !== 0)
          scrollPercentage = 100 - Math.round((ref.scrollTop * 100) / maximumHeightForCurrentContent);

        let activeChatId = this.getActiveChatId;

        if(scrollPercentage > 70
          && this.nextPage
          && !this.alreadyLoadedPages['page' + this.nextPage]
          && !this.isMessagesLoadingNow) {

          this.$store.dispatch('chat/loadChatMessages', {
            chat_id: activeChatId,
            per_page: 20,
            page: this.nextPage,
            append_to_start: false,
          });
        } else if(scrollPercentage < 30
          && this.previousPage
          && !this.alreadyLoadedPages['page' + this.previousPage]
          && !this.isMessagesLoadingNow) {

          this.$store.dispatch('chat/loadChatMessages', {
            chat_id: activeChatId,
            per_page: 20,
            page: this.previousPage,
            append_to_start: true,
          });
        }
      },
      refreshMessagesByActiveChat() {

        let activeChatId = this.getActiveChatId;

        if (activeChatId) {

          if (!this.getMessagesByChats['chat' + activeChatId]) {

            let params = {
              chat_id: activeChatId,
              per_page: 20,
            };

            if(this.messageFoundId)
              params.message_id = this.messageFoundId;
            else
              params.page = 1;

            this.$store
              .dispatch('chat/loadChatMessages', params);
          }
        }
      }
    }
  }
</script>

<style scoped>
  #frame .content .messages {
    display: flex;
    flex-direction: column-reverse;
    height: auto;
    min-height: calc(100% - 93px);
    max-height: calc(100% - 93px);
    overflow-y: scroll;
    overflow-x: hidden;
  }

  @media screen and (max-width: 735px) {
    #frame .content .messages {
      max-height: calc(100% - 105px);
    }
  }

  #frame .content .messages::-webkit-scrollbar {
    width: 8px;
    background: transparent;
  }

  #frame .content .messages::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
  }

  #frame .content .messages ul li {
    display: inline-block;
    clear: both;
    float: left;
    margin: 15px 15px 5px 15px;
    width: calc(100% - 25px);
    font-size: 0.9em;
  }

  #frame .content .messages ul li:nth-last-child(1) {
    margin-bottom: 20px;
  }

  #frame .content .messages ul li.sent img {
    margin: 6px 8px 0 0;
  }

  #frame .content .messages ul li.sent p {
    background: #435f7a;
    color: #f5f5f5;
  }

  #frame .content .messages ul li.replies img {
    float: right;
    margin: 6px 0 0 8px;
  }

  #frame .content .messages ul li.replies p {
    background: #f5f5f5;
    float: right;
  }

  #frame .content .messages ul li img {
    width: 22px;
    border-radius: 50%;
    float: left;
  }

  #frame .content .messages ul li p {
    display: inline-block;
    padding: 10px 15px;
    border-radius: 20px;
    max-width: 205px;
    line-height: 130%;
  }

  @media screen and (min-width: 735px) {
    #frame .content .messages ul li p {
      max-width: 300px;
    }
  }

  #frame .content .messages .reverseorder {
    display: flex;
    flex-direction: column-reverse;
  }
</style>
