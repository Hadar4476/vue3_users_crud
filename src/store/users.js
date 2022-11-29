import axios from "../my-axios";

const types = {
  INIT_USERS: "INIT_USERS",
  EDIT_USER: "EDIT_USER",
  ADD_USER: "ADD_USER",
  DELETE_USER: "DELETE_USER",
  SEARCH_USERS: "SEARCH_USERS",
};

const state = {
  users: [],
};

const getters = {
  getUsers: (state) => state.users,
};

const mutations = {
  async [types.INIT_USERS](state) {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = { Authorization: `Bearer ${user.token}` };

    const { results } = (await axios.get("users", { headers })).data;

    state.users = results;
  },
  [types.ADD_USER](state, payload) {
    state.users.push(payload);
  },
  [types.EDIT_USER](state, payload) {
    const { id, name, email } = payload;
    const userIndex = state.users.findIndex((u) => u.id === id);

    state.users[userIndex] = {
      ...state.users[userIndex],
      name,
      email,
    };
  },
  async [types.DELETE_USER](state, payload) {
    const user = JSON.parse(localStorage.getItem("user"));
    const headers = { Authorization: `Bearer ${user.token}` };

    await axios.delete(`users/${payload}`, { headers });
    const userIndex = state.users.findIndex((u) => u.id === payload);

    state.users.splice(userIndex, 1);
  },
};

const actions = {
  initUsers({ commit }, users) {
    commit(types.INIT_USERS, users);
  },
  editUser({ commit }, user) {
    commit(types.EDIT_USER, user);
  },
  addUser({ commit }, user) {
    commit(types.ADD_USER, user);
  },
  deleteUser({ commit }, userId) {
    commit(types.DELETE_USER, userId);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
