const mutations = {
  setSettingsToggle: (state, payload) => {
    state.settingsToggled = payload;
  },
  setSettingsInitialClick: (state, payload) => {
    state.settingsInitialClick = payload;
  }
}

export default mutations;
