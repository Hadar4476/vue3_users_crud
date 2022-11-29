import { createApp } from "vue";
import router from "./routes";
import store from "./store";
import global from "./mixins/global";

import App from "./App.vue";

const app = createApp(App);

app.use(router);
app.use(store);
app.mixin(global);

app.mount("#app");
