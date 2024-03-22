<template>
  <a-space size="large">
    <a-statistic title="累计数目" :value="number" show-group-separator >
      <template #suffix>
        <icon-arrow-rise />
      </template>
    </a-statistic>
    <a-statistic title="Growth Rate" :value="rate" :precision="2" :value-style="{ color: color }">
      <template #prefix>
        <icon-arrow-rise />
      </template>
      <template #suffix>%</template>
    </a-statistic>
  </a-space>
</template>

<script>
import {IconArrowRise} from '@arco-design/web-vue/es/icon';
export default {
  name: "CountNumberBox",
  components: {IconArrowRise},
  props: {
    number: {
      required: true,
      type: Number,
      default: 125670
    },
    rate: {
      required: false,
      type: Number,
      default: 50.52
    },
    color: {
      required: false,
      type: String,
      default: '#0fbf60'
    }
  }
}
</script>

<style scoped>

</style>
