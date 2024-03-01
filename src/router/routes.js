const CommonLayout = () => import('@/layouts/CommonLayout.vue')

const Login = () => import('@pages/Login.vue')
const Register = () => import('@pages/Register.vue')
const Error = () => import('@pages/404.vue')

const Home = () => import('@pages/Home.vue')
const Dashboard = () => import('@pages/Dashboard.vue')
const About = () => import('@pages/About.vue')
const ChineseFood = () => import('@pages/Cookbook/ChineseFood.vue')
const WesternFood = () => import('@pages/Cookbook/WesternFood.vue')
const EditCookbook = () => import('@pages/Cookbook/EditCookbook.vue')
const CookbookDetail = () => import('@pages/Cookbook/Detail.vue')
export const routes = [
    {
        path: '/',
        component: CommonLayout,
        redirect: 'home',
        layout: true,
        layoutName: 'home',
        meta: {
            requiresAuth: true,
        },
        children: [
            { path: '/home', alias: 'index', name: 'home', component: Home },
            { path: '/dashboard', name: 'dashboard', component: Dashboard },
            { path: '/map', name: 'map', component: About },
            {
                path: 'cookbook',
                redirect: '/cookbook/chineseFood',
                layout: true,
                layoutName: 'cookbook',
                children: [
                    { path: 'chineseFood', name: 'chineseFood', component: ChineseFood },
                    { path: 'westernFood', name: 'westernFood', component: WesternFood }
                    // 可以继续添加其他子路由
                ]
            },
        ]
    },
    {
        path: '/cookbooks/detail/:id',
        component: CommonLayout, // 将 CommonLayout 设置为父组件
        children: [
            {
                path: '',
                component: CookbookDetail,
                name: 'cookbookDetail',
                meta: {
                    requiresAuth: true,
                }
            }
        ]
    },
    {
        path: '/editCookbook',
        component: CommonLayout, // 将 CommonLayout 设置为父组件
        children: [
            {
                path: '',
                component: EditCookbook,
                name: 'editCookbook',
                meta: {
                    requiresAuth: true,
                }
            }
        ]
    },
    // {
    //     path: '/editCookbook',
    //     component: EditCookbook,
    //     name: 'editCookbook',
    //     meta: {
    //         requiresAuth: true,
    //     },
    // },
    {
        path: '/login',
        component: Login,
        name: 'login',
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
        name: 'error',
        component: Error,
    },
]