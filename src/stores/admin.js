import { defineStore } from 'pinia';
import {ref} from "vue";

export const adminStore = defineStore('admin', () => {
    const info = ref( null)
    const user = localStorage.getItem('admin') || ''
    function getInfo() {
        return info.value;
    }
    function setInfo(adminInfo) {
        info.value = adminInfo
    }
    return { info, user, getInfo, setInfo }
})
