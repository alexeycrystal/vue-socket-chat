<template>
  <div id="frame">
    <SidePanelBlock></SidePanelBlock>
    <ContentBlock></ContentBlock>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  import SidePanelBlock from "./sidePanel/SidePanelBlock";
  import ContentBlock from "./content/ContentBlock";

  export default {
    name: "ChatBlock",
    components: {
      SidePanelBlock,
      ContentBlock,
    },
    created() {
      this.listenToOwnPresenceChannel();

      window.addEventListener('beforeunload', this.releaseListenersAfterClose)
    },
    beforeDestroy() {
      this.leaveOwnChannel();
    },
    computed: {
      ...mapGetters('auth', [
        "getLoggedUserId",
        "getToken"
      ]),
      ...mapGetters('chat', [
        "getChats"
      ]),
      ...mapGetters('websocket', [
        "getUsersInChannel"
      ])
    },
    watch: {
      getChats() {

        let chats = this.$store.getters["chat/getChats"];

        let chatIds = [];

        console.log(chats);

        for (var chat in chats)
          chatIds.push(chats[chat].chat_id)

        console.log(chatIds);

        let params = {
          chats_ids: chatIds,
        };

        this.$store.dispatch('websocket/saveUsersAsWSListeners', params);
      }
    },
    methods: {
      releaseListenersAfterClose: function (event) {
        let token = this.getToken;

        this.$store.dispatch("websocket/deleteUserListeners", {
          token
        });
        this.$store.dispatch("websocket/setOfflineStatusByBeacon", {
          token,
          status: 'offline'
        });
      },
      listenToOwnPresenceChannel() {

        this.$echo.connector.options.auth.headers['Authorization'] = 'Bearer ' + this.getToken;

        let vm = this;

        this.$echo
          .join('chat.user.' + this.getLoggedUserId)
          .here((users) => {

            vm.$store.dispatch("websocket/setUsersInChannel", users);

            if(users.length > 0)
              vm.$store.dispatch("websocket/setUserStatus", 'online');
          })
          .listen('.ChatMessageSent', function (e) {
            console.log(e);

            if(e.data && e.data.message) {

              let message = e.data.message;

              vm.$store.dispatch("chat/storeMessage", {
                message: message,
                chat_id: message.chat_id,
              })

              vm.$store.dispatch("chat/updateLastMessageByChat", {
                message: message.text,
                chat_id: message.chat_id,
              });
            }
          })
          .listen('.UserStatusChangedEvent', function (e) {
            console.log('UserStatusChangedEvent!!!!!!!!!!!! FIREEEED!');

            if(e.data && e.data.user_id) {

              let params = {
                user_id: e.data.user_id,
                status: e.data.status,
              };

              vm.$store.dispatch("chat/updateChatUserStatus", params)
            }
          })
          .joining((user) => {

            console.log('joining channel - user');
          })
          .leaving((user) => {

            if(this.getUsersInChannel.length === 0) {

              vm.$store.dispatch("websocket/setUserStatus", 'offline');

              vm.$store.dispatch("websocket/deleteUserListeners", params);

            }
          });
      },
      leaveOwnChannel() {

        this.$echo.leave('chat.user.' + this.getLoggedUserId);

        if(this.getUsersInChannel.length > 0) {

          this.$store.dispatch("websocket/setUserStatus", 'offline');
        }
      }
    }
  }
</script>

<style scoped>

  body {
    display: block;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: white;
    font-family: "proxima-nova", "Source Sans Pro", sans-serif;
    font-size: 1em;
    letter-spacing: 0.1px;
    color: #32465a;
    text-rendering: optimizeLegibility;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
    -webkit-font-smoothing: antialiased;
  }

  #frame {
    width: 95%;
    min-width: 100%;
    max-width: 100%;
    height: 92vh;
    min-height: 300px;
    max-height: 720px;
    background: #E6EAEA;
  }

  @media screen and (max-width: 360px) {
    #frame {
      width: 100%;
      height: 100vh;
    }
  }
</style>
