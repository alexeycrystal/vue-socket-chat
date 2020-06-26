<template>
  <div id="chats">
    <ul>
      <li v-for="chat in chats"
          :class="['chat', {active: activeChatId === chat.chat_id}]"
          :key="chat.chat_id"
          @click="activateChat(chat.chat_id)">
        <div class="wrap">
          <span :class="[
            'chat-status',
            chat.user_id ? users['user' + chat.user_id].status : ''
          ]"></span>
          <img :src="chat.avatar" alt=""/>
          <div class="meta">
            <p class="name">{{chat.title}}</p>
            <p class="preview">You just got LITT up, Mike.</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: "ChatView",
    computed: {
      ...mapGetters('chat', {
        users: 'getUsers',
        chats: 'getChats',
        activeChatId: 'getActiveChatId',
      }),
    },
    created() {
      this.loadChats();
    },
    methods: {
      loadChats(perPage, page) {

        perPage = perPage ? perPage : 10;
        page = page ? page : 1;

        let params = {
          per_page: perPage,
          page: page,
        };

        this.$store
          .dispatch('chat/loadChats', params);
      },
      activateChat(chatId) {

        if (chatId && this.activeChatId !== chatId)
          this.$store
            .dispatch('chat/updateActiveChat', chatId);
      }
    }
  }
</script>

<style scoped>
  #frame #sidepanel #chats {
    height: calc(100% - 177px);
    overflow-y: scroll;
    overflow-x: hidden;
  }

  @media screen and (max-width: 735px) {
    #frame #sidepanel #chats {
      height: calc(100% - 149px);
      overflow-y: scroll;
      overflow-x: hidden;
    }

    #frame #sidepanel #chats::-webkit-scrollbar {
      display: none;
    }
  }

  #frame #sidepanel #chats.expanded {
    height: calc(100% - 334px);
  }

  #frame #sidepanel #chats::-webkit-scrollbar {
    width: 8px;
    background: #2c3e50;
  }

  #frame #sidepanel #chats::-webkit-scrollbar-thumb {
    background-color: #243140;
  }

  #frame #sidepanel #chats ul li.chat {
    position: relative;
    padding: 10px 0 15px 0;
    font-size: 0.9em;
    cursor: pointer;
  }

  @media screen and (max-width: 735px) {
    #frame #sidepanel #chats ul li.chat {
      padding: 6px 0 46px 8px;
    }
  }

  #frame #sidepanel #chats ul li.chat:hover {
    background: #32465a;
  }

  #frame #sidepanel #chats ul li.chat.active {
    background: #32465a;
    border-right: 5px solid #435f7a;
  }

  #frame #sidepanel #chats ul li.chat.active span.chat-status {
    border: 2px solid #32465a !important;
  }

  #frame #sidepanel #chats ul li.chat .wrap {
    width: 88%;
    margin: 0 auto;
    position: relative;
  }

  @media screen and (max-width: 735px) {
    #frame #sidepanel #chats ul li.chat .wrap {
      width: 100%;
    }
  }

  #frame #sidepanel #chats ul li.chat .wrap span {
    position: absolute;
    left: 0;
    margin: -2px 0 0 -2px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid #2c3e50;
    background: #95a5a6;
  }

  #frame #sidepanel #chats ul li.chat .wrap span.online {
    background: #2ecc71;
  }

  #frame #sidepanel #chats ul li.chat .wrap span.away {
    background: #f1c40f;
  }

  #frame #sidepanel #chats ul li.chat .wrap span.busy {
    background: #e74c3c;
  }

  #frame #sidepanel #chats ul li.chat .wrap img {
    width: 40px;
    border-radius: 50%;
    float: left;
    margin-right: 10px;
  }

  @media screen and (max-width: 735px) {
    #frame #sidepanel #chats ul li.chat .wrap img {
      margin-right: 0px;
    }
  }

  #frame #sidepanel #chats ul li.chat .wrap .meta {
    padding: 5px 0 0 0;
  }

  @media screen and (max-width: 735px) {
    #frame #sidepanel #chats ul li.chat .wrap .meta {
      display: none;
    }
  }

  #frame #sidepanel #chats ul li.chat .wrap .meta .name {
    font-weight: 600;
  }

  #frame #sidepanel #chats ul li.chat .wrap .meta .preview {
    margin: 5px 0 0 0;
    padding: 0 0 1px;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -moz-transition: 1s all ease;
    -o-transition: 1s all ease;
    -webkit-transition: 1s all ease;
    transition: 1s all ease;
  }

  #frame #sidepanel #chats ul li.chat .wrap .meta .preview span {
    position: initial;
    border-radius: initial;
    background: none;
    border: none;
    padding: 0 2px 0 0;
    margin: 0 0 0 1px;
    opacity: .5;
  }
</style>
