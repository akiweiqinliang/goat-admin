<template>
  <div ref="fatherNode" style="display: flex; width: 100%; position: relative;">
    <div ref="chartDom"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import {inject, onBeforeUnmount, onMounted, ref, shallowRef} from "vue";
export default {
  name: "DoughnutChart",
  setup() {
    const chartDom = shallowRef(null);
    const chart = shallowRef(null);
    const fatherNode = shallowRef(null);

    const outsidePieData = ref(null)

    const resizeTimer = ref(null);
    const option = {
      title: {
        text: '菜谱统计',
        x: 'left',
        show: true,
        textStyle: {
          fontSize: 14,
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      series: [
        {
          name: '类别',
          type: 'pie',
          radius: [0, '35%'],
          itemStyle: {
            borderRadius: 2,
            borderColor: '#fff',
            borderWidth: 1,

          },
          label: {
            position: 'inner',
            fontSize: 10,
            // color: '#fff'
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1548, name: '中餐' },
            { value: 775, name: '西餐' },
          ]
        },
        {
          name: '标签',
          type: 'pie',
          radius: ['45%', '60%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 2,
            borderColor: '#fff',
            borderWidth: 1
          },
          labelLine: {
            length: 12
          },
          data: [],
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
        chart.value.resize({ width: newParentWidth, height: newParentWidth });
      }, 200); // 延迟时间可以根据实际情况进行调整
    }
    const getData = async () => {
      const api = inject('api')
      // 外圈data
      const result = await api.tagService.getCookbookTagList()
      const tagIds = result.data.records.map(item => {
        return {
          tagId: item.tagId,
          value: item.value
        }
      })
      let pieData = []
      for (const id of tagIds) {
        const result = await api.cookbookService.getCookbookByTagId(id.tagId)
        pieData.push({
          name: id.value,
          value: result.data.records.length
        })
      }
      outsidePieData.value = pieData;
      // 内圈data
      const innerChinese = await api.cookbookService.getCookBooksByCatId(null,null, 0)
      const innerWest = await api.cookbookService.getCookBooksByCatId(null,null, 1)
      const innerData = [
        {
          name: '中餐',
          value: innerChinese.data.total,
        },
        {
          name: '西餐',
          value: innerWest.data.total,
        },
      ]
      chart.value.setOption({
        series: [
          {
            name: '标签',
            data: outsidePieData.value
          },
          {
            name: '类别',
            data: innerData,
          }
        ]
      });
    }
    onMounted(() => {
      const parentWidth = fatherNode.value.offsetWidth;
      chart.value = echarts.init(chartDom.value, null, {
        width: parentWidth,
        height: parentWidth,
      });
      chart.value.setOption(option);
      window.addEventListener('resize', handleResize);
    })
    getData()
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
