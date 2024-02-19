import { defineStore } from 'pinia'
import {ref} from "vue";

export const scheduleStore = defineStore('schedule', () => {
    const events = ref( [
        {
            id: 0,
            event: 'book a ticket',
            date: new Date('2024-2-2')
        },
        {
            id: 1,
            event: 'pay the gas bill',
            date: new Date('2024-1-24')
        }
    ])
    function getEvents() {
        return events.value
    }
    function checkEvent(date) {
        return !!events.value.find(item => item.date.getTime() === date.getTime());
    }
    function getEventByDate(date) {
        return events.value.find(item => item.date.getTime() === date.getTime()).event;
    }
    function addEvents() {

    }
    return { events, getEvents, checkEvent, getEventByDate}
})
