<template>
  <component :is="iconName" />
</template>

<script>
import {
  IconCaretRight,
  IconCaretLeft,
  IconHome,
  IconCalendar,
  IconCommon,
  IconStorage,
  IconBook,
  IconChineseFill,
  IconEnglishFill,
  IconEdit,
  IconMoreVertical,
} from '@arco-design/web-vue/es/icon';
import {ref} from "vue";
export default {
  name: "SvgIcon",
  props: {
    iconName: {
      type: String,
      required: false,
      default: "IconHome"
    }
  },
  components: {
    IconCaretLeft,
    IconCaretRight,
    IconHome,
    IconCalendar,
    IconCommon,
    IconStorage,
    IconChineseFill,
    IconEnglishFill,
    IconBook,
    IconEdit,
    IconMoreVertical,
    // 动态导入图标组件
    // IconComponent: () => import(`@arco-design/web-vue/es/icon/${this.iconName}`) /* @vite-ignore */,
  },
  setup() {
    // let currentComp = ref()
  }
}
</script>

<style scoped>

</style>
