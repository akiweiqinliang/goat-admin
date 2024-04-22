<template>
<a-card>
  <h4>星座运势占卜🔮</h4>
  <a-space direction="vertical" size="large">
    <a-radio-group v-model="type" :options="types">
      <template #label="{ data }">
        <a-tag>{{ data.label }}</a-tag>
      </template>
    </a-radio-group>
    <a-radio-group v-model="time" :options="times">
      <template #label="{ data }">
        <a-tag>{{ data.label }}</a-tag>
      </template>
    </a-radio-group>
    <a-row justify="center">
      <a-space>
        <a-button @click="divination" type="primary">开始</a-button>
        <a-button @click="clean">清空</a-button>
      </a-space>
    </a-row>
  </a-space>

  <a-row class="contentBox">
    <div class="showTxt" v-show="cleanFlag">🔮 (❛◡❛✿)</div>
    <ul v-show="!cleanFlag">
      <li style="margin-bottom: 0;">
        <a-row>
          <a-space style="margin-bottom: 4px;">
            <a-tag>{{ $t('all') }}运势</a-tag> <a-rate grading readonly :model-value="divinationResult?.fortune?.all || 0"/>
          </a-space>
          <a-col>
            <a-space v-for="item in divinationResult?.index" :key="item.key" class="fortuneItem">
              <a-tag>{{$t(item.key)}}</a-tag>
              <span>{{ item.number }} 分</span>
            </a-space>
          </a-col>
        </a-row>
      </li>
      <li>
        <a-tag>宜</a-tag> <span>{{ divinationResult?.todo?.yi || '无'}}</span>
        <a-tag>忌</a-tag> <span>{{ divinationResult?.todo?.ji || '无'}}</span>
      </li>
      <li>
        <a-tag>建议</a-tag> <span>{{ divinationResult?.shortcomment || '无'}}</span>
      </li>
      <li>
        <a-tag>幸运数字</a-tag> <span>{{ divinationResult?.luckynumber || '无'}}</span>
        <a-tag>幸运颜色</a-tag> <span>{{ divinationResult?.luckycolor || '无'}}</span>
      </li>
      <li>
        <a-tag>运势分析</a-tag>
      </li>
      <li class="bottomTabs">
        <a-tabs default-active-key="1" :size="'mini'">
          <a-tab-pane key="1" title="整体">
            <p>
              {{ divinationResult?.fortunetext?.all || '无' }}
            </p>
          </a-tab-pane>
          <a-tab-pane key="2" title="情感">
            <p>
              {{ divinationResult?.fortunetext?.love || '无' }}
            </p>
          </a-tab-pane>
          <a-tab-pane key="3" title="事业">
            <p>
              {{ divinationResult?.fortunetext?.work || '无' }}
            </p>
          </a-tab-pane>
          <a-tab-pane key="4">
            <template #title>财富</template>
            <p>
              {{ divinationResult?.fortunetext?.money || '无' }}
            </p>
          </a-tab-pane>
          <a-tab-pane key="5">
            <template #title>健康</template>
            <p>
              {{ divinationResult?.fortunetext?.health || '无' }}
            </p>
          </a-tab-pane>
        </a-tabs>
      </li>
      <span>
      </span>
    </ul>

  </a-row>
</a-card>
</template>

<script>
import {ref} from "vue";
import axios from "axios";

export default {
  name: "Horoscope",
  setup() {
    const divinationResult = ref('')
    const cleanFlag = ref(true)
    const type = ref('aries')
    const time = ref('today')
    const times = ref([
      { label: '今日', value: 'today' },
      { label: '明日', value: 'nextday' },
      { label: '本周', value: 'week' },
      { label: '本月', value: 'month' }
    ])
    const types = ref([
      { label: '白羊座', value: 'aries' },
      { label: '金牛座', value: 'taurus' },
      { label: '双子座', value: 'gemini' },
      { label: '巨蟹座', value: 'cancer' },
      { label: '狮子座', value: 'leo' },
      { label: '处女座', value: 'virgo' },
      { label: '天秤座', value: 'libra' },
      { label: '天蝎座', value: 'scorpio' },
      { label: '射手座', value: 'sagittarius' },
      { label: '摩羯座', value: 'capricorn' },
      { label: '水瓶座', value: 'aquarius' },
      { label: '双鱼座', value: 'pisces' }
    ]);
    const divination = () => {
      axios.get(`https://api.vvhan.com/api/horoscope?type=${type.value}&time=${time.value}`).then( res => {
        divinationResult.value = res.data
        if (res.data.index) {
          let fortuneIndex = [];
          for (const key in res.data.index) {
            fortuneIndex.push({
              key,
              value: res.data.index[key],
              number: Number(res.data.index[key].replace('%', ''))
            })
          }
          divinationResult.value.index = fortuneIndex;
        }
        console.log(divinationResult.value)
        cleanFlag.value = false
      })
    }
    const clean = () => {
      divinationResult.value = ''
      cleanFlag.value = true
    }
    return {
      time,
      type,
      types,
      times,
      divinationResult,
      divination,
      clean,
      cleanFlag
    }
  }
}
</script>

<style scoped lang="scss">
h4{
  margin-top: 4px;
}
.contentBox{
  width: 100%;
  height: auto;
  min-height: 60px;
  border: 1px dashed rgb(var(--primary-6));
  border-radius: 8px;
  margin-top: 20px;
  padding: 10px 8px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  overflow-x: scroll;
  .showTxt{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: var(--color-fill-2);
    color: var(--color-text-3);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 12px;
  }
}
ul{
  list-style: none;
  margin: 0;
  padding: 0;
  li{
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    span{
      font-weight: bold;
      font-size: 12px;
      margin-right: 10px;
    }
    .fortuneItem{
      margin-bottom: 8px;
    }
  }
}
.bottomTabs{
  p{
    display: block;
    margin: auto;
    width: calc(100% - 20px);
  }
}
</style>
