<template>
  <div class="messages" @scroll="processMessageScroll" ref="messagesBlock">
    <ul class="reverseorder">
      <li v-for="message in getMessages"
          :class="currentUserId === message.user_id
          ? 'sent'
          : 'replies'"
          :key="message.id">
        <img :src="message.avatar" alt=""/>
        <p>{{message.text}}</p>
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
        nextPage: 'getNextPageNumber',
        isMessagesLoadingNow: 'isMessagesLoadingNow',
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
      getActiveChatId(newValue, oldValue) {
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

        if(scrollPercentage > 60
          && this.nextPage
          && !this.isMessagesLoadingNow) {

          let activeChatId = this.getActiveChatId;

          this.$store.dispatch('chat/loadChatMessages', {
            chat_id: activeChatId,
            per_page: 20,
            page: this.nextPage,
          })
        }
      },
      refreshMessagesByActiveChat() {

        let activeChatId = this.getActiveChatId;

        if (activeChatId) {

          if (!this.getMessagesByChats['chat' + activeChatId]) {

            this.$store
              .dispatch('chat/loadChatMessages', {
                chat_id: activeChatId,
                per_page: 20,
                page: 1,
              });
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
