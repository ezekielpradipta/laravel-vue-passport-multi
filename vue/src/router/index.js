import { createRouter, createWebHistory } from "vue-router";
import jwt_decode from "jwt-decode";
const routes = [
    {
        path: "/auth",
        redirect: "/login",
        name: "Auth",
        component: () => import("../views/layouts/AuthLayout.vue"),
        meta: { isGuest: true },
        children: [
            {
                path: "/login",
                name: "Login",
                component: () => import("../views/Login.vue"),
            },
        ],
    },
    {
        path: "/",
        meta: { requiresAuth: true },
        component: () => import("../views/layouts/Dashboard.vue"),
        children: [
            {
                path: "/user",
                name: "User",
                component: () => import("../views/User.vue"),
                meta: {
                    isUser: true,
                },
            },
            {
                path: "/admin",
                name: "Admin",
                component: () => import("../views/Admin.vue"),
                meta: {
                    isAdmin: true,
                },
            },
            {
                path: "/userpage1",
                name: "UserPage",
                component: () => import("../views/UserPage1.vue"),
                meta: {
                    isUser: true,
                },
            },
            {
                path: "/adminpage1",
                name: "AdminPage",
                component: () => import("../views/AdminPage1.vue"),
                meta: {
                    isAdmin: true,
                },
            },
        ],
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach((to, from, next) => {
    if (localStorage.token) {
        let gtToken = localStorage.getItem("token");
        let dcd = jwt_decode(gtToken);
        let roles = dcd.user.roles.map((role) => role.name);
        // var token = localStorage.getItem("token");
        // var decoded = jwt_decode(token);
        // var coba = Date.now() / 1000;
        // let user = JSON.parse(localStorage.getItem("user"));
        // let roles = user.roles.map((role) => role.name);
        // if (decoded.exp < coba) {
        //     toaster.error("Token Expired");
        //     localStorage.removeItem("token");
        //     localStorage.removeItem("user");
        //     next({
        //         name: "Login",
        //     });
        // }
        if (to.matched.some((record) => record.meta.isGuest)) {
            if (roles[0] === "user") {
                next({
                    name: "User",
                });
                return;
            } else if (roles[0] === "admin") {
                next({
                    name: "Admin",
                });
                return;
            }
        }
    }
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        let token = localStorage.getItem("token") != null;
        if (!token) {
            next({
                path: "/login",
                query: {
                    redirect: to.fullPath,
                },
            });
            return;
        } else {
            let gtToken = localStorage.getItem("token");
            let dcd = jwt_decode(gtToken);
            let roles = dcd.user.roles.map((role) => role.name);
            if (to.matched.some((record) => record.meta.isUser)) {
                if (roles.includes("user")) next();
                else if (roles[0] === "admin") {
                    next({
                        name: "Admin",
                    });
                }
            } else if (to.matched.some((record) => record.meta.isAdmin)) {
                if (roles.includes("admin")) next();
                else if (roles[0] === "user") {
                    next({
                        name: "User",
                    });
                }
            }
        }
    } else {
        next();
    }
});
export default router;
