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
           aria-hidden="true"
           ></i>
        <span>Settings</span>
      </button>
    </div>
    <div id="settings-panel"
         class="settings-side-panel"
         v-click-outside="closeSettings"
         :style="{width: settingsToggled ? '100%' : '0px'}">
      <button class="settings-button">About</button>
      <button class="settings-button">Services</button>
      <button class="settings-button">Clients</button>
      <button class="settings-button">Logout</button>
    </div>
  </div>

</template>

<script>
  import clickOutside from "../../../../directives/clickOutside";
  import SearchContacts from "./botton/SearchContacts";

  export default {
    name: "BottomBar",
    directives: {
      clickOutside
    },
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
        this.settingsToggled = true;
        this.settingsInitialClick = true;
      },
      closeSettings() {
        if(!this.settingsInitialClick)
          this.settingsToggled = false;

        this.settingsInitialClick = false;
        console.log('CLICK OUTSIDE ' + this.settingsToggled);
      }
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
