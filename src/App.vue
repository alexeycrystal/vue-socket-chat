<template>
  <div>
    <p><button @click="listenChannel">Listen channel!</button></p>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    created() {
      console.log('LOCATION: ' + window.location.hostname);
    },
    data() {
      return {
        result: null,
      }
    },
    methods: {
      listenChannel() {
        console.log('Trying to listen channel!');

        window.Echo.channel('chat.user.1')
          .listen('.messagepushed', function (e) {
            console.log('Message pushed: ' + e);
          });
      }
    },
    beforeMount() {

    }
  }
</script>

<style>

</style>
