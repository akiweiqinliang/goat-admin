import { defineStore } from 'pinia';
import {ref} from "vue";

export const noteStore = defineStore('note', () => {
    const activeTabKey = ref(1)
    return { activeTabKey }
})
