<template>
  <ImgList :imgList="westernList"/>
</template>

<script>
import { ref } from "vue";
import ImgList from "@cp/ImgList.vue";
import dayjs from "dayjs";
import {cookbookStore} from "@/stores/cookbook.js";

export default {
  name: "WesternFood",
  components: {ImgList},
  setup() {
    let westernList = ref([])
    return {
      westernList
    }
  },
  mounted() {
    if (cookbookStore().westernCookbooks.length !== 0) {
      this.westernList = cookbookStore().westernCookbooks;
    }else {
      this.getList()
    }
  },
  methods: {
    async getList() {
      const result = await this.$api.cookbookService.getCookBooksByCatId(1,10, 1)
      if (result.data.records) {
        let list = result.data.records;
        list.forEach(item => item.updateTime = dayjs(item.updateTime).format('YYYY-MM-DD'))
        this.westernList = list;
        cookbookStore().westernCookbooks = list;
      }
    }
  }
}
</script>

<style scoped>

</style>
