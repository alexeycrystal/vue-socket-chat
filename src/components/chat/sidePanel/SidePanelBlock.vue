<template>
  <div id="sidepanel">
    <ProfileHeader></ProfileHeader>
    <SearchView></SearchView>
    <ChatView></ChatView>
    <BottomBar></BottomBar>
  </div>
</template>

<script>
  import SearchView from "./components/SearchView";
  import ChatView from "./components/ChatView";
  import BottomBar from "./components/BottomBar";
  import ProfileHeader from "./components/ProfileHeader";

    export default {
        name: "SidePanelBlock",
      components: {
        ProfileHeader,
        BottomBar,
        SearchView,
        ChatView,
      }
    }
</script>

<style scoped>
  #sidepanel {
    float: left;
    min-width: 280px;
    max-width: 340px;
    width: 40%;
    height: 100%;
    background: #2c3e50;
    color: #f5f5f5;
    overflow: hidden;
    position: relative;
  }
  @media screen and (max-width: 735px) {
    #frame #sidepanel {
      width: 58px;
      min-width: 58px;
    }
  }
</style>
