<template>
  <a-layout-content class="learn">
    <a-tabs lazy-load :active-key="activeTabKey" @tab-click="handleTabClick">
      <template #extra>
        <a-button @click="addNewNote">{{ $t('add') }}</a-button>
      </template>
      <a-tab-pane v-for="item in tags" :key="item.tagId" :title="item.value">
        <NoteList :note-tag-id="item.tagId"/>
      </a-tab-pane>
    </a-tabs>
  </a-layout-content>
</template>

<script>
import {inject, onMounted, ref, watch} from "vue";
import {IconDelete, IconEdit, IconSearch} from "@arco-design/web-vue/es/icon/index";
import {useRoute, useRouter} from "vue-router";
import NoteList from "@cp/NoteList.vue";
import {noteStore} from "@/stores/note.js";

export default {
  name: "LearnNote",
  components: {NoteList, IconSearch, IconEdit, IconDelete },
  setup() {
    const api = inject('api')
    const router = useRouter()
    const route = useRoute()
    let tags = ref([])
    let activeTabKey = ref(1)
    async function getLearnMapList() {
      const tagResult = await api.tagService.getLearnNoteTagList();
      tags.value = tagResult.data.records;
      if (noteStore().activeTabKey) {
        activeTabKey.value = noteStore().activeTabKey;
      }else {
        activeTabKey.value = tags.value[0].tagId;
      }
    }
    const handleTabClick = (value) => {
      activeTabKey.value = value
    }
    function addNewNote() {
      router.push({ name: 'createNote' })
    }
    onMounted(() => {
      getLearnMapList()
    })
    return {
      tags,
      addNewNote,
      handleTabClick,
      activeTabKey
    }
  }
}
</script>

<style scoped lang="scss">
.learn{
  padding: 20px;
}
</style>
