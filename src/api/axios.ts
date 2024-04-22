import axios, {AxiosResponse} from 'axios';
import { Message } from "@arco-design/web-vue";
import router from "../router";
import {adminStore} from "../stores/admin";
// 设置接口超时时间
axios.defaults.timeout = 60000;
// 环境的切换
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = 'http://localhost:3000/api/v1'; // 开发环境
    // axios.defaults.baseURL = 'http://localhost:5000/api/v1'; // 本地测试环境
    // axios.defaults.baseURL = 'https://akiweiqinliang.fun/api/v1'; //生产环境 test
} else if (process.env.NODE_ENV == 'production') {
    // axios.defaults.baseURL = 'https://goat-nest-app-v1-0.onrender.com'; //生产环境
    axios.defaults.baseURL = 'https://akiweiqinliang.fun/api/v1'; //生产环境 tencent 一年
}

// @ts-ignore
// axios.defaults.baseURL = import.meta.env.VITE_API_DOMAIN || 'http://localhost:3000';

//http request 拦截器
axios.interceptors.request.use(

    (config) => {
        // do something
        // 配置请求头
        config.headers = {
            //'Content-Type':'application/x-www-form-urlencoded',   // 传参方式表单
            'Content-Type':'application/json;charset=UTF-8',        // 传参方式json
            // 'token': localStorage.getItem('token') || '',             // 这里自定义配置，这里传的是token
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        };
        return config;
    },
    (error: any) => {
        Promise.reject(error);
    }
);

//http response 拦截器
axios.interceptors.response.use(
    async (response: AxiosResponse) => {
        // do something
        return response.data
    },
    (error: any) => {
        // do something
        const { response } = error;
        if (response && response.status === 401) {
            // localStorage.removeItem('admin')
            // localStorage.removeItem('token')
            // localStorage.removeItem('openMenu')
            adminStore().info = []
            router.push({ name: 'login' });
        }else {
            Message.error('请求出错');
        }
        // Message.error(showMessage(error.code))
        return Promise.reject(error);
    }
    // 请求成功
    // res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
    // // 请求失败
    // error => {
    //     const { response } = error;
    //     if (response) {
    //         // 请求已发出，但是不在2xx的范围
    //         // errorHandle(response.status, response.data.message);
    //         return Promise.reject(response);
    //     } else {
    //         // 处理断网的情况
    //         // eg:请求超时或断网时，更新state的network状态
    //         // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
    //         // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
    //         if (!window.navigator.onLine) {
    //             Message.error('断网了')
    //             // store.commit('changeNetwork', false);
    //         } else {
    //             return Promise.reject(error);
    //         }
    //     }
    // }
);
export default axios;

