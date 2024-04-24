<template>
  <a-layout-content>
    <a-row class="foodBtns">
      <a-space>
        {{ $t('westernFood') }}
      </a-space>
      <a-space>
        <a-button shape="round" @click="toEditCookbookPage">
          {{ $t('editCookbook') }}
        </a-button>
      </a-space>
    </a-row>
    <ImgList :imgList="westernList" :list-category="1" @checkTag="handleCheckTag" @deleteCookbook="handleDelete"/>
    <a-row justify="center" class="pagination">
      <a-pagination :total="total" show-total :page-size="pageSize" :current="page" @change="handlePageChange"/>
    </a-row>
  </a-layout-content>
</template>

<script>
import ImgList from "@cp/ImgList.vue";
import {inject, ref, onMounted, onActivated,} from "vue";
import dayjs from "dayjs";
import {cookbookStore} from "@/stores/cookbook.js";
import {Message} from "@arco-design/web-vue";
import {useRouter} from "vue-router";
export default {
  name: "WesternFood",
  components: {ImgList},
  setup() {
    const router = useRouter()
    const api = inject('api')
    let westernList = ref([])
    let total = ref(0)
    let pageSize = ref(12)
    let page = ref(1)
    let currentTagId = ref(0)
    const getList = async (page, pageSize) => {
      let result;
      if (currentTagId.value === 0) {
        result = await api.cookbookService.getCookbookByParams({
          category: 1,
          page,
          pageSize,
        })
      }else {
        result = await api.cookbookService.getCookbookByParams({
          tagId: currentTagId.value,
          category: 1,
          page,
          pageSize,
        })
      }
      total.value = result.data.total;
      let list = result.data.records;
      list.forEach(item => item.updateTime = dayjs(item.updateTime).format('YYYY-MM-DD'))
      westernList.value = list;
      cookbookStore().westernCookbooks = westernList.value;
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
    const handleDelete = (id) => {
      api.cookbookService.deleteById(id).then((res) => {
        if (res.code === 0) {
          getList(page.value, pageSize.value)
          Message.success('删除成功')
        }
      });
    }
    onMounted(() => {
      getList(page.value, pageSize.value);
    })
    onActivated(() => {
      getList(page.value, pageSize.value);
    })
    return {
      westernList,
      total,
      pageSize,
      page,
      handleDelete,
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
