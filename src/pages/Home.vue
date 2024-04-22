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
    <a-col :span="0" :xs="24" :sm="0">
        <a-button long type="primary" @click="toLogin" style="margin-top: 16px;" shape="round" size="large">{{ $t('signOut') }}</a-button>
    </a-col>
  </a-row>


</template>
<script>
import {inject, onMounted, ref} from 'vue';
import {IconCamera } from '@arco-design/web-vue/es/icon';
import { scheduleStore } from "@/stores/schedule.js";
import { adminStore } from "@/stores/admin.js";
import Verify from "@cp/Verify.vue";
import {useRouter} from "vue-router";

export default {
  name: 'Home',
  components: {
    Verify,
    IconCamera,
  },
  setup() {
    const router = useRouter()
    const size = ref('medium');
    const api = inject('api');
    const userInfo = ref([]);
    const calendarValue = ref(new Date());
    const toLogin = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpirationDate')
      localStorage.removeItem('admin')
      router.push({ name: 'landing' })
    }
    const initInfo = async () => {
        // const info = await api.userService.getAdminInfo(localStorage.getItem('admin'));
      const info = await api.userService.getAdminInfo();
        adminStore().setInfo(info.data)
      for (const key in info.data) {
        userInfo.value.push({label: key, value: info.data[key]})
      }
    }
    onMounted(() => {
      initInfo()
    })
    return {
      size,
      calendarValue,
      userInfo,
      toLogin
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
