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
  <a-row justify="flex-start" :gutter="20" style="padding: 20px 20px 0">
    <a-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" :xxl="4"
           v-for="item in imgList"
           :key="`chinese-food-cookbook${item.id}`">
      <div class="box">
        <img
            :src='item.imgUrl'
            :alt='item.title'
            width="100%"
            class="imageBox"
            @click="checkDetail(item.id)"
        />
        <a-row class="imgExtra" align="center">
          <a-col class="content" :span="12">
            <span>
             {{item.title}}
            </span>
            <span>
              {{item.updateTime}}
            </span>
          </a-col>
          <a-col class="actions" :span="12">
            <a-tooltip :content="item.title">
              <span class="action"><icon-eye /></span>
            </a-tooltip>
            <a-tooltip :content="item.tag">
              <span class="action"><icon-tag /></span>
            </a-tooltip>
            <a-popconfirm
                @ok="deleteCookbook(item.id)"
                :content="$t('deleteInfoMsg')">
              <icon-delete class="action"/>
            </a-popconfirm>
          </a-col>
        </a-row>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import {ref} from 'vue';
import {useRouter} from "vue-router";
import {IconDownload, IconEye, IconInfoCircle, IconTag, IconDelete} from '@arco-design/web-vue/es/icon';

export default {
  name: "ImgList",
  components: {
    IconEye, IconDownload, IconInfoCircle, IconTag, IconDelete
  },
  emits: ['checkTag', 'deleteCookbook'],
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
  setup($emit) {
    const router = useRouter();
    let checkTagId = ref(0);
    return {
      router,
      checkTagId,
    }
  },
  methods: {
    async checkDetail(cookbookId) {
      await this.router.push({name: 'cookbookDetail', params: {id: cookbookId}});
    },
    deleteCookbook(id) {
       this.$emit('deleteCookbook', id)
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
  //padding: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: space-between;
  img{
    transition: all .3s ease;
  }
  img:hover{
    transform: scale(1.1);
    transition: all .3s ease;
  }
  .imgExtra{
    width: calc(100% - 16px);
    position: absolute;
    bottom: 0;
    color: var(--color-white);
    background: rgba(0, 0, 0, 0.3);
    padding: 8px;
    .content{
      min-height: 40px;
      overflow: hidden;
      span{
        display: block;
        white-space: nowrap; /* 防止文本换行 */
        overflow: hidden; /* 隐藏溢出部分 */
        text-overflow: ellipsis; /* 显示省略号 */
      }
      span:nth-child(1) {
        font-size: 16px;
        margin-bottom: 4px;
      }
      span:nth-child(2) {
        font-size: 12px;
      }
    }
  }
  .imageBox{
    vertical-align: top;
    overflow: hidden;
    height: 100%;
    background-color: var(--color-fill-1);
  }
}
.actions {
  display: flex;
  align-items: center;
  justify-content: end;
}
.action {
  //padding: 5px 4px;
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
