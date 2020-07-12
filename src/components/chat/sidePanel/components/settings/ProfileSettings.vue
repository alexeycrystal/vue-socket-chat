<template>
  <div id="settings-panel"
       class="settings-side-panel"
       v-click-outside="closeSettings"
       :style="{width: settingsToggled ? '100%' : '0px'}">
    <button class="settings-button" @click="logout">Logout</button>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import clickOutside from "../../../../../directives/clickOutside";

  export default {
    name: "ProfileSettings",
    computed: {
      ...mapGetters("auth", {
        token: "getToken"
      }),
      ...mapGetters('settings', {
        settingsToggled: "isSettingsToggled",
        settingsInitialClick: "isSettingsInitialClick"
      })
    },
    directives: {
      clickOutside
    },
    methods: {
      closeSettings() {
        if(!this.settingsInitialClick)
          this.$store.dispatch("settings/setSettingsToggle", false);

        this.$store.dispatch("settings/setSettingsInitialClick", false);
      },
      logout() {

        let token = this.token;

        this.$store.dispatch("websocket/deleteUserListeners", {
          token
        });
        this.$store.dispatch("websocket/setOfflineStatusByBeacon", {
          token,
          status: 'offline'
        });
        this.$store.dispatch("auth/logout");
      }
    }
  }
</script>

<style scoped>
  .settings-side-panel  {
    width: 0;
    float: left;
    position: absolute;
    max-width: 340px;
    z-index: 1;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #2c3e50;
    overflow-x: hidden;
    transition: 0.2s;
    padding-top: 60px;
  }

  .settings-side-panel .settings-button {
    margin: 8px 8px 8px 32px;
    padding: 8px 8px 8px 32px;
    font-size: 18px;
    color: #818181;
    display: block;
    transition: 0.3s;
  }
</style>
