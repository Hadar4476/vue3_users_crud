import { createRouter, createWebHistory } from "vue-router";

import Auth from "./components/Pages/Auth/Auth.vue";
import Login from "./components/Pages/Auth/Login/Login.vue";
import Register from "./components/Pages/Auth/Register/Register.vue";
import Users from "./components/Pages/Users/Users.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/auth/login" },
    {
      path: "/auth",
      name: "auth",
      component: Auth,
      children: [
        { path: "login", name: "login", component: Login },
        { path: "register", name: "register", component: Register },
      ],
      beforeEnter(to, from, next) {
        const user = localStorage.getItem("user");

        if (!user) {
          next(true);
        }
      },
    },
    {
      path: "/users",
      name: "users",
      component: Users,
      beforeEnter(to, from, next) {
        const user = localStorage.getItem("user");

        if (user) {
          next(true);
        }
      },
    },
    { path: "/:notFound(.*)", redirect: "/" },
  ],
});

export default router;
