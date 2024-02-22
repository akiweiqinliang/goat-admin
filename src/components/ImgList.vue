<template>
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
          :preview-visible="visible1"
          @preview-visible-change="() => { visible1= false }"
      >
        <template #extra>
          <div class="actions">
            <span class="action" @click="() => { visible1 = true }"><icon-eye /></span>
            <span class="action" @click="onDownLoad"><icon-download /></span>
            <a-tooltip content="A user’s avatar">
              <span class="action"><icon-info-circle /></span>
            </a-tooltip>
          </div>
        </template>
      </a-image>
    </a-col>
  </a-row>
</template>

<script>
import { ref } from 'vue';
import { IconEye, IconDownload, IconInfoCircle } from '@arco-design/web-vue/es/icon';

export default {
  name: "ImgList",
  components: {
    IconEye, IconDownload, IconInfoCircle
  },
  props: {
    imgList: {
      require: true,
      default: [],
      type: Array
    }
  },
  setup() {
    const visible1 = ref(false);
    const visible2 = ref(false);

    return {
      visible1,
      visible2,
      onDownLoad() {
        console.log('download');
      },
    }
  }
}
</script>
<style>
.arco-image-footer{
  backdrop-filter: blur(1px);
  background-color: #0000004d !important;
}
</style>
<style scoped lang="scss">
.box{
  padding: 20px;
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
