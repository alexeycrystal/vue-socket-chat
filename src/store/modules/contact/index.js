import getters from './getters'
import mutations from "./mutations";
import actions from "./actions";

const state = {
  contacts: [],
  paginationInfo: {
    previous_page: null,
    page: null,
    next_page: null,
    total_pages: null,
  },

  foundContacts: [],
  searchPagination: {
    previous_page: null,
    page: null,
    next_page: null,
    total_pages: null,
  },
};

const contact = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default contact;

