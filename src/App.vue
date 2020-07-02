<template>
  <div>
    <router-view></router-view>
    <button @click="computeData">LOLKA</button>
  </div>
</template>

<script>
  export default {
    methods: {
      computeData() {
        let test = new URLSearchParams('http://localhost:8000/api/user/messages?per_page=20&page=1');
        console.log(test.get('page'));
      }
    }
  }
</script>

<style>
  @import '~reset-css/sass/_reset.scss';
  @import "~font-awesome/css/font-awesome.min.css";
</style>
