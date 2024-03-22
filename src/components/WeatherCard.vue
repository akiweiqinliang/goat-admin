<template>
  <a-row style="color: var(--color-text-1);">
    <a-col>
      <a-divider direction="vertical" class="dividerLine"/>
      <icon-location /> {{ weather.city }}
      <a-divider direction="vertical" />
      {{ weather.temperature }}℃
      <a-divider direction="vertical" />
      ☁️：{{ weather.weather }}
      <a-divider direction="vertical" class="dividerLine"/>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import AMapLoader from "@amap/amap-jsapi-loader";
import { IconLocation } from "@arco-design/web-vue/es/icon";
import {onMounted, ref} from "vue";
const weather = ref({})
function initMap() {
  AMapLoader.load({
    key: "e517d9570879f4928aff2de2e0009cbb", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [
      "AMap.Weather",
      "AMap.CitySearch",
    ], // 需要使用的的插件列表
  })
      .then((AMap) => {
        getCitySearch(AMap);
      })
      .catch((e) => {
        console.log(e);
      });
}
// IP定位获取当前城市信息
const getCitySearch = (AMap: any) => {
  const citySearch = new AMap.CitySearch();
  citySearch.getLocalCity(function (
      status: string,
      result: {
        city: string;
        info: string;
      }
  ) {
    if (status === "complete" && result.info === "OK") {
      // 查询成功，result即为当前所在城市信息
      getWeather(AMap, result.city);
    }
  });
};

// 天气
const getWeather = (AMap: any, city: string) => {
  const weatherService = new AMap.Weather();
  weatherService.getLive(city, function (err: any, data: any) {
    // console.log("天气数据：", data);
    weather.value = data;
  });
  // 未来4天天气预报
  // weatherService.getForecast(city, function (err: any, data: { forecasts: string | any[] }) {
  //       console.log(
  //           "🚀 ~ file: map-container.vue:186 ~ 未来4天天气预报 ~ data:",
  //           data
  //       );
  //       if (err) {
  //         return;
  //       }
  //       var strs = [];
  //       for (var i = 0, dayWeather; i < data.forecasts.length; i++) {
  //         dayWeather = data.forecasts[i];
  //         strs.push(
  //             `<p>${dayWeather.date}&nbsp&nbsp${dayWeather.dayWeather}&nbsp&nbsp${dayWeather.nightTemp}~${dayWeather.dayTemp}℃</p><br />`
  //         );
  //       }
  //     }
  // );
};
onMounted(() => {
  initMap();
});
</script>

<style scoped lang="less">
@media screen and (max-width: 1100px){
  .dividerLine{
    display: none;
  }
}
//@media screen and (max-width: 1100px) and (min-width: 992px){
//  .dividerLine{
//    display: none;
//  }
//}
</style>

