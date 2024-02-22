<template>
  <a-config-provider :locale="locale">
  <a-layout class="layout-demo">
    <a-layout-sider
        hide-trigger
        collapsible
        :collapsed="collapsed"
    >
      <div class="logo tourBox" ref="tourLogo"><h1>😭</h1></div>
      <div ref="tourMenu" class="tourBox">
        <Menu />
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="padding:0 20px;">
        <a-row justify="space-around">
          <a-col :span="19">
            <div ref="tourControlBtn" class="tourBox" style="display: inline-flex">
              <a-button shape="round" @click="onCollapse">
                <IconCaretRight v-if="collapsed" />
                <IconCaretLeft v-else />
              </a-button>
            </div>
            <a-button shape="round" style="margin-left: 20px;" @click="replayGuide">➡️ click me to replay shepherd 💥</a-button>
          </a-col>
          <a-col :span="4">
            <a-select
                v-model="language"
                @change="handleLanguageChange(language.value)"
                :style="{width:'160px',borderRadius: '20px'}"
                placeholder="Select language"
                :trigger-props="{ autoFitPopupMinWidth: true }"
            >
              <a-option v-for="item of langData" :value="item" :label="item.label" />
            </a-select>
          </a-col>
          <a-col :span="1">
            <a-switch checked-color="#000000" v-model="colorValue" @change="handleColorChange">
              <template #checked-icon>
                🌛
              </template>
              <template #unchecked-icon>
                ☀️
              </template>
            </a-switch>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout style="padding: 24px;">
        <div ref="tourContent">
          <a-layout-content>
            <RouterView />
          </a-layout-content>
        </div>
        <a-layout-footer>
          copyright
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
  </a-config-provider>
</template>
<script>
import { defineComponent, ref, computed } from 'vue';
import { Message} from '@arco-design/web-vue';

import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
import enUS from '@arco-design/web-vue/es/locale/lang/en-us';

import {
  IconCaretRight,
  IconCaretLeft,
} from '@arco-design/web-vue/es/icon';
import Menu from "../components/Menu.vue";

export default defineComponent({
  name: 'CommonLayout',
  components: {
    Menu,
    IconCaretRight,
    IconCaretLeft,
  },
  setup() {
    const colorValue = ref(JSON.parse(localStorage.getItem('theme-appearance')) || false);
    const collapsed = ref(false);
    const langData = ref([
      {
        label: '中文',
        value: 'zh',
      },
      {
        label: 'English',
        value: 'en',
      },
      {
        label: '跟随系统',
        value: navigator.language || navigator.userLanguage,
      }
    ])
    const language = ref({
      label: '中文',
      value: 'zh',
    });
    const onCollapse = () => {
      collapsed.value = !collapsed.value;
    };
    const locales = {
      'zh': zhCN,
      'en': enUS,
    };

    const localeType = ref('zh');
    const locale = computed(() => {
      return locales[localeType.value] || zhCN;
    });
    return {
      langData,
      language,
      colorValue,
      collapsed,
      onCollapse,
      localeType,
      locale
    };
  },
  mounted(){
    if (!localStorage.getItem('finishShepherd')){
      this.createTour();
      this.tour.start();
    }
    if (localStorage.getItem('theme-appearance')){
      this.handleColorChange()
    }
  },
  methods: {
    handleColorChange() {
      if (this.colorValue) {
        document.body.setAttribute('arco-theme', 'dark')
        document.body.style.background = 'black';
      }else {
        document.body.removeAttribute('arco-theme');
        document.body.style.background = 'transparent';
      }
      localStorage.setItem('theme-appearance', JSON.stringify(this.colorValue))
    },
    handleLanguageChange(locale) {
      this.$i18n.locale = locale;
      this.localeType = locale;
    },
    replayGuide() {
      this.createTour();
      this.tour.start();
    },
    createTour(){
      this.tour = this.$shepherd({
        useModalOverlay: true,
        exitOnEsc: true,
      });

      this.tour.addSteps([
        {
          attachTo: { element: this.$refs.tourLogo, on: 'bottom-start' },
          text: 'this is Logo',
          classes: 'example-step-extra-class',
          cancelIcon: {
            enabled: true,
          },
          buttons: [
            {
              text: 'Next',
              action: this.tour.next
            }
          ]
        },
        {
          attachTo: { element: this.$refs.tourMenu, on: 'right' },
          text: 'this is Menu',
          classes: 'example-step-extra-class',
          cancelIcon: {
            enabled: true,
          },
          buttons: [
            {
              text: 'Back',
              action: this.tour.back
            },
            {
              text: 'Next',
              action: this.tour.next
            }
          ]
        },
        {
          attachTo: { element: this.$refs.tourControlBtn, on: 'bottom-start' },
          text: 'this btn can help you to close or open the menu ',
          classes: 'example-step-extra-class',
          cancelIcon: {
            enabled: true,
          },
          buttons: [
            {
              text: 'Back',
              action: this.tour.back
            },
            {
              text: 'Next',
              action: this.tour.next
            }
          ]
        },
        {
          attachTo: { element: this.$refs.tourContent, on: 'bottom' },
          text: 'here is your dashboard, you can markdown something in here',
          classes: 'example-step-extra-class',
          cancelIcon: {
            enabled: true,
          },
          buttons: [
            {
              text: 'Back',
              action: this.tour.back
            },
            {
              text: 'End',
              action: () => {
                this.tour.complete();
                localStorage.setItem('finishShepherd', 'yes')
              }
            }
          ]
        }
      ]);
    }
  }
});
</script>
<style scoped>
.layout-demo {
  height: 100vh;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}
.layout-demo :deep(.arco-layout-sider) .logo {
  height: 32px;
  margin: 12px 8px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.layout-demo :deep(.arco-layout-sider-light) .logo{
  background: var(--color-fill-2);
}
.layout-demo :deep(.arco-layout-header)  {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
}
.layout-demo :deep(.arco-layout-footer) {
  height: 48px;
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
}
.layout-demo :deep(.arco-layout-content) {
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  background: var(--color-bg-3);
}
.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-content)  {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  /*text-align: center;*/
}
</style>
