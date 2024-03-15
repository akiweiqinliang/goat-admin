<template>
  <a-layout-content class="noteDetail">
      <a-breadcrumb class="topBreadcrumb">
        <a-breadcrumb-item @click="back(1)" style="cursor: pointer;">{{ $t('notes') }}</a-breadcrumb-item>
        <a-breadcrumb-item @click="back(note.tagId)" style="cursor: pointer;">{{ note.tag }}</a-breadcrumb-item>
        <a-breadcrumb-item>{{ note.title }}</a-breadcrumb-item>
      </a-breadcrumb>
      <a-button type="primary" @click="handleClick" class="directBtn">目录</a-button>
    <a-typography>
          <a-typography-title>
            {{ note.title }}
          </a-typography-title>
          <a-row justify="space-between" align="bottom">
            <a-space>
              <a-tag>
                {{ note.tag }}
              </a-tag>
            </a-space>
            <a-space class="time">
              发布日期：{{ dayjs(note?.createTime).format('YYYY-MM-DD') }}
            </a-space>
          </a-row>
          <a-typography-paragraph blockquote class="description">
            {{ note.description }}
          </a-typography-paragraph>
          <a-typography-paragraph class="mainText">
            <div class="ck-content" v-html="note.detail"></div>
          </a-typography-paragraph>
        </a-typography>
  </a-layout-content>
  <a-drawer
      :width="340"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      :footer="false"
  >
    <div>
      <a-list>
        <template #header>
          {{ note.tag }}
        </template>
        <a-list-item
            @click="toDetail(item.id)"
            v-for="item in directory"
            :key="`directory-${item.id}`"
            :class="item.id === note.id ? 'directoryActive' : 'directoryItem'"
        >
          {{ item.title }}
        </a-list-item>
      </a-list>
    </div>
  </a-drawer>
</template>

<script>
import {inject, onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import dayjs from "dayjs";
import {noteStore} from "@/stores/note.js";

export default {
  name: "NoteDetail",
  computed: {
    dayjs() {
      return dayjs
    }
  },
  setup() {
    const api = inject("api")
    const router = useRouter()
    const route = useRoute()
    let routeId = ref(useRoute().params.id);
    let note = ref({})
    const visible = ref(false);
    let directory = ref([])
    const handleClick = () => {
      visible.value = true;
    };
    const handleOk = () => {
      visible.value = false;
    };
    const handleCancel = () => {
      visible.value = false;
    }
    const getDetail = async (id) => {
      const result = await api.noteService.findById(id);
      note.value = result.data;
    }
    const getDirectory = async (tagId) => {
      const result2 = await api.noteService.getListByTagId(1, 100, tagId);
      directory.value = result2.data.records;
    }
    const toDetail = (id) => {
      router.push({ name: "noteDetail", params: { id: id } , replace: true})
    }
    const back = (tagId) => {
      noteStore().activeTabKey = tagId;
      router.back()
    }
    onMounted(() => {
      watch(route, (to, from) => {
        getDetail(to.params.id)
      });
      getDetail(routeId.value).then(() => {
        getDirectory(note.value.tagId)
      })
    })
    return {
      routeId,
      note,
      back,
      visible,
      handleClick,
      handleOk,
      handleCancel,
      directory,
      toDetail
    }
  }
}
</script>

<style scoped lang="scss">
.noteDetail{
  padding: 40px;
  position: relative;
  display: inline-block;
  .topBreadcrumb{
    margin-bottom: -26px;
  }
  .time{
    font-size: 14px;
  }
  .description{
    margin-top: 20px;
  }
  .mainText{
    margin: 30px 0;
  }
}

.directoryItem:hover{
  background-color: var(--color-fill-1);
  cursor: pointer;
}
.directoryActive{
  color: #fff;
  background-color: rgb(var(--primary-6));
}

.directBtn{
  position: sticky;
  top: 80px;
  transform: translateY(-1px);
  margin-left: calc(100% - 60px);
  width: 60px;
}
</style>
