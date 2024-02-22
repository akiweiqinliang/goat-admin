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
      {{ $t('home') }}
    </a-menu-item>
    </router-link>
    <router-link :to="{name: 'dashboard'}">
    <a-menu-item key="dashboard">
      <IconCalendar />
        {{ $t('dashboard') }}
    </a-menu-item>
    </router-link>
<!--    <router-link :to="{name: 'about'}">-->
<!--      <a-menu-item key="about">-->
<!--        <IconCalendar />-->
<!--        {{ $t('map') }}-->
<!--      </a-menu-item>-->
<!--    </router-link>-->
    <a-sub-menu key="1">
      <template #title>
        <span><IconCalendar />{{ $t('cookbook') }}</span>
      </template>
      <router-link :to="{name: 'chineseFood'}">
        <a-menu-item key="1_1">{{ $t('ChineseFood') }}</a-menu-item>
      </router-link>
      <router-link :to="{name: 'westernFood'}">
        <a-menu-item key="1_2">{{ $t('WesternFood') }}</a-menu-item>
      </router-link>
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
import { routes } from '@/router/routes';

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
    console.log(this.myRouter)
    this.selectedKeys = [this.$route.name] || ['home']
  },
  computed: {
    myRouter() {
      return routes
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
