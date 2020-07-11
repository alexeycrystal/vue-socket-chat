import getters from './getters'
import mutations from "./mutations";
import actions from "./actions";

const state = {
  settingsToggled: false,
  settingsInitialClick: false,
};

const search = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default search;


