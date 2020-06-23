<template>
  <div id="frame">
      <SidePanelBlock></SidePanelBlock>
      <ContentBlock></ContentBlock>
  </div>
</template>

<script>
    import SidePanelBlock from "./sidePanel/SidePanelBlock";
    import ContentBlock from "./content/ContentBlock";

    export default {
        name: "ChatBlock",
        components: {
          SidePanelBlock,
          ContentBlock,
        },
    }
</script>

<style scoped>

  body {
  display: block;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: white;
  font-family: "proxima-nova", "Source Sans Pro", sans-serif;
  font-size: 1em;
  letter-spacing: 0.1px;
  color: #32465a;
  text-rendering: optimizeLegibility;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
  -webkit-font-smoothing: antialiased;
  }

  #frame {
    width: 95%;
    min-width: 100%;
    max-width: 100%;
    height: 92vh;
    min-height: 300px;
    max-height: 720px;
    background: #E6EAEA;
  }
  @media screen and (max-width: 360px) {
    #frame {
      width: 100%;
      height: 100vh;
    }
  }
</style>
