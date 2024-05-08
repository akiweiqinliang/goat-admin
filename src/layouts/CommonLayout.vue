<template>

  <a-config-provider :locale="locale">
  <a-layout class="layout-demo">
    <a-layout-sider
        hide-trigger
        collapsible
        :collapsed="collapsed"
        breakpoint="lg"
        @collapse="onCollapse"
        :collapsed-width="collapsedAll ? 0 : 48"
        class="pc"
    >
      <div class="logo tourBox" ref="tourLogo" @click="toLandingPage" :style="collapsed ? 'justify-content: center;' : ''">
        <a-row align="center" justify="space-between" :wrap="false" >
          <a-avatar>
            <img src="../assets/goat.png" alt="goat"/>
          </a-avatar>
          <div style="font-stretch: 130%; font-weight: bold; margin-left: 12px;" :style="collapsed ? 'opacity: 0; width: 0;    transition: all .3s; margin-left: 0px;' : 'opacity: 1; width: auto;    transition: all .3s;' ">
            Goat Admin
          </div>
        </a-row>
      </div>
      <div ref="tourMenu" class="tourBox">
        <Menu />
      </div>
    </a-layout-sider>
    <a-layout>
      <a-row class="mbHeader">
        <a-col :span="24" :xs="24" :sm="0" class="mobile mbHeader">
          <a-layout-header>
              <a-row align="center" justify="space-between" :wrap="false" style="padding: 0 16px;">
                  <a-space>
                    <router-link :to="{name: 'landing'}">
                    <a-avatar>
                      <img src="../assets/goat.png" alt="goat"/>
                    </a-avatar>
                    <span style="color: var(--color-text-1); font-weight: bold;" >
                    Goat Admin
                  </span>
                    </router-link>
                  </a-space>

                <a-space>
                  <a-trigger position="br" trigger="click" auto-fit-position :unmount-on-close="false">
                    <a-tag size="large">{{ user }}</a-tag>
                    <template #content>
                      <a-space>
                        <router-link :to="{name: 'login'}">
                          <a-button type="primary" style="margin-top: 10px;" >{{ $t('signOut') }}</a-button>
                        </router-link>
                      </a-space>
                    </template>
                  </a-trigger>
                  <a-button @click="mbCollapsed = !mbCollapsed">
                    <template #icon>
                      <icon-menu />
                    </template>
                  </a-button>
                </a-space>

                <a-modal :modal-style="{backgroundColor: 'var(--color-bg-2)', right: '-30px'}" width="70%" v-model:visible="mbCollapsed" :top="64" :align-center="false" :footer="false" :hide-title="true">
                  <a-row justify="end" style="margin-bottom: 8px;">
                    <a-button shape="circle" size="small" @click="mbCollapsed = false">
                      <template #icon>
                        <IconClose />
                      </template>
                    </a-button>
                  </a-row>
                  <Menu />
                  <a-divider />
                  <a-row justify="space-between">
                    <a-switch checked-color="#000000" v-model="colorValue" @change="handleColorChange">
                      <template #checked-icon>
                        <img src="../assets/imgs/layout/night.png" width="18" height="18" style="display:block;"/>
                      </template>
                      <template #unchecked-icon>
                        <img src="../assets/imgs/layout/sun.png" width="18" height="18" style="display: block;"/>
                      </template>
                    </a-switch>
                  <a-select
                      v-model="language"
                      @change="handleLanguageChange(language.value)"
                      :style="{width:'auto',borderRadius: '20px'}"
                      placeholder="Select language"
                      :trigger-props="{ autoFitPopupMinWidth: true }"
                      size="small"
                  >
                    <a-option v-for="item of langData" :value="item" :label="item.label" />
                  </a-select>

                  </a-row>
                </a-modal>
              </a-row>
          </a-layout-header>
        </a-col>
        <a-col :span="24" :xs="0" :sm="24">
          <a-layout-header class="arco-row arco-row-align-center arco-row-justify-space-between" style="padding:0 20px;">
            <a-col :span="16">
              <a-row align="center" justify="start" :wrap="false">
                <div ref="tourControlBtn" class="tourBox" style="display: inline-flex">
                  <a-button shape="round" @click="onCollapse">
                    <IconCaretRight v-if="collapsed" />
                    <IconCaretLeft v-else />
                  </a-button>
                </div>
                <a-button
                    shape="round"
                    style="margin-left: 20px;"
                    @click="replayGuide">➡️ click me to replay shepherd 💥</a-button>
              </a-row>
            </a-col>
            <a-col :span="8">
              <a-row justify="end" align="center" :wrap="false">
                <a-space>
                  <a-trigger position="br" auto-fit-position :unmount-on-close="false">
                      <a-tag>{{ user }}</a-tag>
                    <template #content>
                      <a-space>
                        <router-link :to="{name: 'login'}">
                          <a-button type="primary" style="margin-top: 10px;" >{{ $t('signOut') }}</a-button>
                        </router-link>
                      </a-space>
                    </template>
                  </a-trigger>
                  <a-select
                      v-model="language"
                      @change="handleLanguageChange(language.value)"
                      :style="{width:'auto',borderRadius: '20px'}"
                      placeholder="Select language"
                      :trigger-props="{ autoFitPopupMinWidth: true }"
                  >
                    <a-option v-for="item of langData" :value="item" :label="item.label" />
                  </a-select>
                  <a-switch checked-color="#000000" v-model="colorValue" @change="handleColorChange">
                    <template #checked-icon>
                      <img src="../assets/imgs/layout/night.png" width="18" height="18" style="display:block;"/>
                    </template>
                    <template #unchecked-icon>
                      <img src="../assets/imgs/layout/sun.png" width="18" height="18" style="display: block;"/>
                    </template>
                  </a-switch>
                </a-space>
              </a-row>

            </a-col>
          </a-layout-header>
        </a-col>
      </a-row>

      <a-layout class="layoutContainerPadding">
          <div ref="tourContent">
            <router-view v-slot="{ Component }">
              <keep-alive :exclude="['NoteDetail','CookbookDetail', 'ImgList' ]">
                <component :is="Component" />
              </keep-alive>
            </router-view>
          </div>
        <a-layout-footer>
          <a-divider />
          <a-row justify="space-between" class="footerRow">
            <span>
              <SvgIcon icon-name="IconCopyright" />
              2024 梁炜勤 粤ICP备2024233910号
            </span>
            <div class="footerRight">
              <span>
                <IconEmail />
              Email: 13724116512@163.com
              </span>
              <a href="https://github.com/akiweiqinliang" target="_blank">
                <IconGithub />
              </a>
            </div>
          </a-row>
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
  IconWechat,
  IconGithub,
  IconEmail,
  IconMenuFold,
  IconMenuUnfold,
  IconMenu,
  IconClose
} from '@arco-design/web-vue/es/icon';
import Menu from "@cp/leftMenu/Menu.vue";
import SvgIcon from "@cp/SvgIcon.vue";
import {useRouter} from "vue-router";
import {adminStore} from "../stores/admin.js";

export default defineComponent({
  name: 'CommonLayout',
  components: {
    SvgIcon,
    Menu,
    IconCaretRight,
    IconCaretLeft,
    IconGithub,
    IconEmail,
    IconWechat,
    IconMenuFold,
    IconMenuUnfold,
    IconMenu,
    IconClose,
  },
  setup() {
    const user = computed(() => {
      return localStorage.getItem('admin');
    })
    const router = useRouter();
    function toLandingPage() {
      router.push({ name: 'landing' })
    }
    const collapsedAll = ref(false)
    const popupVisible = ref(false)
    const colorValue = ref(JSON.parse(localStorage.getItem('theme-appearance')) || false);
    const collapsed = ref(false);
    const mbCollapsed = ref(true)
    const langData = ref([
      {
        label: '中文',
        value: 'zh',
      },
      {
        label: 'English',
        value: 'en',
      },
    ])
    const language = ref({
      label: '中文',
      value: 'zh',
    });
    const onCollapse = () => {
      collapsed.value = !collapsed.value;
      mbCollapsed.value = !mbCollapsed.value;
      const resizeEvent = new Event('resize');
      // 分派 resize 事件
      window.dispatchEvent(resizeEvent);
    };
    const locales = {
      'zh': zhCN,
      'en': enUS,
    };
    const closeAll = () => {
      popupVisible.value = false;
      collapsedAll.value = !collapsedAll.value
      collapsed.value = true
    }

    const localeType = ref('zh');
    const locale = computed(() => {
      return locales[localeType.value] || zhCN;
    });
    return {
      user,
      langData,
      language,
      colorValue,
      collapsed,
      mbCollapsed,
      onCollapse,
      localeType,
      locale,
      popupVisible,
      collapsedAll,
      closeAll,
      toLandingPage,
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
    adminStore,
    handleSidePop(item) {
      this.language = item;
      this.handleLanguageChange(item.value)
      this.popupVisible = false;
    },
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
      // console.log(locale)
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
<style scoped lang="scss">
.layout-demo {
  height: 100vh;
  max-width: 1440px;
  margin: auto;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}
.layout-demo :deep(.arco-layout-sider){
  box-shadow: none;
}
.layout-demo :deep(.arco-layout-sider) .logo {
  cursor: pointer;
  height: 32px;
  margin: 12px 8px;
  //background: rgba(255, 255, 255, 0.2);
  color: var(--color-text-1);
  display: flex;
  align-items: center;
  //justify-content: center;
  //overflow: hidden;
}
.layout-demo :deep(.arco-layout-sider-light) .logo{
  //background: var(--color-fill-2);
}
.layout-demo :deep(.arco-layout-header)  {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
}
.layout-demo :deep(.arco-layout-footer) {
  //height: 48px;
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  //line-height: 48px;
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
  font-size: 16px;
  //font-stretch: condensed;
  /*text-align: center;*/
  .ck{
    color: var(--color-text-2);
    background: var(--color-bg-3);
    background-color: var(--color-bg-3);
  }
}
.layout-demo :deep(.arco-layout-footer){
  flex: 1;
  justify-content: end;
}
.layoutContainerPadding{
  padding: 24px;
}
.footerRow{
  .footerRight{
    span{
      margin-right: 16px;
    }
  }
  span{
    font-size: 14px;
  }
  a{
    text-decoration: none;
    color: var(--color-text-1);
  }
}
@media screen and (max-width: 576px){
  .layoutContainerPadding{
    padding: 16px;
  }
  .footerRow{
    justify-content: center;
    flex-direction: column;
    span{
      line-height: 20px;
      font-size: 12px;
      width: 100%;
      display: inline-block;
    }
    .footerRight{
      display: inline-flex;
      justify-content: space-between;
      width: 100%;
    }
  }
}
.mobile{
  display: none;
}
.mbHeader{
  position: sticky;
  top: 0;
  z-index: 998;
  a{
    text-decoration: none;
  }
}
@media screen and (max-width: 576px){
  .pc{
    display: none;
  }
  .mobile{
    display: initial;
  }
}
</style>
