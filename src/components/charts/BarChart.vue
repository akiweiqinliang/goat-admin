<template>
  <div ref="fatherNode" style="display: flex; width: 100%; position: relative;">
    <div ref="chartDom"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import {onBeforeUnmount, onMounted, ref, shallowRef} from "vue";
export default {
  name: "BarChart",
  setup() {
    const chartDom = shallowRef(null);
    const chart = shallowRef(null);
    const fatherNode = shallowRef(null);

    const resizeTimer = ref(null);
    const option = {

      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: ['Evaporation', 'Precipitation', 'Temperature']
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Precipitation',
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: '{value} ml'
          }
        },
        {
          type: 'value',
          name: 'Temperature',
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            formatter: '{value} °C'
          }
        }
      ],
      series: [
        {
          name: 'Evaporation',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' ml';
            }
          },
          data: [
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
          ]
        },
        {
          name: 'Precipitation',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' ml';
            }
          },
          data: [
            2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
          ]
        },
        {
          name: 'Temperature',
          type: 'line',
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value) {
              return value + ' °C';
            }
          },
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
      ]
    };
    function handleResize() {
      clearTimeout(resizeTimer.value); // 清除之前的延迟计时器
      //    在延迟时间后调用 resize() 方法
      resizeTimer.value = setTimeout(() => {
        // 获取新的父元素宽度
        const newParentWidth = fatherNode.value.offsetWidth;
        // 设置新的宽度并调用 resize() 方法
        chart.value.resize({ width: newParentWidth, height: newParentWidth / 2 - 24});
      }, 200); // 延迟时间可以根据实际情况进行调整
    }
    onMounted(() => {
      const parentWidth = fatherNode.value.offsetWidth;
      chart.value = echarts.init(chartDom.value, null, {
        width: parentWidth,
        height: parentWidth / 2,
      });
      chart.value.setOption(option);
      // 监听窗口大小改变事件
      window.addEventListener('resize', handleResize);
    })
    onBeforeUnmount(() => {
      // 在组件销毁之前清除定时器和事件监听
      clearTimeout(resizeTimer.value);
      window.removeEventListener('resize', handleResize);
    });
    return {
      chartDom,
      chart,
      fatherNode
    }
  },
}
</script>

<style scoped>

</style>
