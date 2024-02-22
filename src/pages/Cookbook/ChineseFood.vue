<template>
  <ImgList :imgList="chineseList"/>
</template>

<script>
import ImgList from "@cp/ImgList.vue";
import {ref} from "vue";
import dayjs from "dayjs";
import {cookbookStore} from "@/stores/cookbook.js";
export default {
  name: "ChineseFood",
  components: {ImgList},
  setup() {
    let chineseList = ref([])
    return {
      chineseList
    }
  },
  mounted() {
    if (cookbookStore().chineseCookbooks.length !== 0) {
      this.chineseList = cookbookStore().chineseCookbooks;
    }else {
      this.getList()
    }
  },
  methods: {
    async getList() {
      const result = await this.$api.cookbookService.getCookBooksByCatId(1,10, 0)
      if (result.data.records) {
        let list = result.data.records;
        list.forEach(item => item.updateTime = dayjs(item.updateTime).format('YYYY-MM-DD'))
        this.chineseList = list;
        cookbookStore().chineseCookbooks = list;
      }
    }
  }
}
</script>

<style scoped>

</style>
