import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

const service = axios.create({
    // 服务接口请求
    // baseURL: import.meta.env.VITE_APP_BASE_API,
    baseURL: 'http://localhost:3000',
    // 超时设置
    // timeout: 15000,
    headers:{'Content-Type':'application/json;charset=utf-8'}

});

// Request interceptors
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // do something
        return config;
    },
    (error: any) => {
        Promise.reject(error);
    }
);

// Response interceptors
service.interceptors.response.use(
    async (response: AxiosResponse) => {
        // do something
        return response.data
    },
    (error: any) => {
        // do something
        return Promise.reject(error);
    }
);

export default service;
