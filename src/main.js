import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from "./router/index.js";
import {createPinia} from "pinia";
// import VConsole from 'vconsole';

// import VueShepherdPlugin from 'vue-shepherd';
import ArcoVue from '@arco-design/web-vue';
import VueShepherd from 'vue-shepherd/dist/vue-shepherd.ssr.js';
import { createI18n } from 'vue-i18n';

import '@arco-design/web-vue/dist/arco.less';
import 'shepherd.js/dist/css/shepherd.css';

import './assets/custom.scss'
import api from "@/api/index.ts";
import {messages} from "@/lang/index.js";
import CKEditor from '@ckeditor/ckeditor5-vue';
const app = createApp(App);
const i18n = createI18n({
    locale: 'zh', // 设置默认语言
    messages, // 引入的本地化消息
});
// const vConsole = new VConsole();
import "@/assets/css/htmlpreview.scss";
// app.component('editor', CKEditor)

app.use(router)
    .use(createPinia())
    .use(ArcoVue)
    .use(VueShepherd)
    .use(i18n)
    .use( CKEditor )
    .mount('#app')
app.config.globalProperties.$api = api;
app.provide('api', api);
