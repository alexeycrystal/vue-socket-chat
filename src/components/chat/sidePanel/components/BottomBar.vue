<template>
  <div>
    <div id="bottom-bar">
      <button id="addchat"
              @click="openUsersSearchModal">
        <i class="fa fa-user-plus fa-fw" aria-hidden="true"></i>
        <span>Add chat</span>
      </button>
      <button id="settings"
              @click="showSettingsPanel">
        <i class="fa fa-cog fa-fw"
           aria-hidden="true"></i>
        <span>Settings</span>
      </button>
    </div>
    <ProfileSettings/>
  </div>

</template>

<script>
  import SearchContacts from "./botton/SearchContacts";
  import ProfileSettings from "./settings/ProfileSettings";

  export default {
    name: "BottomBar",
    components: {ProfileSettings},
    data() {
      return {
        settingsToggled: false,
        settingsInitialClick: false,
      }
    },
    methods: {
      openUsersSearchModal() {
        this.$modal.show(SearchContacts, {
          text: 'This text is passed as a property'
        }, {
          name: 'search-contacts-modal',
          root: this.$root
        })
      },
      showSettingsPanel() {
        this.$store.dispatch("settings/setSettingsToggle", true);
        this.$store.dispatch("settings/setSettingsInitialClick", true);
      },
    }
  }
</script>

<style scoped>
  #frame #sidepanel #bottom-bar {
    position: absolute;
    width: 100%;
    bottom: 0;
  }

  #frame #sidepanel #bottom-bar button {
    float: left;
    border: none;
    width: 50%;
    padding: 10px 0;
    background: #32465a;
    color: #f5f5f5;
    cursor: pointer;
    font-size: 0.85em;
    font-family: "proxima-nova", "Source Sans Pro", sans-serif;
  }

  @media screen and (max-width: 735px) {
    #frame #sidepanel #bottom-bar button {
      float: none;
      width: 100%;
      padding: 15px 0;
    }
  }

  #frame #sidepanel #bottom-bar button:focus {
    outline: none;
  }

  #frame #sidepanel #bottom-bar button:nth-child(1) {
    border-right: 1px solid #2c3e50;
  }

  @media screen and (max-width: 735px) {
    #frame #sidepanel #bottom-bar button:nth-child(1) {
      border-right: none;
      border-bottom: 1px solid #2c3e50;
    }
  }

  #frame #sidepanel #bottom-bar button:hover {
    background: #435f7a;
  }

  #frame #sidepanel #bottom-bar button i {
    margin-right: 3px;
    font-size: 1em;
  }

  @media screen and (max-width: 735px) {
    #frame #sidepanel #bottom-bar button i {
      font-size: 1.3em;
    }
  }

  @media screen and (max-width: 735px) {
    #frame #sidepanel #bottom-bar button span {
      display: none;
    }
  }
</style>
