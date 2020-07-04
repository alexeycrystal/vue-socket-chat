import axios from 'axios';
import paginator from "../../../mixins/paginator";

const actions = {
  loadLoggedUserContacts: (context, payload) => {

    let isSearch = !!payload.filter;

    let params = {
      per_page: payload.per_page,
      page: payload.page,
    };

    if (payload.filter)
      params.filter = payload.filter;

    axios.get('/user/contacts', {params: params})
      .then((response) => {

        let contacts = null;
        if (response.data.data.contacts && response.data.data.contacts.length > 0)
          contacts = response.data.data.contacts;

        if (contacts) {

          let pagination = paginator.transformPageLinks(response.data.links);

          if (isSearch) {
            context.commit("setFoundContacts", contacts);
            context.commit("setSearchPagination", pagination);
          } else {
            context.commit("setContacts", contacts);
            context.commit("setPaginationInfo", pagination);
          }
        }

      }).catch(error => {
      return Promise.reject(error);
    });
  },
}

export default actions;
