import {createRouter, createWebHistory} from "vue-router";
import {routes} from "@/router/routes.js";
const router = createRouter({
    history: createWebHistory(),
    routes,
    // base: import.meta.env.BASE_URL,
})

// // 全局守卫：登录拦截 本地没有存token,请重新登录
router.beforeEach((to, from, next) => {
    const { title, requiresAuth } = to.meta
    document.title = title || '💐'
    // 判断有没有登录
    if (!localStorage.getItem('token')) {
        if (!requiresAuth) {
            next();
        } else {
            router.push('login')
        }
    } else {
        next();
    }
});
export default router;
