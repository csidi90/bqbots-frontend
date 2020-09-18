import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Cryptoicon from "vue-cryptoicon";
// For all icons
import icon from "vue-cryptoicon/src/icons";
Cryptoicon.add(icon);
Vue.use(Cryptoicon);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
