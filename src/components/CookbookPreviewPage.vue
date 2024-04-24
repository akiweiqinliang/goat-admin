<template>
  <div class="previewPage">
    <a-typography>
      <a-typography-title class="CBtitle">
        {{ cookbook?.title }}
      </a-typography-title>
      <a-row justify="space-between" align="bottom">
        <a-space>
          <a-tag>
            {{ tag }}
          </a-tag>
          <a-tag>
            {{ cookbook?.category === 0 ? '中餐' : '西餐' }}
          </a-tag>
        </a-space>
        <a-space class="time">
            发布日期：{{ dayjs(cookbook?.createTime).format('YYYY-MM-DD') }}
        </a-space>
      </a-row>
      <a-typography-paragraph class="mainText">
        <div class="ck-content" v-html="cookbook?.cookingWay"></div>
      </a-typography-paragraph>
    </a-typography>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "CookbookPreviewPage",
  methods: {dayjs},
  props: {
    cookbook: {
      require: true,
      type: Object,
      default: {},
    }
  },
  data() {
    return{
    }
  },
  computed: {
    tag() {
      if (this.cookbook.tagObj) {
        return this.cookbook?.tagObj?.value;
      }
      return this.cookbook.tag;
    }
  }
}
</script>

<style scoped lang="scss">
.previewPage{
  .time{
    font-size: 14px;
  }
  .mainText{
    margin: 30px 0;
  }
}
.CBtitle{
  margin-top: 10px;
}
@media screen and (max-width: 576px){
  .CBtitle{
    font-size: 18px;
    margin: 10px 0 12px;
  }
}
</style>
