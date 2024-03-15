<template>
  <a-row class="tagList">
    <a-space>
      <a-tag checkable
             :default-checked="checkTagId === 0"
             v-for="tag in tagList"
             :key="`tag-${tag.id}`"
             :checked="checkTagId === tag.tagId"
             @check="handleCheckTag(tag.tagId)"
             :bordered="false"
             class="cookbookTag"
      >
        {{tag.value}}
      </a-tag>
    </a-space>
  </a-row>
  <a-row justify="flex-start">
    <a-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" :xxl="4"
           class="box"
           v-for="item in imgList"
           :key="`chinese-food-cookbook${item.id}`"
    >
      <a-image
          :src='item.imgUrl'
          :title='item.title'
          :description='item.updateTime'
          width="100%"
          style="vertical-align: top; overflow: hidden; height: 100%;"
      >
        <template #extra>
          <div class="actions">
            <a-tooltip content="查看菜谱">
              <span class="action" @click="checkDetail(item.id)"><icon-eye /></span>
            </a-tooltip>
            <a-tooltip :content="item.tag">
              <span class="action"><icon-tag /></span>
            </a-tooltip>
          </div>
        </template>
      </a-image>
    </a-col>
  </a-row>
</template>

<script>
import {inject, onMounted, ref} from 'vue';
import {useRouter} from "vue-router";
import {IconDownload, IconEye, IconInfoCircle, IconTag} from '@arco-design/web-vue/es/icon';
import {cookbookStore} from "@/stores/cookbook.js";

export default {
  name: "ImgList",
  components: {
    IconEye, IconDownload, IconInfoCircle, IconTag
  },
  emits: ['checkTag'],
  props: {
    imgList: {
      required: true,
      default: [],
      type: Array
    },
    tagList: {
      required: false,
      default: [{
        id: 0,
        value: '全部',
        tagId: 0,
      }],
      type: Array
    },
    listCategory: {
      required: true,
      default: 0,
      type: Number
    }
  },
  setup() {
    const router = useRouter();
    let checkTagId = ref(0)
    return {
      router,
      checkTagId,
    }
  },
  methods: {
    async checkDetail(cookbookId) {
      await this.router.push({name: 'cookbookDetail', params: {id: cookbookId}});
    },
    handleCheckTag(tagId) {
      this.checkTagId = tagId;
      this.$emit('checkTag', tagId);
    }
  }
}
</script>
<style>
.arco-image-footer{
  backdrop-filter: blur(1px);
  background-color: #0000004d !important;
  cursor: initial;
}
</style>
<style scoped lang="scss">
.tagList{
  overflow-x: auto;
  margin: 20px 16px 0;
}
.cookbookTag{
  border-radius: 14px;
}
.box{
  padding: 20px;
  cursor: zoom-in;
  aspect-ratio: 1 / 1;
  overflow: hidden;
}
.actions {
  display: flex;
  align-items: center;
}
.action {
  padding: 5px 4px;
  font-size: 14px;
  margin-left: 12px;
  border-radius: 2px;
  line-height: 1;
  cursor: pointer;
}
.action:first-child {
  margin-left: 0;
}

.action:hover {
  background: rgba(0,0,0,.5);
}
.actions-outer {
  .action {
    &:hover {
      color: #ffffff;
    }
  }
}
</style>
