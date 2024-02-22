<template>
  <template v-if="!menu.children">
    <router-link :to="{name: menu.name}">
      <a-menu-item :key="menu.name">
        <IconHome />{{ $t(menu.name) }}</a-menu-item>
    </router-link>
  </template>
  <template v-else>
        <a-sub-menu :key="menu?.name">
          <template #title>
            <span><IconCalendar />{{ $t(menu.layoutName) }}</span>
          </template>
          <MenuItem :menu="m" v-for="m in menu.children" :key="`m-${m.name}`"></MenuItem>
        </a-sub-menu>
  </template>

</template>

<script>
import {
  IconCaretRight,
  IconCaretLeft,
  IconHome,
  IconCalendar,
} from '@arco-design/web-vue/es/icon';
export default {
  name: "MenuItem",
  props: {
    menu: {
      required: true,
      type: Object,
    },
  },
  components: {
    IconCaretRight,
    IconCaretLeft,
    IconHome,
    IconCalendar,
  },
}
</script>

<style scoped>

</style>
