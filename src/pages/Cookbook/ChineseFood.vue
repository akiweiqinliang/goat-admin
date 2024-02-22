<template>
  {{ $t('chineseFood') }}
  <ImgList :imgList="chineseList"/>
</template>

<script>
import ImgList from "@cp/ImgList.vue";
import {ref} from "vue";

export default {
  name: "ChineseFood",
  components: {ImgList},
  setup() {
    let chineseList = ref(null)
    return {
      chineseList
    }
  },
  mounted() {
    this.getAllCookbookList()
  },
  methods: {
    async getAllCookbookList() {
      const result = await this.$api.cookbookService.getAllCookbook(1,10)
      this.chineseList = result.data.records;
      console.log(this.chineseList)
    }
  }
}
</script>

<style scoped>

</style>
