import { defineStore } from 'pinia';
import {ref} from "vue";

export const cookbookStore = defineStore('cookbook', () => {
    // 应该分开请求
    const cookbooks = ref([])
    const chineseCookbooks = ref([])
    const westernCookbooks = ref([])

    function getAllCookbook() {
        return cookbooks.value;
    }
    function setCookbook(data) {
        cookbooks.value = data;
        westernCookbooks.value = data.filter(item => item.category === 1);
        chineseCookbooks.value = data.filter(item => item.category === 0);
    }
    return { cookbooks, chineseCookbooks, westernCookbooks }
})
