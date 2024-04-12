const CommonLayout = () => import('@/layouts/CommonLayout.vue')

const Login = () => import('@pages/Login.vue')
const Landing = () => import('@pages/Landing.vue')
const Register = () => import('@pages/Register.vue')
const Error = () => import('@pages/404.vue')
const Home = () => import('@pages/Home.vue')
const Dashboard = () => import('@pages/Dashboard.vue')
const About = () => import('@pages/About.vue')
const Notes = () => import('@pages/Learning/Notes.vue')
const EditNote = () => import('@pages/Learning/EditNote.vue')
const UpdateNote = () => import('@pages/Learning/UpdateNote.vue')
const NoteDetail = () => import('@pages/Learning/NoteDetail.vue')
const ChineseFood = () => import('@pages/Cookbook/ChineseFood.vue')
const WesternFood = () => import('@pages/Cookbook/WesternFood.vue')
const EditCookbook = () => import('@pages/Cookbook/EditCookbook.vue')
const CookbookDetail = () => import('@pages/Cookbook/CookbookDetail.vue')
export const routes = [
    {
        path: '/',
        component: CommonLayout,
        redirect: 'landing',
        layout: true,
        layoutName: 'home',
        meta: {
            requiresAuth: true,
        },
        children: [
            { path: '/home', alias: 'index', name: 'home', component: Home, iconName: 'IconHome' },
            { path: '/dashboard', name: 'dashboard', component: Dashboard, iconName: 'IconCommon' },
            { path: '/map', name: 'map', component: About, iconName: 'icon-storage' },
            {
                path: 'cookbook',
                redirect: '/cookbook/chineseFood',
                layout: true,
                name: 'cookbook',
                layoutName: 'cookbook',
                iconName: 'IconBook',
                children: [
                    { path: 'chineseFood', name: 'chineseFood', component: ChineseFood, iconName: 'icon-chinese-fill'},
                    { path: 'westernFood', name: 'westernFood', component: WesternFood, iconName: 'icon-english-fill' }
                    // 可以继续添加其他子路由
                ]
            },
            { path: '/notes', name: 'notes', component: Notes, iconName: 'IconEdit' },
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
        path: '/cookbooks/editCookbook',
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
    {
        path: '/notes/edit-note',
        component: CommonLayout, // 将 CommonLayout 设置为父组件
        children: [
            {
                path: '',
                component: EditNote,
                name: 'createNote',
                meta: {
                    requiresAuth: true,
                }
            }
        ]
    },
    {
        path: '/notes/update-note/:id',
        component: CommonLayout, // 将 CommonLayout 设置为父组件
        children: [
            {
                path: '',
                component: UpdateNote,
                name: 'updateNote',
                meta: {
                    requiresAuth: true,
                }
            }
        ]
    },
    {
        path: '/notes/:id',
        component: CommonLayout, // 将 CommonLayout 设置为父组件
        children: [
            {
                path: '',
                component: NoteDetail,
                name: 'noteDetail',
                meta: {
                    requiresAuth: true,
                }
            }
        ]
    },
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
        path: '/landing',
        component: Landing,
        name: 'landing',
        meta: {
            requiresAuth: false,
            icon: 'icon-dashboard',
            title: 'hello',
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
