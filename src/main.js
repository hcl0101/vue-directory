import Vue from "vue";
import Element from 'element-ui';
import Directory from "./components/index";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import 'element-ui/lib/theme-chalk/index.css';
import "./styles/index.scss";
import "./app.scss";

Vue.use(Element);
Vue.use(Directory);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
