<template>
  <div class="chat-profile">
    <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt=""/>
    <p>Harvey Specter</p>
    <div class="social-media">
      <i class="fa fa-facebook" aria-hidden="true"></i>
      <i class="fa fa-twitter" aria-hidden="true"></i>
      <i class="fa fa-instagram" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ChatHeaderBlock",
  }
</script>

<style scoped>
  #frame .content .chat-profile {
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: #f5f5f5;
  }

  #frame .content .chat-profile img {
    width: 40px;
    border-radius: 50%;
    float: left;
    margin: 9px 12px 0 9px;
  }

  #frame .content .chat-profile p {
    float: left;
  }

  #frame .content .chat-profile .social-media {
    float: right;
  }

  #frame .content .chat-profile .social-media i {
    margin-left: 14px;
    cursor: pointer;
  }

  #frame .content .chat-profile .social-media i:nth-last-child(1) {
    margin-right: 20px;
  }

  #frame .content .chat-profile .social-media i:hover {
    color: #435f7a;
  }
</style>
