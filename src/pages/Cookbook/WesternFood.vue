<template>
  {{ $t('westernFood') }}
  {{ westernList }}
</template>

<script>
import { ref } from "vue";

export default {
  name: "WesternFood",
  setup() {
    let westernList = ref(null)
    return {
      westernList
    }
  },
  mounted() {
    this.getAllWesternList()
  },
  methods: {
    async getAllWesternList() {
      this.westernList = await this.$api.cookbookService.getAllCookbook(1,10)
      console.log(this.westernList)
    }
  }
}
</script>

<style scoped>

</style>
