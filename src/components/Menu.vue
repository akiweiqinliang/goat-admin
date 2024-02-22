<template>
  <a-menu
      :defaultOpenKeys="['1']"
      :selected-keys="selectedKeys"
      :style="{ width: '100%' }"
      @menuItemClick="onClickMenuItem"
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
    return {
      selectedKeys,
    };
  },
  mounted() {
    this.selectedKeys = [this.$route.name] || ['home']
  },
  computed: {
    myRouter() {
      return routes[0].children;
    }
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
