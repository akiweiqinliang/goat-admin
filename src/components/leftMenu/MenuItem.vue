<template>
  <template v-if="!menu.children">
      <a-menu-item :key="menu.name" @click="routerPush(menu.name)">
        <SvgIcon :icon-name="menu.iconName" />
        {{ $t(menu.name)}}</a-menu-item>
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
import {useRouter} from "vue-router";
export default {
  name: "MenuItem",
  props: {
    menu: {
      required: true,
      type: Object,
    },
  },
  setup() {
    const router = useRouter();
    const routerPush = (name) => {
      router.push({name: name})
    }
    return{
      routerPush
    }
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
