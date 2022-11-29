import Vuex from "vuex";

import auth from "./auth";
import users from "./users";

export default new Vuex.Store({
  modules: {
    auth,
    users,
  },
});
