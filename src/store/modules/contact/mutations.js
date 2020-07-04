const mutations = {
  setContacts: (state, contacts) => {
    state.contacts = contacts;
  },
  setFoundContacts: (state, contacts) => {
    state.foundContacts = contacts;
  },
  setPaginationInfo: (state, pagination) => {
    state.paginationInfo = pagination;
  },
  setSearchPagination: (state, pagination) => {
    state.searchPagination = pagination
  },
}

export default mutations;
