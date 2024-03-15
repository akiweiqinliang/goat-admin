<template>
  <a-card :bordered="false">
    <a-row align="center">
      <a-col :span="16">
        <a-descriptions title="User Info" size="large" :column="{xs:1, md:3, lg:4}">
          <a-descriptions-item v-for="item of userInfo" :label="item.label" :span="item.span ?? 1">
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
import { scheduleStore } from "@/stores/schedule.js";
import { adminStore } from "@/stores/admin.js";
import Verify from "@cp/Verify.vue";

export default {
  name: 'Home',
  components: {
    Verify,
    IconCamera,
  },
  setup() {
    const size = ref('medium');
    const calendarValue = ref(new Date());
    return {
      size,
      calendarValue,
    }
  },
  mounted() {
    // bug!
    this.initInfo();
  },
  computed: {
    userInfo() {
      return adminStore().info || []
    }
  },
  methods: {
    async initInfo() {
      if (adminStore().getInfo().length === 0){
        const info = await this.$api.userService.getAdminInfo(localStorage.getItem('admin'));
        adminStore().setInfo(info.data);
      }
    },
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
