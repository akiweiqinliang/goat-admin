<template>
  <a-row class="searchBox">
    <a-input-search
        v-model.trim="searchInputValue"
        placeholder="查找内容"
        search-button
        @press-enter="handleSearchNote"
        @search="handleSearchNote"
        :allow-clear="true"
        @clear="getNoteList"
    >
      <template #button-icon>
        <icon-search/>
      </template>
      <template #button-default>
         {{ $t('search') }}
      </template>
    </a-input-search>
  </a-row>
  <a-row justify="space-between" :gutter="20">
    <a-col :span="24">
      <a-list>
        <a-list-item v-for="noteItem in noteList" :key="noteItem.id" class="noteItem">
          <a-list-item-meta
              :title="noteItem.title"
              :description="noteItem.description"
              @click="toDetail(noteItem.id)"
              class="noteItemMeta"
          >
          </a-list-item-meta>
          <template #actions>
            <icon-edit @click="toUpdateNote(noteItem.id)"/>
            <a-popconfirm :content="$t('deleteInfoMsg')" @ok="deleteNote(noteItem.id)">
            <icon-delete />
            </a-popconfirm>
          </template>
        </a-list-item>
      </a-list>
      <a-pagination
          class="notePagination"
          :total="total"
          :current="page"
          :page-size="pageSize"
          show-total
          @change="handlePageChange"
          />
    </a-col>
  </a-row>
</template>

<script>
import {inject, onMounted, ref, watch} from "vue";
import {IconDelete, IconEdit, IconSearch} from "@arco-design/web-vue/es/icon/index";
import {useRouter} from "vue-router";
import {Message} from "@arco-design/web-vue";
export default {
  name: "NoteList",
  components: { IconSearch, IconEdit, IconDelete },
  props: {
    noteTagId: {
      required: true,
      type: Number,
      default: 1
    }
  },
  setup(props) {
    const router = useRouter()
    let total = ref(0)
    let page = ref(1)
    let pageSize = ref(8)
    let noteList = ref([])
    let searchInputValue = ref('')
    const api = inject('api')
    const toDetail = (id) => {
      router.push({ name: "noteDetail", params: { id: id } })
    }
    const toUpdateNote = (id) => {
      router.push({ name: "updateNote", params: { id: id } })
    }
    const deleteNote = async (id) => {
      const result = await api.noteService.deleteNote(id);
      if (result.code === 0) {
        Message.success("删除成功！")
        await getNoteList()
      }
      console.log(result.code)
    }
    const getNoteList = async () => {
      let result;
      if (searchInputValue.value === '') {
        result = await api.noteService.getListByTagId(page.value, pageSize.value, props.noteTagId);
      }else {
        result = await api.noteService.findListByTitle(page.value, pageSize.value, props.noteTagId, searchInputValue.value);
      }
      total.value = result.data.total;
      noteList.value = result.data.records;
    }
    const handleSearchNote = (value, ev) => {
      if (value === '') {
        return
      }
     getNoteList().then(() => {
       Message.success({
         content: "查询结果如下",
         duration: 2000,
       })
     })
    }
    const handlePageChange = (newPage) => {
      page.value = newPage;
      getNoteList()
    }
    onMounted(() => {
      watch( searchInputValue, (val) => {
        if (val === '') {
          getNoteList()
        }
      })
      getNoteList()
    })
    return {
      total,
      page,
      pageSize,
      noteList,
      searchInputValue,
      toDetail,
      toUpdateNote,
      deleteNote,
      handlePageChange,
      handleSearchNote,
      getNoteList,
    }
  }
}
</script>

<style scoped lang="scss">
.searchBox{
  margin-bottom: 16px;
}
.notePagination{
  display: flex;
  justify-content: center;
  margin-top: 16px;
}
.noteItem:hover{
  background-color:var(--color-fill-1);
}
.noteItemMeta{
  cursor: pointer;
}
</style>
