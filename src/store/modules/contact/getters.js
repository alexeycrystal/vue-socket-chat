const getters = {
  getCurrentContacts(state) {
    return state.contacts;
  },
  getPaginationInfo(state) {
    return state.paginationInfo;
  },
  getFoundContacts(state) {
    return state.foundContacts;
  },
  getSearchPagination(state) {
    return state.searchPagination;
  },
}

export default getters;
