<template>
  <div class="content">
    <template v-if="getActiveChatId">
      <ChatHeaderBlock></ChatHeaderBlock>
      <MessagesBlock></MessagesBlock>
      <MessageInputBlock></MessageInputBlock>
    </template>
    <template v-else>
      Please, select a chat.
    </template>

  </div>
</template>

<script>

  import {mapGetters} from 'vuex';

  import ChatHeaderBlock from "./components/ChatHeader";
  import MessagesBlock from "./components/MessagesView";
  import MessageInputBlock from "./components/MessageInput";

  export default {
    name: "ContentBlock",
    components: {
      ChatHeaderBlock,
      MessagesBlock,
      MessageInputBlock,
    },
    computed: {
      ...mapGetters('chat', ['getActiveChatId']),
    }
  }
</script>

<style scoped>
  #frame .content {
    float: right;
    width: 60%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  @media screen and (max-width: 735px) {
    #frame .content {
      width: calc(100% - 58px);
      min-width: 300px !important;
    }
  }
  @media screen and (min-width: 900px) {
    #frame .content {
      width: calc(100% - 340px);
    }
  }
</style>
