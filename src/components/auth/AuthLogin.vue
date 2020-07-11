<template>
  <div class="loginBlock">
    <ValidationObserver ref="form" v-slot="{ invalid }">
      <form class="loginForm" @submit.prevent="login">
        <p>TOKEN: {{token}}</p>
        <span><h1>Login form:</h1></span>
        <p class="formElement">
          <ValidationProvider name="E-mail" rules="required|email" v-slot="{ errors }">
            <label for="email-input">Email:</label>
            <input id="email-input" v-model="email" type="email">
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </p>
        <p class="formElement">
          <ValidationProvider name="Password" rules="required" v-slot="{ errors }">
            <label for="password-input">Password:</label>
            <input id="password-input" v-model="password" type="text">
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </p>
        <p class="formElement">
          <button class="submitButton" type="submit" :disabled="invalid">Submit</button>
        </p>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
  import {ValidationObserver, ValidationProvider} from 'vee-validate';
  import {mapGetters} from 'vuex';

  export default {
    name: "AuthLogin",
    components: {
      ValidationObserver,
      ValidationProvider,
    },
    data() {
      return {
        email: null,
        password: null,
      };
    },
    computed: {
      ...mapGetters('auth',{
        token: 'getToken',
      }),
    },
    watch: {
      token(token) {

        if(token)
          this.$router.push({name: 'chat'});
      }
    },
    methods: {
      login() {

        let payload = {
          email: this.email,
          password: this.password,
        };

        this.$store
          .dispatch('auth/login', payload);
      }
    },
  }
</script>

<style scoped>
  .loginBlock {
    text-align: center;
    font-size: 16px;;
    font-weight: bold;
    color: white;
    background-color: #32465a;
    max-width: 700px;
  }

  .loginForm {
    padding: 20px;
    margin: 20px;
  }

  .formElement {
    padding: 10px;
    margin-bottom: 10px;
    vertical-align: auto;
  }

  .formElement label {
    display: inline-block;
    width: 300px;
    vertical-align: top;
  }

  .submitButton {
    padding: 5px;
  }
</style>
