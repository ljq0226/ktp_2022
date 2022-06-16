import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/about",
    name: "about",
    meta: {
      title: "关于",
    },
    component: () => import(/* webpackChunkName: "about" */ "@/views/about"),
  },
  {
    path: "/home",
    name: "home",
    meta: {
      title: "主页",
    },
    component: () => import(/* webpackChunkName: "home" */ "@/views/home"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Admin";
  next();
  // do something
});
router.afterEach((to, from) => {
  // do something
});

export default router;
