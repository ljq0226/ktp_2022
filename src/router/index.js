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
    path: "/arc",
    name: "arc",
    component: () => import("../components/homepage/ArchiveFile"),
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
    children: [
      {
        path: "/",
        name: "Interact",
        component: () =>
          import("../components/courseDetails/interact/Interact"),
      },
      {
        path: "/interact",
        name: "Interact",
        component: () =>
          import("../components/courseDetails/interact/Interact"),
      },
      {
        path: "/stuHomework/:cno",
        name: "StuHomework",
        component: () =>
          import("../components/courseDetails/homework/StuHomework"),
      },
      {
        path: "/homework/:cno",
        name: "Homework",
        component: () =>
          import("../components/courseDetails/homework/Homework"),
      },
      {
        path: "/topic",
        name: "Topic",
        component: () => import("../components/courseDetails/topic/Topic"),
      },
    ],
  },
  {
    path: "/stuTaskCommit/:cno/:tno",
    name: "StuTaskCommit",
    component: () => import("../views/course/stuTaskCommit.vue"),
  },
  {
    path: "/teacherTaskCorrect/:cno/:tno",
    name: "TeacherTaskCorrect",
    component: () => import("../views/course/teacherTaskCorrect.vue"),
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
