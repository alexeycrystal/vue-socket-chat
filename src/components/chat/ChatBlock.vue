<template>
  <div>
    <h1>You are now in the chat block!</h1>
    <p><button @click="checkData">CHECK DATA</button></p>
  </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "ChatBlock",
        methods: {
          checkData() {
            axios.get('/profile/settings/get')
              .then((response) => {
                console.log(response.data);
              })
          }
        }
    }
</script>

<style scoped>

</style>
