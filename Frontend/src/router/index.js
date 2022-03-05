import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        path: "/",
        name: "Login",
        component: () => import("../views/Login"),
    },
    {
        path: "/Admin",
        name: "Admin",
        component: () => import("../views/Admin"),
    },
    {
        path: "/Profile",
        name: "Profile",
        component: () => import("../views/Profile"),
    },
    {
        path: "/Comment",
        name: "Comment",
        component: () => import("../views/Comment"),
    },
    {
        path: "/AllComments",
        name: "AllComments",
        component: () => import("../views/AllComments"),
    },
    {
        path: "/createpost",
        name: "CreatePost",
        component: () => import("../views/CreatePost")
    },
    {
        path: "/CreateComment",
        name: "CreateComment",
        component: () => import("../views/CreateComment"),
    },
    {
        path: "/Signup",
        name: "Signup",
        component: () => import("../views/Signup")
    },
    {
        path: "/feed",
        name: "Feed",
        component: () => import("../views/Feed")
    },
    {
        path: "/AllUsers",
        name: "AllUsers",
        component: () => import("../views/AllUsers")
    }
    
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const publicPages = ["/", "/Signup"]
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = localStorage.getItem("userId")
    const loggedToken = localStorage.getItem("token")
    if (authRequired && !loggedIn && !loggedToken) {
        return next("/")
    }
    next()
})

export default router