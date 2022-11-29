const types = {
  LOGIN_USER: "LOGIN_USER",
};

const state = {
  currentUser: null,
};

const getters = {
  getCurrentUser: (state) => state.currentUser,
};

const mutations = {
  [types.LOGIN_USER](state, payload) {
    state.currentUser = payload;
  },
};

const actions = {
  loginUser({ commit }, payload) {
    commit(types.LOGIN_USER, payload);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
