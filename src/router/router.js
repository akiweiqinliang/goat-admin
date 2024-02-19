const CommonLayout = () => import('@/layouts/CommonLayout.vue')

const Login = () => import('@pages/Login.vue')
const Register = () => import('@pages/Register.vue')
const Error = () => import('@pages/404.vue')

const Home = () => import('@pages/Home.vue')
const Dashboard = () => import('@pages/Dashboard.vue')
const About = () => import('@pages/About.vue')
export const routes = [
    {
        path: '/',
        component: CommonLayout,
        redirect: 'home',
        meta: {
            requiresAuth: true,
        },
        children: [
            { path: 'home', alias: 'index', name: 'home', component: Home },
            { path: 'dashboard', name: 'dashboard', component: Dashboard },
            { path: 'about', name: 'about', component: About },
        ]
    },
    {
        path: '/login',
        component: Login,
        meta: {
            requiresAuth: false,
            icon: 'icon-dashboard',
            title: '登录',
            isDisableBreadcrumbLink: true,
            isShowBreadcrumb: false,
            addToSidebar: false,
            sidebarIcon: 'icon-dashboard',
            sidebarIconAlt: '',
            isNoLogin: true,
        },
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: Error,
    },
]
