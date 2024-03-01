<template>
  <a-row class="foodBtns">
    <a-space>
      {{ $t('chineseFood') }}
    </a-space>
    <a-space>
      <a-button shape="round" @click="toEditCookbookPage">
        {{ $t('editCookbook') }}
      </a-button>
    </a-space>
  </a-row>
  <ImgList :imgList="chineseList" :list-category="0" @checkTag="handleCheckTag"/>
  <a-row justify="center" class="pagination">
    <a-pagination :total="total" show-total :page-size="pageSize" :current="page" @change="handlePageChange"/>
  </a-row>
</template>

<script>
import ImgList from "@cp/ImgList.vue";
import {inject, ref, onMounted,} from "vue";
import dayjs from "dayjs";
import {cookbookStore} from "@/stores/cookbook.js";
import router from "@/router/index.js";
export default {
  name: "ChineseFood",
  components: {ImgList},
  setup() {
    const api = inject('api')
    let chineseList = ref([])
    let total = ref(0)
    let pageSize = ref(8)
    let page = ref(1)
    let currentTagId = ref(0)
    const getList = async (page, pageSize) => {
      let result;
      if (currentTagId.value === 0) {
        result = await api.cookbookService.getCookbookByParams({
          category: 0,
          page,
          pageSize,
        })
      }else {
        result = await api.cookbookService.getCookbookByParams({
          tagId: currentTagId.value,
          category: 0,
          page,
          pageSize,
        })
      }
      total.value = result.data.total;
      let list = result.data.records;
      list.forEach(item => item.updateTime = dayjs(item.updateTime).format('YYYY-MM-DD'))
      chineseList.value = list;
      cookbookStore().chineseCookbooks = chineseList.value;
    }
    const handlePageChange = (newPage) => {
      page.value = newPage;
      if (currentTagId.value === 0) {
        getList(page.value, pageSize.value);
      }else {
        handleCheckTag(currentTagId.value)
      }
    }
    const toEditCookbookPage = () => {
      router.push({ name: 'editCookbook' })
    }
    function handleCheckTag(tagId) {
      currentTagId.value = tagId;
      getList(page.value, pageSize.value);
    }
    onMounted(() => {
      getList(page.value, pageSize.value);
    })
    return {
      chineseList,
      total,
      pageSize,
      page,
      handlePageChange,
      toEditCookbookPage,
      handleCheckTag
    }
  },
}
</script>

<style scoped>
.foodBtns{
  display: flex;
  justify-content: space-between;
  padding: 16px 20px 0;
}
.pagination{
  margin: 30px 0;
}
</style>
