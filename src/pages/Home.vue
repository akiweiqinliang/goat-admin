<template>
  <a-card :bordered="false">
    <a-row align="center">
      <a-col :span="16">
        <a-descriptions title="User Info" size="large">
          <a-descriptions-item v-for="item of data" :label="item.label" :span="item.span ?? 1">
            <a-tag>{{ item.value }}</a-tag>
          </a-descriptions-item>
        </a-descriptions>
      </a-col>
      <a-col :span="8">
        <a-row justify="end" align="center">
          <a-avatar
              :size="128" shape="square"
              :auto-fix-font-size="false"
              >
            🤔
            <template #trigger-icon>
              <IconCamera />
            </template>
          </a-avatar>
        </a-row>
      </a-col>
    </a-row>
  </a-card>
  <a-card :bordered="false">
    <a-calendar v-model="calendarValue" @change="handleClickCalendar" />
  </a-card>
</template>
<script>
import { ref } from 'vue';
import {IconCamera } from '@arco-design/web-vue/es/icon';
import {scheduleStore} from "@/stores/schedule.js";
export default {
  name: 'Home',
  components: {
    IconCamera,
  },
  setup() {
    const size = ref('medium');

    const data = [{
      label: 'Name',
      value: 'Aki',
    }, {
      label: 'Mobile',
      value: '123-1234-1234',
    }, {
      label: 'Residence',
      value: 'Beijing'
    }, {
      label: 'Hometown',
      value: 'Beijing',
    }, {
      label: 'Address',
      value: 'Yingdu Building, Zhichun Road, Beijing'
    }];
    const calendarValue = ref(new Date());

    return {
      data,
      size,
      calendarValue,
    }
  },
  methods: {
    handleClickCalendar(date) {
      const schedule = scheduleStore()
      if (schedule.checkEvent(date)){
        this.$notification.warning(`${new Date(date).toDateString()},今天有安排！${schedule.getEventByDate(date)},快去工作台查看吧！`)
      }else {
        this.$notification.success(`${new Date(date).toDateString()},今天没有安排！`)
      }
    }
  }
}
</script>
<style scoped>
.mb-20{
  margin-bottom: 20px;
}

</style>
