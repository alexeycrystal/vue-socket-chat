<template>
  <div id="search">
    <label for=""><i class="fa fa-search" aria-hidden="true"></i></label>
    <input type="text" placeholder="Search..." v-model="search_value"/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import throttle from "../../../../util/throttle";

    export default {
        name: "SearchBlock",
      computed: {
        ...mapGetters('search', {
          search_filter: "getSearchFilter",
        }),

        search_value: {
          set(search_value) {

            this.$store.dispatch("search/setSearchFilter", search_value);

            if(search_value) {

              throttle(this.$store.dispatch("search/loadChatsBySearchFilter", {
                per_page: 10,
                page: 1,
                filter: search_value,
              }), 500)
            }

          },
          get() {
            return this.search_filter;
          }
        },
      },
      methods: {
          searchUsersAndChatsByFilter() {

          }
      }
    }
</script>

<style scoped>
  #frame #sidepanel #search {
    border-top: 1px solid #32465a;
    border-bottom: 1px solid #32465a;
    font-weight: 300;
  }
  @media screen and (max-width: 735px) {
    #frame #sidepanel #search {
      display: none;
    }
  }
  #frame #sidepanel #search label {
    position: absolute;
    margin: 10px 0 0 20px;
  }
  #frame #sidepanel #search input {
    font-family: "proxima-nova",  "Source Sans Pro", sans-serif;
    padding: 10px 0 10px 46px;
    width: calc(100% - 25px);
    border: none;
    background: #32465a;
    color: #f5f5f5;
  }
  #frame #sidepanel #search input:focus {
    outline: none;
    background: #435f7a;
  }
  #frame #sidepanel #search input::-webkit-input-placeholder {
    color: #f5f5f5;
  }
  #frame #sidepanel #search input::-moz-placeholder {
    color: #f5f5f5;
  }
  #frame #sidepanel #search input:-ms-input-placeholder {
    color: #f5f5f5;
  }
  #frame #sidepanel #search input:-moz-placeholder {
    color: #f5f5f5;
  }
</style>
