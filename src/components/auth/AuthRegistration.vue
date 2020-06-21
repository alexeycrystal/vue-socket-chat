<template>
  <div>
    <ValidationObserver ref="form" v-slot="{ invalid }">
      <form @submit.prevent="register">
        <p>TOKEN: {{token}}</p>
        <p>
          <ValidationProvider
            name="E-mail"
            rules="required|email"
            v-slot="{ errors }">
            <label for="email-input">Email:</label>
            <input id="email-input" v-model="email" type="email">
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </p>
        <p>
          <ValidationProvider
            name="Password"
            rules="required|alpha_num|min:6|max:100|confirmed:password_confirmation"
            v-slot="{ errors }">
            <label for="password-input">Password:</label>
            <input id="password-input" v-model="password" type="text">
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </p>
        <p>
          <ValidationProvider
            name="PasswordConfirmation"
            v-slot="{ errors }"
            vid="password_confirmation">
            <label for="password-input">Confirm password:</label>
            <input id="password-confirmation" v-model="password_confirmation" type="text">
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </p>
        <p>
          <ValidationProvider
            name="Name"
            rules="required|alpha_num|max:200"
            v-slot="{ errors }">
            <label for="password-input">Assign username:</label>
            <input id="username" v-model="name" type="text">
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </p>
        <p>
          <button type="submit" :disabled="invalid">Register</button>
        </p>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
  import {ValidationObserver, ValidationProvider} from 'vee-validate';
  import {mapGetters} from 'vuex';

  export default {
    components: {
      ValidationObserver,
      ValidationProvider,
    },
    name: "AuthRegistration",
    data() {
      return {
        email: '',
        password: '',
        password_confirmation: '',
        name: '',
      }
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
      register() {

        let params = {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          name: this.name,
          lang: this.parseBrowserLanguage(),
        };

        console.log(params);

        this.$store
          .dispatch('auth/register', params);
      },
      parseBrowserLanguage() {

        let lang = navigator.language;

        if(lang && lang.includes('-'))
          return lang.split('-')[0];

        return 'en';
      }
    }
  }
</script>

<style scoped>

</style>
