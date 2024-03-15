<template>
  <a-row :gutter="16" class="mbStyle">
    <a-col :span="16">
      <a-card>
        <BarChart />
      </a-card>
    </a-col>
    <a-col :span="8">
      <a-card>
        <DoughnutChart />
      </a-card>
    </a-col>
  </a-row>
  <a-row>
    <a-col :span="24">
      <a-card>
        <MapChartCopy />
      </a-card>
    </a-col>
  </a-row>
</template>

<script>

import MapChart from "@cp/charts/MapChart.vue";
import DoughnutChart from "@cp/charts/DoughnutChart.vue";
import BarChart from "@cp/charts/BarChart.vue";
import {onMounted} from "vue";
import MapChartCopy from "@cp/charts/MapChartCopy.vue";

export default {
  name: "About",
  components: {MapChartCopy, BarChart, DoughnutChart, MapChart},
  setup() {
    onMounted(() => {
      // 创建一个 resize 事件
      const resizeEvent = new Event('resize');
      // 分派 resize 事件
      window.dispatchEvent(resizeEvent);
    })
  }
}
</script>

<style scoped>
.mbStyle{
  margin-bottom: 16px;
}
</style>
