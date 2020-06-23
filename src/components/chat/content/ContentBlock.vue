<template>
  <div class="content">
    <ChatHeaderBlock></ChatHeaderBlock>
    <MessagesBlock></MessagesBlock>
    <MessageInputBlock></MessageInputBlock>
  </div>
</template>

<script>

  import ChatHeaderBlock from "./components/ChatHeader";
  import MessagesBlock from "./components/MessagesView";
  import MessageInputBlock from "./components/MessageInput";

  export default {
    name: "ContentBlock",
    components: {
      ChatHeaderBlock,
      MessagesBlock,
      MessageInputBlock,
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
