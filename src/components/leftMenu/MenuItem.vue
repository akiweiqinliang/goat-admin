<template>
  <template v-if="!menu.children">
    <router-link :to="{name: menu.name}">
      <a-menu-item :key="menu.name">
        <SvgIcon :icon-name="menu.iconName" />
        {{ $t(menu.name)}}</a-menu-item>
    </router-link>
  </template>
  <template v-else>
        <a-sub-menu :key="menu.layoutName">
          <template #title>
            <span>
             <SvgIcon :icon-name="menu.iconName" />
              {{ $t(menu.layoutName) }}</span>
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
import SvgIcon from "@cp/SvgIcon.vue";
export default {
  name: "MenuItem",
  props: {
    menu: {
      required: true,
      type: Object,
    },
  },
  components: {
    SvgIcon,
    IconCaretRight,
    IconCaretLeft,
    IconHome,
    IconCalendar,
  },
}
</script>

<style scoped>

</style>
