<template>
  <a-layout-content>
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
    <ImgList :imgList="chineseList" :list-category="0" @checkTag="handleCheckTag" :tag-list="tagList" @deleteCookbook="handleDelete"/>
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
  name: "ChineseFood",
  components: {ImgList},
  setup() {
    const router = useRouter()
    const api = inject('api')
    let chineseList = ref([])
    let total = ref(0)
    let pageSize = ref(12)
    let page = ref(1)
    let currentTagId = ref(0)
    const getList = async (page, pageSize) => {
      let params;
      if (currentTagId.value === 0) {
        params = {
          category: 0,
          page,
          pageSize,
        }
      }else {
        params = {
          tagId: currentTagId.value,
          category: 0,
          page,
          pageSize,
        }
      }
      const result = await api.cookbookService.getCookbookByParams(params);
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
    let tagList = ref();
    const getTagList = async () => {
      const result = await api.tagService.getCookbookTagList();
      let list = JSON.parse(JSON.stringify(result.data.records))
      list.unshift({
        id: 0,
        value: '全部',
        tagId: 0,
      })
      tagList.value = list;
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
      getTagList()
    })
    onActivated(() => {
      getList(page.value, pageSize.value);
      getTagList()
    })
    return {
      chineseList,
      tagList,
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
