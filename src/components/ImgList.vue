<template>
  <a-row class="tagList">
    <a-space>
      <a-tag checkable
             :default-checked="checkTagId === 0"
             v-for="tag in tagList"
             :key="`cookbook-tag-${tag.id}`"
             :checked="checkTagId === tag.tadId"
             @check="checkTagId = tag.tadId"
             :bordered="false"
             class="cookbookTag"
      >
        {{tag.value}}
      </a-tag>
    </a-space>
  </a-row>
  <a-row justify="flex-start">
    <a-col :span="6"
           class="box" v-for="item in imgList"
           :key="`chinese-food-cookbook${item.id}`"
    >
      <a-image
          :src='item.imgUrl'
          :title='item.title'
          :description='item.updateTime'
          width="100%"
          style="vertical-align: top;"
      >
        <template #extra>
          <div class="actions">
            <a-tooltip content="查看菜谱">
              <span class="action"><icon-eye /></span>
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
import { ref } from 'vue';
import { IconEye, IconDownload, IconInfoCircle, IconTag } from '@arco-design/web-vue/es/icon';

export default {
  name: "ImgList",
  components: {
    IconEye, IconDownload, IconInfoCircle, IconTag
  },
  props: {
    imgList: {
      require: true,
      default: [],
      type: Array
    }
  },
  setup() {
    let checkTagId = ref(0)
    let tagList = ref([
      {
        id: 0,
        tadId: 0,
        value: '全部'
      },
      {
        id: 1,
        tadId: 1,
        value: '懒人快手'
      },
      {
        id: 2,
        tadId: 2,
        value: '清淡饮食'
      },
      {
        id: 3,
        tadId: 3,
        value: '无辣不欢'
      },
    ])
    return {
      tagList,
      checkTagId,
    }
  },
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
  padding: 20px 20px 0;
}
.cookbookTag{
  border-radius: 14px;
}
.box{
  padding: 20px;
  cursor: zoom-in;
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
