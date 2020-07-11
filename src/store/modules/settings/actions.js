const actions = {
  setSettingsToggle: (context, payload) => {
    context.commit("setSettingsToggle", payload);
  },
  setSettingsInitialClick: (context, payload) => {
    context.commit("setSettingsInitialClick", payload);
  },
}

export default actions;
