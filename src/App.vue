<template>
  <div>
    <p>
      <button @click="listenChannel">Listen channel!</button>
    </p>
    <p>
      <button @click="$store.dispatch('test/updateTestValue', {key: 'chat1', value: []})">Create array!</button>
    </p>
    <p>
      <button
        @click="$store.dispatch('test/appendTestValue', {key: 'chat1', value: {id: 1, text: 'Some text!!'}})">
        Append
        to array!
      </button>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    computed: {
      ...mapGetters('test', [
        'getTestValue',
      ]),
      getCurrentChange() {
        return this.getTestValue;
      }
    },
    watch: {
      getTestValue: {
        handler: function() {
          console.log('WATCH - TEST VALUE CHANGED!');
        },
        deep: true,
      },
      getCurrentChange: {
        handler: function(newValue) {
          console.log('WATCH - getCurrentChange!');
        },
        deep: true,
      },
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
  }
</script>

<style>
  @import '~reset-css/sass/_reset.scss';
  @import "~font-awesome/css/font-awesome.min.css";
</style>
