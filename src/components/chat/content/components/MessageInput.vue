<template>
  <div class="message-input" @keypress.enter="sendMessage">
    <div class="wrap">
      <input type="text" placeholder="Write your message..." v-model="text"/>
      <i class="fa fa-paperclip attachment" aria-hidden="true"></i>
      <button class="submit"
              @click="sendMessage">
        <i class="fa fa-paper-plane" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: "MessageInputBlock",
    computed: {
      ...mapGetters('chat', [
        'getActiveChatId',
      ])
    },
    data() {
      return {
        text: '',
      }
    },
    methods: {
      sendMessage() {

        if(this.text !== '') {

          let payload = {
            chat_id: this.getActiveChatId,
            text: this.text
          };

          this.$store
            .dispatch('chat/sendMessage', payload);

          this.text = '';
        }
      },
    }
  }
</script>

<style scoped>
  #frame .content .message-input {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 99;
  }

  #frame .content .message-input .wrap {
    position: relative;
  }

  #frame .content .message-input .wrap input {
    font-family: "proxima-nova", "Source Sans Pro", sans-serif;
    float: left;
    border: none;
    width: calc(100% - 90px);
    padding: 11px 32px 10px 8px;
    font-size: 0.8em;
    color: #32465a;
  }

  @media screen and (max-width: 735px) {
    #frame .content .message-input .wrap input {
      padding: 15px 32px 16px 8px;
    }
  }

  #frame .content .message-input .wrap input:focus {
    outline: none;
  }

  #frame .content .message-input .wrap .attachment {
    position: absolute;
    right: 60px;
    z-index: 4;
    margin-top: 10px;
    font-size: 1.1em;
    color: #435f7a;
    opacity: .5;
    cursor: pointer;
  }

  @media screen and (max-width: 735px) {
    #frame .content .message-input .wrap .attachment {
      margin-top: 17px;
      right: 65px;
    }
  }

  #frame .content .message-input .wrap .attachment:hover {
    opacity: 1;
  }

  #frame .content .message-input .wrap button {
    float: right;
    border: none;
    width: 50px;
    padding: 12px 0;
    cursor: pointer;
    background: #32465a;
    color: #f5f5f5;
  }

  @media screen and (max-width: 735px) {
    #frame .content .message-input .wrap button {
      padding: 16px 0;
    }
  }

  #frame .content .message-input .wrap button:hover {
    background: #435f7a;
  }

  #frame .content .message-input .wrap button:focus {
    outline: none;
  }
</style>
