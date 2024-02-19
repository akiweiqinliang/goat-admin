<template>
  <a-menu
      :defaultOpenKeys="['1']"
      :selected-keys="selectedKeys"
      :style="{ width: '100%' }"
      @menuItemClick="onClickMenuItem"
  >
    <router-link :to="{name: 'home'}">
    <a-menu-item key="home">
      <IconHome />
      Home
    </a-menu-item>
    </router-link>
    <router-link :to="{name: 'dashboard'}">
    <a-menu-item key="dashboard">
      <IconCalendar />
        Dashboard
    </a-menu-item>
    </router-link>
    <router-link :to="{name: 'about'}">
      <a-menu-item key="about">
        <IconCalendar />
        About
      </a-menu-item>
    </router-link>
    <a-sub-menu key="1">
      <template #title>
        <span><IconCalendar />Navigation 1</span>
      </template>
      <a-menu-item key="1_1">Menu 1</a-menu-item>
      <a-menu-item key="1_2">Menu 2</a-menu-item>
      <a-sub-menu key="2" title="Navigation 2">
        <a-menu-item key="2_1">Menu 1</a-menu-item>
        <a-menu-item key="2_2">Menu 2</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="3" title="Navigation 3">
        <a-menu-item key="3_1">Menu 1</a-menu-item>
        <a-menu-item key="3_2">Menu 2</a-menu-item>
        <a-menu-item key="3_3">Menu 3</a-menu-item>
      </a-sub-menu>
    </a-sub-menu>
    <a-sub-menu key="4">
      <template #title>
        <span><IconCalendar />Navigation 4</span>
      </template>
      <a-menu-item key="4_1">Menu 1</a-menu-item>
      <a-menu-item key="4_2">Menu 2</a-menu-item>
      <a-menu-item key="4_3">Menu 3</a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<script>
import {defineComponent, ref} from 'vue';
import { Message} from '@arco-design/web-vue';
import {
  IconCaretRight,
  IconCaretLeft,
  IconHome,
  IconCalendar,
} from '@arco-design/web-vue/es/icon';

export default defineComponent({
  name: 'Menu',
  components: {
    IconCaretRight,
    IconCaretLeft,
    IconHome,
    IconCalendar,
  },
  setup() {
    let selectedKeys = ref([])
    return {
      selectedKeys,
    };
  },
  mounted() {
    this.selectedKeys = [this.$route.name] || ['home']
  },
  watch: {
    'this.$route.name': function (val) {
      if (val) {
        this.selectedKeys = [val]
      }
    }
  },
  methods: {
    onClickMenuItem(key) {
      this.selectedKeys = []
      this.selectedKeys.push(key)
      Message.info({ content: `You select ${key}`, showIcon: true });
    }
  }
});
</script>

<style scoped>

</style>
