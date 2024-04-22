<template>
<a-card>
  <a-row justify="space-between">
    <h4>微博热搜榜 🔥</h4>
    <a-button shape="circle" type="dashed" size="mini" @click="getWbHots">
      <template #icon>
        <icon-sync :spin="btnSpin"/>
      </template>
    </a-button>
  </a-row>
  <ul>
    <li v-for="hot in wbHots" :key="hot.index">
     <a-link :href="hot.mobilUrl" target="_blank" style="color: var(--color-text-2);">{{hot.index}}. {{ hot.title }}</a-link>
    </li>
  </ul>
</a-card>
</template>

<script>
import {onActivated, onMounted, ref} from "vue";
import axios from "axios";
import { IconSync } from '@arco-design/web-vue/es/icon';
import {Message} from "@arco-design/web-vue";
export default {
  name: "WbHot",
  components: {
    IconSync
  },
  setup() {
    const wbHots = ref(null)
    const btnSpin = ref(false)
    const getWbHots = () => {
      btnSpin.value = true
      axios.get('https://api.vvhan.com/api/hotlist/wbHot').then( res => {
        if (res.success === true) {
          Message.success('已为你找到最新资讯～')
        }
        wbHots.value = res.data
        btnSpin.value = false
      })
    }
    onMounted(() => {
      getWbHots()
    })
    return {
      wbHots,
      btnSpin,
      getWbHots
    }
  }
}
</script>

<style scoped lang="scss">
h4{
  margin-top: 4px;
}
ul{
  list-style: none;
  padding: 0;
  margin: 0;
  li{
    margin-bottom: 8px;
  }
}
</style>
