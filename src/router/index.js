import { createRouter, createWebHashHistory } from 'vue-router'
import Profile from '../views/Profile'
import Course from '../views/Course'
const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/about',
        name: 'about',
        meta: {
            title: '关于',
        },
        component: () => import('@/views/about'),
    },
    {
        path: '/home',
        name: 'home',
        meta: {
            title: '主页',
        },
        component: () => import('@/views/home'),
    },
    {
        path: '/',
        name: 'Login',
        component: () => import('../views/Login'),
    },
    {
        // 某门课程的成员展示
        path: '/courseMember/:cno',
        name: 'CourseMember',
        component: () => import('../views/CourseMember'),
        meta: {
            requireAuth: true,
            role: [2, 3],
        },
    },
    {
        path: '/courseCard',
        name: 'CourseCard',
        component: () => import('../components/courseDetails/CourseNav'),
    },
    {
        path: '/arc',
        name: 'arc',
        component: () => import('../components/homepage/ArchiveFile'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login'),
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register'),
    },
    {
        path: '/homepage',
        name: 'Homepage',
        component: () => import('../views/Homepage') /*设置回调函数*/,
        meta: {
            requireAuth: true /*需要权限*/,
            role: [2, 3],
        },
    },
    {
        path: '/course',
        name: 'Course',
        component: () => import('../views/Course'),
    },
    {
        path: '/course/:cno' /*cno为参数，参数前要有: */,
        name: 'Course',
        component: Course,
        meta: {
            requireAuth: true,
            role: [2, 3],
        },
        children: [
            {
                path: '/',
                name: 'Interact',
                component: () => import('../components/courseDetails/interact/Interact'),
                meta: {
                    requireAuth: true,
                    role: [2, 3],
                },
            },
            {
                path: '/interact',
                name: 'Interact',
                component: () => import('../components/courseDetails/interact/Interact'),
                meta: {
                    requireAuth: true,
                    role: [2, 3],
                },
            },
            {
                path: '/stuHomework/:cno',
                name: 'StuHomework',
                component: () => import('../components/courseDetails/homework/StuHomework'),
                meta: {
                    requireAuth: true,
                    role: [3],
                },
            },
            {
                path: '/homework/:cno',
                name: 'Homework',
                component: () => import('../components/courseDetails/homework/Homework'),
                meta: {
                    requireAuth: true,
                    role: [2],
                },
            },
            {
                path: '/topic',
                name: 'Topic',
                component: () => import('../components/courseDetails/topic/Topic'),
                meta: {
                    requireAuth: true,
                    role: [2, 3],
                },
            },
        ],
    },
    {
        path: '/stuTaskCommit/:cno/:tno',
        name: 'StuTaskCommit',
        component: () => import('../views/StuTaskCommit'),
        meta: {
            requireAuth: true,
            role: [3],
        },
    },
    {
        path: '/teacherTaskCorrect/:cno/:tno',
        name: 'TeacherTaskCorrect',
        component: () => import('../views/TeacherTaskCorrect'),
        meta: {
            requireAuth: true,
            role: [2],
        },
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
            requireAuth: true,
            role: [2, 3],
        },
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Admin'
    next()
    // do something
})
router.afterEach((to, from) => {
    // do something
})

export default router
