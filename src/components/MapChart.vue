<template>
  <div>
    <a-row justify="space-between">
      <div style="position: relative">
        <div style="position: absolute;left: 0;top: 0; width: auto;height: 40px;z-index: 1">
          <a-breadcrumb v-if="intoContinent" style="margin: 10px; ">
            <a-breadcrumb-item @click="back" style="cursor: pointer">
              全球
            </a-breadcrumb-item>
            <a-breadcrumb-item>{{ continent }}地区</a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <div ref="worldDataMap" style="padding: 20px;"></div>
      </div>
      <div ref="barData" style="background: rgba(161,166,255,0.1);padding: 20px;"></div>
    </a-row>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import worldMap from '@/assets/map/world-continents.geo.json';

import asiaMap from '@/assets/map/asia.geo.json';
import africaMap from '@/assets/map/africa.geo.json';
import europeMap from '@/assets/map/europe.geo.json';
import oceaniaMap from '@/assets/map/oceania.geo.json';
import northAmericaMap from '@/assets/map/north-america.geo.json';
import southAmericaMap from '@/assets/map/south-america.geo.json';

import { CountryMap, AreaMap } from '@/assets/map/langMap/map-zh'
export default {
  name: "MapChart",
  data() {
    return {
      mapChart: null,
      barChart: null,
      // mock
      worldCountriesBidCount: [
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
      ],
      worldData: [
        { name: '亚洲', value: 21000 },
        { name: '欧洲', value: 2111 },
        { name: '北美洲', value: 31111 },
        { name: '非洲', value: 11511 },
        { name: '大洋洲', value: 1111 },
        { name: '南美洲', value: 1111 },
      ],

      asiaData: [
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
        { name: '马来西亚', value: 1111 },
      ],
      northAmericaData: [
        { name: '美国', value: 12111 },
        { name: '加拿大', value: 41111 },
        { name: '格陵兰', value: 2111 },
        { name: '墨西哥', value: 3111 },
        { name: '尼加拉瓜', value: 42111 },
        { name: '古巴', value: 21111 },
      ],
      intoContinent: false, // 是否进入洲级
      continent: null, // 当前所在洲
      currentCountry: null, //当前所在国
    }
  },
  mounted() {
    echarts.registerMap('world', worldMap); // 注册地图数据
    this.mapChart = echarts.init(this.$refs.worldDataMap, null , {
      width: 680,
      height: 450,
    });
    this.mapChart.setOption(this.mapOptions('world', this.worldData));
    this.mapChart.on('click', this.handleMapClick); // 监听地图点击事件

    this.barChart = echarts.init(this.$refs.barData, null, {
      width: 400,
      height: 450,
    });
    this.barChart.setOption(this.barOption(this.worldCountriesBidCount))
  },
  methods: {
    back() {
      this.intoContinent = false
    //   回到世界地图
      this.mapChart.clear()
      echarts.registerMap('world', worldMap);
      this.mapChart.setOption(this.mapOptions('world', this.worldData))
      // await world bid data
      this.barChart.setOption(this.barOption(this.worldCountriesBidCount))
    },
    handleMapClick(params) {
      this.intoContinent = true
      if (params.name.includes('洲')){
        this.continent = params.name
      }
      if (params.componentType === 'series') {
        if (params.seriesType === 'map') {
          const continentName = params.name; // 获取点击的洲名
          // 根据点击的洲名更新数据排行榜
          this.updateRankings(continentName);
        }
      }
    },
    updateRankings(selectedArea) {
      // 根据点击的洲名更新数据排行榜的数据
      // 可以根据需要从后端获取数据，或者使用本地数据进行更新
      // 将更新后的数据赋值给组件的数据属性，然后在模板中渲染排行榜
      if (selectedArea === '亚洲') {
        // await data
        this.updateMap(selectedArea, asiaMap, this.asiaData)
      } else if (selectedArea === '北美洲'){
        this.updateMap(selectedArea, northAmericaMap, this.northAmericaData)
      } else if (selectedArea === '南美洲'){
        this.updateMap(selectedArea, southAmericaMap, this.northAmericaData)
      }else if (selectedArea === '非洲'){
        this.updateMap(selectedArea, africaMap, this.northAmericaData)
      }else if (selectedArea === '欧洲'){
        this.updateMap(selectedArea, europeMap, this.northAmericaData)
      }else if (selectedArea === '大洋洲'){
        this.updateMap(selectedArea, oceaniaMap, this.northAmericaData)
      }
    },
    updateMap( mapName, mapGeoJson, mapData) {
      // 更新地图和右边柱状图数据
      this.mapChart.clear()
      echarts.registerMap(mapName, mapGeoJson);
      this.mapChart.setOption(this.mapOptions(mapName, mapData));
      this.barChart.setOption(this.barOption(mapData))
    },
    mapOptions(params, data) {
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
                '#f6f3ff',
                '#ababe1',
                '#988cc7',
                '#8072bd',
                '#6c5d7e',
                '#5d425f',
                '#3b2e36'
              ]
            },
            textStyle:{color: '#8072bd'},
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
                areaColor: "#695193",
              },
              label: {
                show: true,
                // 高亮时标签的文字。
                // color: 'white'
              }
            },
          }
        }
    },
    barOption(data) {
      return {
        dataset: {
          source: data.sort((a, b) => b.value - a.value )
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
          data: data.map(item => item.name),
          max: 10,
          axisLine: {
            lineStyle: {
              color: 'transparent', // 轴线颜色
            },
          },
          axisLabel: {
            formatter: (value) => {
              return `{style|${value}}`;
            },
            rich: {
              style: {
                color: '#8072bd',
                // fontWeight: 'bold'
              },
            },
          }
        },
        series: [{
          name: 'X',
          type: 'bar',
          data: data,
          // barWidth: '30%',
          barCategoryGap: '70%',
          label: {
            show: true,
            position: 'right',
            valueAnimation: true,
            distance: 10,
            formatter: function (label) {
              return label.value.toLocaleString()
            }
          },
          itemStyle: {
            borderRadius: [20, 20, 20, 20],
            color: '#8072bd'
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
  },

}
</script>

<style scoped>
.rankings{
  color: black;
}
</style>
