import { createRouter, createWebHashHistory } from "vue-router";
import Profile from "../views/profile/index.vue";
import Course from "../views/course/index.vue";
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/",
    name: "Login",
    component: () => import("../views/loginRegister/login.vue"),
  },
  {
    // 某门课程的成员展示
    path: "/courseMember/:cno",
    name: "CourseMember",
    component: () => import("../views/course/CourseMember.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/loginRegister/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/loginRegister/register.vue"),
  },
  {
    path: "/homepage",
    name: "Homepage",
    component: () => import("../views/homepage/index.vue") /*设置回调函数*/,
  },
  {
    path: "/course",
    name: "Course",
    component: () => import("../views/course/index.vue"),
  },
  {
    path: "/course/:cno" /*cno为参数，参数前要有: */,
    name: "Course",
    component: Course,
  },
  {
    path: "/task/:taskId",
    name: "CourseTask",
    component: () => import("../views/task/index.vue"),
    query: {
      courseId: "",
      taskId: "",
    },
    children: [
      {
        path: "/taskInfo",
        name: "TaskInfo",
        component: () => import("../views/task/TaskInfo.vue"),
      },
      {
        path: "/submitTask",
        name: "SubmitTask",
        component: () => import("../views/task/SubmitTask.vue"),
      },
      {
        path: "/correctTask",
        name: "CorrectTask",
        component: () => import("../views/task/CorrectTask.vue"),
      },
    ],
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = "课堂派";
  next();
  // do something
});
router.afterEach((to, from) => {
  // do something
});

export default router;
