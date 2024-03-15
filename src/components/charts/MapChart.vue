<template>
    <div ref="fatherNode" style="display: flex; justify-content: space-between; width: 100%; position: relative;">
      <div style="position: absolute;left: 0;top: 0; width: auto;height: 40px;z-index: 1">
        <a-breadcrumb v-if="intoContinent" style="margin: 10px; ">
          <a-breadcrumb-item @click="back" style="cursor: pointer">
            全球
          </a-breadcrumb-item>
          <a-breadcrumb-item>{{ continent }}地区</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div ref="worldDataMap"></div>
      <div ref="barData"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import worldMap from '@/assets/map/geo/world-continents.geo.json';

import asiaMap from '@/assets/map/geo/asia.geo.json';
import africaMap from '@/assets/map/geo/africa.geo.json';
import europeMap from '@/assets/map/geo/europe.geo.json';
import oceaniaMap from '@/assets/map/geo/oceania.geo.json';
import northAmericaMap from '@/assets/map/geo/north-america.geo.json';
import southAmericaMap from '@/assets/map/geo/south-america.geo.json';

import { CountryMap, AreaMap } from '@/assets/map/langMap/map-zh.js'
import {onBeforeUnmount, onMounted, ref, shallowRef} from "vue";
export default {
  name: "MapChart",
  setup() {
    const mapChart = shallowRef(null);
    const barChart = shallowRef(null);

    const worldDataMap = shallowRef(null);
    const barData = shallowRef(null);

    const fatherNode = shallowRef(null);

    const intoContinent = ref(false); // 是否进入洲级
    const continent = ref(null); // 当前所在洲
    const currentCountry = ref( null) //当前所在国
    const resizeTimer = ref(null);
    // mock data
    const worldCountriesBidCount = [
      { name: '英国', value: 31111},
      { name: '韩国', value: 15222},
      { name: '巴西', value: 6222},
      { name: '俄罗斯', value: 12122},
      { name: '中国1', value: 22224},
      { name: '英国2', value: 4444},
      { name: '韩国2', value: 5456},
      { name: '巴西2', value: 5111},
      { name: '俄罗斯2', value: 23233},
      { name: '中国2', value: 24222},
    ];
      const worldData = [
      { name: '亚洲', value: 21000 },
      { name: '欧洲', value: 2111 },
      { name: '北美洲', value: 31111 },
      { name: '非洲', value: 11511 },
      { name: '大洋洲', value: 1111 },
      { name: '南美洲', value: 1111 },
    ];
      const asiaData = [
      { name: '俄罗斯', value: 12111 },
      { name: '中国', value: 41111 },
      { name: '蒙古', value: 2111 },
      { name: '伊朗', value: 3111 },
      { name: '印度', value: 32111 },
      { name: '哈萨克斯坦', value: 21111 },
      { name: '印度尼西亚', value: 21111 },
      { name: '日本', value: 31111 },
      { name: '韩国', value: 11511 },
      { name: '泰国', value: 1111 },
      // { name: '马来西亚', value: 1111 },
    ];
      const northAmericaData = [
      { name: '美国', value: 12111 },
      { name: '加拿大', value: 41111 },
      { name: '格陵兰', value: 2111 },
      { name: '墨西哥', value: 3111 },
      { name: '尼加拉瓜', value: 42111 },
      { name: '古巴', value: 21111 },
    ];
    onMounted(() => {
      echarts.registerMap('world', worldMap); // 注册地图数据
      // 获取父元素的宽度
      const parentWidth = fatherNode.value.offsetWidth - 200;
      // 计算 mapChart 和 barChart 的宽度
      const mapChartWidth = parentWidth * 0.6;
      const barChartWidth = parentWidth * 0.4;

      mapChart.value = echarts.init(worldDataMap.value, null, {
        width: mapChartWidth,
        height: parentWidth / 2,
      });
      barChart.value = echarts.init(barData.value, null, {
        width: barChartWidth,
        height: parentWidth / 2,
      });
      barChart.value.setOption(barOption(worldCountriesBidCount))
      mapChart.value.setOption(mapOptions('world', worldData));

      mapChart.value.on('click', handleMapClick); // 监听地图点击事件
      // 监听窗口大小改变事件
      window.addEventListener('resize', handleResize)
    });
    onBeforeUnmount(() => {
      // 在组件销毁之前清除定时器和事件监听
      clearTimeout(resizeTimer.value);
      window.removeEventListener('resize', handleResize);
    });
    function handleResize() {
      clearTimeout(resizeTimer.value); // 清除之前的延迟计时器
      //    在延迟时间后调用 resize() 方法
      resizeTimer.value = setTimeout(() => {
        // 获取新的父元素宽度
        const newParentWidth = fatherNode.value.offsetWidth;
        // 重新计算 mapChart 和 barChart 的宽度
        const newMapChartWidth = newParentWidth * 0.6;
        const newBarChartWidth = newParentWidth * 0.4;

        // 设置新的宽度并调用 resize() 方法
        mapChart.value.resize({ width: newMapChartWidth, height: newParentWidth / 2 });
        barChart.value.resize({ width: newBarChartWidth, height: newParentWidth / 2  });
      }, 200); // 延迟时间可以根据实际情况进行调整
    }
    function back() {
      intoContinent.value = false
      //   回到世界地图
      mapChart.value.clear()
      echarts.registerMap('world', worldMap);
      mapChart.value.setOption(mapOptions('world', worldData))
      // await world bid data
      barChart.value.setOption(barOption(worldCountriesBidCount))
    };
    function handleMapClick(params) {
      intoContinent.value = true
      if (params.name.includes('洲')){
        continent.value = params.name
      }
      if (params.componentType === 'series') {
        if (params.seriesType === 'map') {
          const continentName = params.name; // 获取点击的洲名
          // 根据点击的洲名更新数据排行榜
          updateRankings(continentName);
        }
      }
    }
    function updateRankings(selectedArea) {
      // 根据点击的洲名更新数据排行榜的数据
      // 可以根据需要从后端获取数据，或者使用本地数据进行更新
      // 将更新后的数据赋值给组件的数据属性，然后在模板中渲染排行榜
      if (selectedArea === '亚洲') {
        // await data
        updateMap(selectedArea, asiaMap, asiaData)
      } else if (selectedArea === '北美洲'){
        updateMap(selectedArea, northAmericaMap, northAmericaData)
      } else if (selectedArea === '南美洲'){
        updateMap(selectedArea, southAmericaMap, northAmericaData)
      }else if (selectedArea === '非洲'){
        updateMap(selectedArea, africaMap, northAmericaData)
      }else if (selectedArea === '欧洲'){
        updateMap(selectedArea, europeMap, northAmericaData)
      }else if (selectedArea === '大洋洲'){
        updateMap(selectedArea, oceaniaMap, northAmericaData)
      }
    }
    function updateMap( mapName, mapGeoJson, mapData) {
      // 更新地图和右边柱状图数据
      mapChart.value.clear()
      echarts.registerMap(mapName, mapGeoJson);
      mapChart.value.setOption(mapOptions(mapName, mapData));
      barChart.value.setOption(barOption(mapData))
    }
    function mapOptions(params, data) {
      return {
        dataset: {
          source: data,
        },
        grid: {
          left: '10%',
          right: '10%',
          top: '10%',
          bottom: '10%',
          containLabel: true
        },
        tooltip: {
          trigger: 'item', //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
          axisPointer: {// 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: "transparent",
          formatter: function (params) {
            let str='';
            str ='<div style="width:100%;padding:8px 12px;font-size:13px;box-sizing:border-box;border-radius:4px;position:relative;background:rgba(255,255,255,0.8)">' +
                "<div style='display:flex;align-items:center;'>" +
                params.marker +
                params.name +
                "：" +
                "采购数量 " +
                params.value +
                "</div>" +
                "</div>";
            return str
          }
        },
        visualMap: {
          // left: 'left',
          min: 1000,
          max: 48000,
          inRange: {
            color: [
              // '#dd6b66',
              // '#ea7e53',
              // '#e69d87',
              // '#f49f42',
              // '#eedd78',
              '#91ca8c',
              '#73a373',
              '#8dc1a9',
              '#73b9bc',
              '#759aa0',
              '#7289ab',
            ]
          },
          textStyle:{color: '#73b9bc'},
          text: ['最多', '最少'],
          calculable: false
        },
        series: {
          type: 'map',
          map: params,
          coordinateSystem: 'customProjection',
          nameMap: params === 'world' ? AreaMap : CountryMap,
          // 其他
          silent: false,
          itemStyle: {
            borderColor: "transparent",
          },
          emphasis: {
            itemStyle: {
              // 高亮时点的颜色。
              areaColor: "#82d3d5",
              borderColor: '#fff',
              borderWidth: 1,
            },
            label: {
              show: true,
              // 高亮时标签的文字。
              // color: 'white'
            }
          },
        }
      }
    }
    function barOption(data) {
      const sortedData = data.sort((a, b) => b.value - a.value ).slice(0, 10)
      // console.log(sortedData)
      return {
        tooltip: {
          axisPointer: {
            type: 'shadow',
          }
        },
        dataset: {
          source: sortedData
        },
        grid: {
          left: '10%',
          right: '10%',
          top: '10%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: 'transparent', // 轴线颜色
              // width: 2, // 轴线宽度
              // type: 'dashed', // 轴线类型
            },
          },
          splitLine: {
            show: false, // 设置为 false 隐藏背景网格线
          },
          axisLabel:{
            show: false,
          }
        },
        yAxis: {
          type: 'category',
          inverse: true,
          data: sortedData.map(item => item.name), // 直接提供数据数组
          max: 10,
          axisLine: {
            lineStyle: {
              color: 'transparent', // 轴线颜色
            },
          },
          axisLabel: {
            align: 'left',
            margin: 90,
            formatter: function (value, index) {
              if (index <= 2) {
                // 如果索引小于等于 2，则添加前缀和 logo
                return `{logo|LOGO} {value|${value}}`;
              } else {
                // 否则只添加 logo
                return `{logo2|LOGO} {value|${value}}`;
              }
            },
            rich: {
              logo: {
                height: 10, // logo 高度
                width: 10, // logo 宽度
                backgroundColor: '#ffcc00', // logo 背景颜色
                borderRadius: 10, // logo 圆角
                // align: 'center', // logo 对齐方式
                // padding: [0, 5, 0, 5], // logo 内边距
                // lineHeight: 20, // 行高
                // verticalAlign: 'middle', // 垂直对齐方式
                // fontSize: 14, // 字体大小
                // fontFamily: 'Arial', // 字体
              },
              logo2: {
                height: 10, // logo 高度
                width: 10, // logo 宽度
                // backgroundColor: '#ffcc00', // logo 背景颜色
                // borderRadius: 10, // logo 圆角
                // align: 'center', // logo 对齐方式
                // padding: [0, 5, 0, 5], // logo 内边距
                // lineHeight: 20, // 行高
                // verticalAlign: 'middle', // 垂直对齐方式
                // fontSize: 14, // 字体大小
                // fontFamily: 'Arial', // 字体
              },
              value: {
                width: 'auto',
                align: 'left',
                color: '#60756d',
                padding: [0,30,0,0]
                // fontWeight: 'bold'
              },
            },
          }
        },
        series: [{
          name: 'xx数量',
          type: 'bar',
          data: sortedData,
          // barWidth: '30%',
          barCategoryGap: '80%',
          label: {
            show: true,
            position: 'right',
            valueAnimation: true,
            distance: 10,
            formatter: function (label) {
              return `{style|${label.value.toLocaleString()}}`
            },
            rich: {
              style: {
                fontsize: '10px',
                color: '#8fb0a3',
                padding: [0, 10, 0, 0] // 调整文本的内边距，避免与柱体重叠
              }
            }
          },
          itemStyle: {
            borderRadius: [0, 20, 20, 0],
            color: function(params) {
              // 返回对应数据项的颜色
              const colorList = [
                '#546570',
                // '#2f4554',
                '#7289ab',
                '#759aa0',
                '#61a0a8',
                '#73b9bc',
                '#8dc1a9',
                '#91c7ae',
                '#91ca8c',
                '#73a373',
                '#749f83',
              ];
              return colorList[params.dataIndex];
            }
            // color: '#b0e1ce',
          },
        }],
        transform: {
          type: 'sort',
          config: {
            dimension: 'value',
            order: 'desc'
          }
        }
      }
    }
    return {
      mapChart,
      barChart,
      worldDataMap,
      barData,
      fatherNode,
      intoContinent,
      continent,
      currentCountry,
      back
    }
  },
}
</script>

<style scoped>
.rankings{
  color: black;
}
</style>
