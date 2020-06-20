<template>
  <div>
    <ValidationObserver ref="form" v-slot="{ invalid }">
      <form @submit.prevent="login">
        <p>TOKEN: {{token}}</p>
        <p>
          <ValidationProvider name="E-mail" rules="required|email" v-slot="{ errors }">
            <label for="email-input">Email:</label>
            <input id="email-input" v-model="email" type="email">
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </p>
        <p>
          <ValidationProvider name="Password" rules="required" v-slot="{ errors }">
            <label for="password-input">Password:</label>
            <input id="password-input" v-model="password" type="text">
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </p>
        <p>
          <button type="submit" :disabled="invalid">Submit</button>
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

</style>
