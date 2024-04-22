<template>
<a-card>
  <a-row justify="space-between">
    <h4>鸡汤 🎲</h4>
    <a-space>
      <a-button type="primary" @click="generate">生成</a-button>
      <a-button @click="text = ''">清空</a-button>
    </a-space>
  </a-row>
  <a-row class="contentBox">
    <div class="showTxt" v-show="text === ''">ฅ●ω●ฅ</div>
      <span class="title">{{ title }}</span>
      <span>{{ text }}</span>
  </a-row>

</a-card>
</template>

<script>
import {reactive, ref, toRefs} from "vue";
import axios from "axios";

export default {
  name: "JiTang",
  setup() {
    const joke = reactive({
      text: '',
      title: ''
    })
    const generate = async () => {
      const res = await axios.get('https://api.vvhan.com/api/dailyEnglish?type=sj');
      joke.text = res.data.zh
      joke.title = res.data.en
    }
    return {
      ...toRefs(joke),
      generate
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
  min-height: 60px;
  border: 1px dashed rgb(var(--primary-6));
  border-radius: 8px;
  margin-top: 16px;
  padding: 10px 8px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  span{
    font-weight: bold;
  }
  .title{
    margin-bottom: 4px;
  }
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
</style>
