import { defineStore } from 'pinia'
import {ref} from "vue";

export const adminStore = defineStore('admin', () => {
    const info = ref([])
    function getInfo() {
        return info.value;
    }
    function setInfo(adminInfo) {
        for (const key in adminInfo) {
            info.value.push({label: key, value: adminInfo[key]})
        }
        return info.value;
    }
    return { info, getInfo, setInfo }
})
