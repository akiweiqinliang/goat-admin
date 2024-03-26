import { defineStore } from 'pinia';
import {ref} from "vue";

export const noteStore = defineStore('note', () => {
    const noteTotalNumber = ref(0)

    const activeTabKey = ref(1)
    return { activeTabKey, noteTotalNumber }
})
