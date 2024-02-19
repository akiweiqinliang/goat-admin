import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from "./router/index.js";
import {createPinia} from "pinia";

// import VueShepherdPlugin from 'vue-shepherd';
import ArcoVue from '@arco-design/web-vue';
import VueShepherd from 'vue-shepherd/dist/vue-shepherd.ssr.js';

import '@arco-design/web-vue/dist/arco.less';
import 'shepherd.js/dist/css/shepherd.css';

import './assets/custom.scss'
createApp(App)
    .use(router)
    .use(createPinia())
    .use(ArcoVue)
    .use(VueShepherd)
    .mount('#app')
