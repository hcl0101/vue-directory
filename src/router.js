import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  // mode: "history",  
  mode: "hash",    //github上的demo 不能history模式，因为无后端配合
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          path: "/contextMenu",
          name: "contextMenu",
          component: () => import("./views/contextMenu/contextMenu.vue")
        }, {
          path: "/directory",
          name: "directory",
          component: () => import("./views/directory/Directory.vue")
        }
      ]
    }
  ]
});
