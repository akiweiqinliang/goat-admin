<template>
  <a-card class="riskCard">
    <a-row justify="space-between" align="center">
      <h4>风险计算器 💰</h4>
      <a-space>
        <a-button @click="generate" type="primary">生成</a-button>
        <a-button @click="clean">清空</a-button>
      </a-space>
    </a-row>
    <a-tabs :default-active-key="2" @change="handleKeyChange">
      <a-tab-pane :key="1" title="加仓">
        <a-space size="medium" direction="vertical" style="width: 100%">
          <a-input allow-clear v-model.trim="bp" placeholder="绿的">
            <template #prepend>当前BP</template>
          </a-input>
          <a-input allow-clear v-model.trim="profit" placeholder="2.2-2.35">
            <template #prepend>当前收益率</template>
          </a-input>
          <a-input allow-clear placeholder="日跌幅大于0.15%的天数" v-model="days">
            <template #prepend>连续回调累计天数</template>
          </a-input>
          <a-space>
            <a-checkbox v-model="news">央妈发文(后两天)</a-checkbox>
            <a-checkbox v-model="market">股市红三天</a-checkbox>
          </a-space>
          <a-space>
            <a-checkbox v-model="monthEnd">月尾(25-31)</a-checkbox>
            <a-checkbox v-model="holiday">临近节假日(前2天)</a-checkbox>
          </a-space>
        </a-space>
      </a-tab-pane>
      <a-tab-pane :key="2" title="减仓">
        <a-space size="medium" direction="vertical" style="width: 100%">
          <a-input allow-clear v-model.trim="bp" placeholder="红的">
            <template #prepend>当前BP</template>
          </a-input>
          <a-input allow-clear v-model.trim="profit" placeholder="2.2-2.35">
            <template #prepend>当前收益率</template>
          </a-input>
          <a-input allow-clear placeholder="日涨幅大于0.15%的天数" v-model="days">
            <template #prepend>连续大涨累计天数</template>
          </a-input>
          <a-space>
            <a-checkbox v-model="news">央妈发文(坏消息)</a-checkbox>
            <a-checkbox v-model="market">股市超3100点(红)</a-checkbox>
          </a-space>
          <a-space>
            <a-checkbox v-model="monthEnd">月尾(25-31)</a-checkbox>
            <a-checkbox v-model="holiday">临近节假日(前5天)</a-checkbox>
          </a-space>
        </a-space>
      </a-tab-pane>
    </a-tabs>

    <a-row class="contentBox">
      <div class="showTxt" v-show="cleanFlag">(つ´ω`)つ ♥ 💰</div>
      <a-space>
       <span>{{result}}</span>
      </a-space>
    </a-row>
  </a-card>
</template>

<script>
import {reactive, ref, toRefs} from "vue";

export default {
  name: "RiskCalculator",
  setup() {
    const riskStore = reactive({
      bp: null,
      profit: null,
      days: null,
      news: false,
      market: false,
      monthEnd: false,
      holiday: false,
      type: 2
    })
    const noVegetable = ref(false)
    const cleanFlag = ref(true)
    const result = ref('')
    function handleKeyChange(key) {
      riskStore.type = key
      console.log(key)
    }
    function generate() {
      if (riskStore.type === 2) {
      //   减仓 当前趋势为上涨
      //   let n1 = riskStore.bp >= 3.5 ? 4 : riskStore.bp >= 3 ? 3 : riskStore.bp >= 2.5 ? 2.5 : riskStore.bp >= 2 ? 2 : riskStore.bp >= 1.5 ? 1.5 : riskStore.bp >= 1 ? 1: 0
        // 计算实际 bp 在 3.5 至 0.5 之间的范围内所占的百分比
        let bpPercentage = Math.max(0, Math.min(1, (riskStore.bp - 0.5) / 3));
        // // 计算在此范围内的 n1 的值，取值范围在 0 到 4 之间
        let n1 = Math.round(bpPercentage * 4 * 10) / 10;
        if (riskStore.bp > 3.75) {
          n1 *= 1.5
        }
        let n2 = riskStore.days >= 3 ? 3.5 : riskStore.days >= 2 ? 2 : 0
        // let n2 = Math.min(3, Math.max(0, riskStore.days));
        if (riskStore.days >= 4) {
          n2 *= 1.5
        }
        let n3 = riskStore.news ? 2 : 0
        let n4 = riskStore.market ? 1 : 0
        let n5 = riskStore.monthEnd ? 0.7 : 0
        let n6 = riskStore.holiday ? 1 : 0
        let n7 = riskStore.profit > 2.35 ? 3 : riskStore.profit < 2.2 ? 0 : ((riskStore.profit - 2.2) / (2.35 - 2.2)) * 3
        let riskNumber = (n1+n2+n3+n4+n5+n6+n7) / 15.2
        console.log(riskNumber)
        riskNumber >= 0.5 ? result.value = '跑路' : result.value = '再观望'

      }else {
      //   加仓 当前趋势为下跌 绿的bp
      //   let n1 = riskStore.bp >= 3.5 ? 4 : riskStore.bp >= 3 ? 3 : riskStore.bp >= 2.5 ? 2.5 : riskStore.bp >= 2 ? 2 : riskStore.bp >= 1.5 ? 1.5 : riskStore.bp >= 1 ? 1 : 0
        // 计算实际 bp 在 3.5 至 0.5 之间的范围内所占的百分比
        let bpPercentage = Math.max(0, Math.min(1, (riskStore.bp - 0.5) / 3));
        // 计算在此范围内的 n1 的值，取值范围在 0 到 4 之间
        let n1 = Math.round(bpPercentage * 4 * 10) / 10;
        if (riskStore.bp > 3.75) {
          n1 *= 1.2
        }
        let n2 = riskStore.days >= 4 ? 3 : riskStore.days >= 3 ? 2 : riskStore.days >= 2 ? 1 : 0
        if (riskStore.days >= 5) {
          n2 *= 1.5
        }
        let n3 = riskStore.news ? 2 : 0
        let n4 = riskStore.market ? 1 : 0
        let n5 = riskStore.monthEnd ? 0.7 : 0
        let n6 = riskStore.holiday ? 1 : 0
        let n7 = riskStore.profit <= 2.2 ? 2 : riskStore.profit >= 2.35 ? 0 : ((2.35 - riskStore.profit) / (2.35 - 2.2)) * 2
        let riskNumber = (n1+n2+n3+n4+n5+n6+n7) / 13.7
        riskNumber >= 0.5 ? result.value = '加' : result.value = '再观望'
      }
      cleanFlag.value = false
    }
    function clean() {
      cleanFlag.value = true
    }
    return {
      noVegetable,
      generate,
      clean,
      cleanFlag,
      ...toRefs(riskStore),
      handleKeyChange,
      result
    }
  }
}
</script>

<style scoped lang="scss">
h4{
  margin-top: 4px;
}
.riskCard{
  .contentBox{
    width: 100%;
    height: 60px;
    border: 1px dashed rgb(var(--primary-6));
    border-radius: 8px;
    margin-top: 20px;
    padding: 10px 8px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    span{
      font-weight: bold;
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
}
</style>
