import Vue from "vue";
import VueRouter from "vue-router";
import Dialog from "@/views/Dialog/Dialog";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Empty",
    redirect: '/dialog/1'
  },
  {
    path: "/dialog/:id",
    component: Dialog
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
