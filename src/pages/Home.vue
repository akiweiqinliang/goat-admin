<template>
  <a-card :bordered="false">
    <a-row align="center">

      <a-col :span="16" :xs="18" :sm="16" style="overflow: scroll">
        <a-descriptions :title="$t('userInfo')" :column="{xs:1, md:3, lg:4}">
          <a-descriptions-item v-for="item of userInfo" :label="item.label" :span="item.span ?? 1">
            <a-tag>{{ item.value }}</a-tag>
          </a-descriptions-item>
        </a-descriptions>
      </a-col>
      <a-col :span="8" :xs="0" :sm="8">
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
      <a-col :span="8" :xs="6" :sm="0">
        <a-row justify="end" align="center">
          <a-avatar
              :size="64" shape="circle"
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
  <a-row>
    <a-col :span="24" :xs="24" :sm="0">
      <a-date-picker
          default-value="2019-06-03"
          v-model:pickerValue="calendarValue"
          hide-trigger
          class="pickerStyle"
          style="width: 100%; margin-top: 16px;"
          @change="handleClickCalendar"
      />
    </a-col>
    <a-col :span="24" :xs="0" :sm="24">
      <a-card :bordered="false">
        <a-calendar v-model="calendarValue" @change="handleClickCalendar" />
      </a-card>
    </a-col>
  </a-row>


</template>
<script>
import {inject, onMounted, ref} from 'vue';
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
    const api = inject('api');
    const userInfo = ref([]);
    const calendarValue = ref(new Date());
    const initInfo = async () => {
      if (adminStore().info.length === 0){
        const info = await api.userService.getAdminInfo(localStorage.getItem('admin'));
        adminStore().setInfo(info.data);
      }
      userInfo.value = adminStore().getInfo()
    }
    onMounted(() => {
      initInfo()
    })
    return {
      size,
      calendarValue,
      userInfo,
    }
  },
  methods: {
    handleClickCalendar(date) {
      console.log(date)
      const schedule = scheduleStore()
      // if (schedule.checkEvent(date)){
      //   this.$notification.warning(`${new Date(date).toDateString()},今天有安排！${schedule.getEventByDate(date)},快去工作台查看吧！`)
      // }else {
      //   this.$notification.success(`${new Date(date).toDateString()},今天没有安排！`)
      // }
    }
  }
}
</script>
<style scoped>
.mb-20{
  margin-bottom: 20px;
}

</style>
