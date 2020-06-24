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
    },
    computed: {
      ...mapGetters('auth', [
        "getLoggedUserId",
        "getToken"
      ]),
    },
    methods: {
      listenToOwnPresenceChannel() {

        this.$echo.connector.options.auth.headers['Authorization'] = 'Bearer ' + this.getToken;

        let vm = this;

        this.$echo
          .channel('presence-chat.user.' + this.getLoggedUserId)
          .listen('.ChatMessageSent', function (e) {
            console.log(e);

            if(e.data && e.data.message) {

              let message = e.data.message;

              vm.$store.dispatch("chat/storeMessage", {
                message: message,
                chat_id: message.chat_id,
              })
            }
          });
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
