<template>
  <div id="search-contacts-modal" class="modal">
    <div class="contacts-search">
      <label for=""><i class="fa fa-search" aria-hidden="true"></i></label>
      <input type="text" placeholder="Search Contacts..."
             @input="isTyping = true"
             v-model="searchFilter"/>
    </div>
    <div class="contacts">
      <ul v-show="searchFilter === ''">
        <li v-for="contact in contacts"
            class="chat"
            :key="contact.user_id"
            @click="createChatByUser(contact.user_id)">
          <div class="wrap">
            <span class="chat-status"></span>
            <img :src="contact.avatar" alt=""/>
            <div class="meta">
              <p class="name">{{contact.name}}</p>
              <p class="preview"></p>
            </div>
          </div>
        </li>
      </ul>
      <ul v-show="searchFilter !== ''">
        <li v-for="contact in contactsByFilter"
            class="chat"
            :key="contact.user_id"
            @click="createChatByUser(contact.user_id)">
          <div class="wrap">
            <span class="chat-status"></span>
            <img :src="contact.avatar" alt=""/>
            <div class="meta">
              <p class="name">{{contact.name}}</p>
              <p class="preview"></p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import _ from 'lodash'

  export default {
    name: "SearchContacts",
    created() {
      this.$store
        .dispatch("contact/loadLoggedUserContacts", {per_page: 10, page: 1, is_search: false});
    },
    computed: {
      ...mapGetters('chat', {
        isChatCreated: "isChatCreated",
        activeChatId: "getActiveChatId"
      }),
      ...mapGetters('contact', {
        contacts: "getCurrentContacts",
        contactsByFilter: "getFoundContacts",
      }),
    },
    data() {
      return {
        timer: null,
        searchFilter: '',
        isTyping: false,
      };
    },
    watch: {
      searchFilter: _.debounce(function () {
        this.isTyping = false;
      }, 600),
      isTyping() {

        if (this.searchFilter === '')
          this.$store.dispatch("contact/resetFoundContacts");

        if (!this.isTyping)
          this.uploadContacts();
      },
      activeChatId() {
         this.$emit('close');
      }
    },
    methods: {
      uploadContacts() {

        if (this.searchFilter !== '') {

          this.$store.dispatch("contact/loadLoggedUserContacts", {
            per_page: 10,
            page: 1,
            filter: this.searchFilter,
          });
        }
      },
      createChatByUser(userId) {
        //this.$emit('close');

        this.$store.dispatch("chat/createChatIfNotExists", {
          user_id: userId
        })
      }
    }
  }
</script>

<style scoped>
  .modal {
    background-color: #32465a;
  }

  .contacts-search {
    border-top: 1px solid #32465a;
    border-bottom: 1px solid #32465a;
    font-weight: 300;
  }

  @media screen and (max-width: 735px) {
    .contacts-search {
      display: none;
    }
  }

  .contacts-search label {
    position: absolute;
    margin: 10px 0 0 20px;
  }

  .contacts-search input {
    font-family: "proxima-nova", "Source Sans Pro", sans-serif;
    padding: 10px 0 10px 46px;
    width: calc(100% - 25px);
    border: none;
    background: #32465a;
    color: #f5f5f5;
  }

  .contacts-search input:focus {
    outline: none;
    background: #435f7a;
  }

  .contacts-search input::-webkit-input-placeholder {
    color: #f5f5f5;
  }

  .contacts-search input::-moz-placeholder {
    color: #f5f5f5;
  }

  .contacts-search input:-ms-input-placeholder {
    color: #f5f5f5;
  }

  .contacts-search input:-moz-placeholder {
    color: #f5f5f5;
  }

  .contacts {
    background: #435f7a;
    height: calc(100% - 177px);
    overflow-y: scroll;
    overflow-x: hidden;
  }

  @media screen and (max-width: 735px) {
    .contacts {
      height: calc(100% - 149px);
      overflow-y: scroll;
      overflow-x: hidden;
    }

    .contacts::-webkit-scrollbar {
      display: none;
    }
  }

  .contacts.expanded {
    height: calc(100% - 334px);
  }

  .contacts::-webkit-scrollbar {
    width: 8px;
    background: #2c3e50;
  }

  .contacts::-webkit-scrollbar-thumb {
    background-color: #243140;
  }

  .contacts ul li.chat {
    position: relative;
    padding: 10px 0 15px 0;
    font-size: 0.9em;
    cursor: pointer;
  }

  @media screen and (max-width: 735px) {
    .contacts ul li.chat {
      padding: 6px 0 46px 8px;
    }
  }

  .contacts ul li.chat:hover {
    background: #32465a;
  }

  .contacts ul li.chat.active {
    background: #32465a;
    border-right: 5px solid #435f7a;
  }

  .contacts ul li.chat.active span.chat-status {
    border: 2px solid #32465a !important;
  }

  .contacts ul li.chat .wrap {
    width: 88%;
    margin: 0 auto;
    position: relative;
  }

  @media screen and (max-width: 735px) {
    .contacts ul li.chat .wrap {
      width: 100%;
    }
  }

  .contacts ul li.chat .wrap span {
    position: absolute;
    left: 0;
    margin: -2px 0 0 -2px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid #2c3e50;
    background: #95a5a6;
  }

  .contacts ul li.chat .wrap span.online {
    background: #2ecc71;
  }

  #frame #sidepanel #contacts ul li.chat .wrap span.away {
    background: #f1c40f;
  }

  .contacts ul li.chat .wrap span.busy {
    background: #e74c3c;
  }

  .contacts ul li.chat .wrap img {
    width: 40px;
    border-radius: 50%;
    float: left;
    margin-right: 10px;
  }

  @media screen and (max-width: 735px) {
    .contacts ul li.chat .wrap img {
      margin-right: 0px;
    }
  }

  .contacts ul li.chat .wrap .meta {
    padding: 5px 0 0 0;
  }

  @media screen and (max-width: 735px) {
    .contacts ul li.chat .wrap .meta {
      display: none;
    }
  }

  .contacts ul li.chat .wrap .meta .name {
    font-weight: 600;
  }

  .contacts ul li.chat .wrap .meta .preview {
    margin: 5px 0 0 0;
    padding: 0 0 1px;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -moz-transition: 1s all ease;
    -o-transition: 1s all ease;
    -webkit-transition: 1s all ease;
    transition: 1s all ease;
  }

  .contacts ul li.chat .wrap .meta .preview span {
    position: initial;
    border-radius: initial;
    background: none;
    border: none;
    padding: 0 2px 0 0;
    margin: 0 0 0 1px;
    opacity: .5;
  }
</style>
