<template>
    <div style="width: 100%; position: relative;">
      <a-row style="position: relative;left: 0;top: 0; width: auto;height: 40px;z-index: 1">
        <a-breadcrumb v-if="intoContinent" style="margin: 10px; ">
          <a-breadcrumb-item @click="back" style="cursor: pointer">
            全球
          </a-breadcrumb-item>
          <a-breadcrumb-item>{{ continent }}地区</a-breadcrumb-item>
        </a-breadcrumb>
      </a-row>
      <a-row>
        <div ref="fatherNode" style="width: 60%;">
          <div ref="worldDataMap"></div>
        </div>
        <div class="dataBox">
          <ul>
            <li v-for="(place, index) in currentData">
              <div class="rankBox">
                <div class="rank">
                  <IconRank v-if="index <= 2" :rank="index+1"/>
                  <div v-else class="otherRank">{{ index+1 }}</div>
                </div>
              </div>
              <p>{{ place.name }}</p>
              <div class="box">
                <div class="bar" :style="`width: ${place.value / currentMost * 90}%;`">
                </div>
                <span>{{ place.value }}</span>
              </div>
            </li>
          </ul>
        </div>
      </a-row>
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

import {AreaMap, CountryMap} from '@/assets/map/langMap/map-zh.js'
import {onBeforeUnmount, onMounted, ref, shallowRef} from "vue";
import SvgIcon from "@cp/SvgIcon.vue";
import IconRank from "@/assets/svg/IconRank.vue";

export default {
  name: "MapChartCopy",
  components: {IconRank, SvgIcon},
  setup() {
    const currentData = ref([]);
    const currentMost = ref(0);
    const mapChart = shallowRef(null);
    const worldDataMap = shallowRef(null);

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
      currentData.value = [...worldData].sort((a, b) => b.value - a.value);
      currentMost.value = currentData.value[0].value;
      echarts.registerMap('world', worldMap); // 注册地图数据
      const parentWidth = fatherNode.value.offsetWidth - 200;
      mapChart.value = echarts.init(worldDataMap.value, null, {
        width: parentWidth,
        height: parentWidth * 2 / 3,
      });
      mapChart.value.setOption(mapOptions('world', worldData));
      mapChart.value.on('click', handleMapClick); // 监听地图点击事件
      window.addEventListener('resize', handleResize)
    });
    onBeforeUnmount(() => {
      clearTimeout(resizeTimer.value);
      window.removeEventListener('resize', handleResize);
    });
    function handleResize() {
      clearTimeout(resizeTimer.value); // 清除之前的延迟计时器
      resizeTimer.value = setTimeout(() => {
        const newParentWidth = fatherNode.value.offsetWidth;
        mapChart.value.resize({ width: newParentWidth, height: newParentWidth * 2 / 3 });
      }, 200); // 延迟时间可以根据实际情况进行调整
    }
    function back() {
      intoContinent.value = false
      //   回到世界地图
      mapChart.value.clear()
      echarts.registerMap('world', worldMap);
      mapChart.value.setOption(mapOptions('world', worldData))
      currentData.value = [...worldData].sort((a, b) => b.value - a.value)
      currentMost.value = currentData.value[0].value;
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
      currentData.value = [...mapData].sort((a, b) => b.value - a.value)
      currentMost.value = currentData.value[0].value;
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
                "小猫数量 " +
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

    return {
      mapChart,
      currentMost,
      currentData,
      worldDataMap,
      fatherNode,
      intoContinent,
      continent,
      currentCountry,
      back
    }
  },
}
</script>

<style scoped lang="scss">
.rankings{
  color: black;
}
.dataBox{
  width: 40%;
  ul{
    margin: 0;
    padding: 0;
    li{
      list-style: none;
      display: flex;
      align-items: center;
      .rankBox{
        align-items: center;
        display: flex;
        flex-shrink: 0;
        margin-right: 4px;
        .rank{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          .otherRank{
            width: 18px;
            height: 18px;
            font-size: 12px;
            line-height: 20px;
            background-color: var(--color-fill-3);
            color: var(--color-text-3);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 2px;
          }
        }
      }
      p{
        display: inline-block;
        width: 80px;
        margin-right: 10px;
      }
      .box{
        flex-wrap: nowrap;
        flex-grow: 1;
        display: flex;
        align-items: center;
        .bar{
          height: 8px;
          background-color: #5bb6a1;
          border-radius: 5px;
          transition: width .5s ease;
          width: 0;
          position: relative;
          margin-right: 10px;
        }
      }
    }
  }

}





</style>
