<template>
  <a-menu
      :defaultOpenKeys="defaultOpenKeys"
      :selected-keys="selectedKeys"
      :style="{ width: '100%' }"
      @menuItemClick="onClickMenuItem"
      @sub-menu-click="onClickSubMenu"
  >
    <MenuItem
        v-for="(item, index) in myRouter"
        :key="`left-menu-${index}-${item.name}`"
        :menu="item"
    ></MenuItem>
  </a-menu>
</template>

<script>
import {defineComponent, ref} from 'vue';
import { Message } from '@arco-design/web-vue';
import {
  IconCaretRight,
  IconCaretLeft,
  IconHome,
  IconCalendar,
} from '@arco-design/web-vue/es/icon';
import { routes } from '@/router/routes';
import MenuItem from "@cp/MenuItem.vue";

export default defineComponent({
  name: 'Menu',
  components: {
    MenuItem,
    IconCaretRight,
    IconCaretLeft,
    IconHome,
    IconCalendar,
  },
  setup() {
    let selectedKeys = ref([])
    let defaultOpenKeys = ref(JSON.parse(localStorage.getItem('openMenu')) || [])
    return {
      selectedKeys,
      defaultOpenKeys
    };
  },
  mounted() {
    this.selectedKeys = [this.$route.name] || ['home']
  },
  computed: {
    myRouter() {
      return routes[0].children;
    },
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
    },
    onClickSubMenu(key) {
      if (!key) {
        return
      }
      if (this.defaultOpenKeys.includes(key)){
        this.defaultOpenKeys = this.defaultOpenKeys.filter(item => item !== key);
      }else {
        this.defaultOpenKeys.push(key);
      }
      localStorage.setItem('openMenu', JSON.stringify(this.defaultOpenKeys))
    }
  }
});
</script>

<style scoped>

</style>
