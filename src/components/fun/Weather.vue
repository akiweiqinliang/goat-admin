<template>
<a-card>
  <a-row justify="space-between" align="start"><h4>天气查询 ☁️ </h4>
    <a-tag>{{ weather.data?.date }} {{ weather.data?.week }}</a-tag>
  </a-row>
  <a-form label-align="left" :auto-label-width="true" :model="weather" class="weatherForm">
    <div class="weatherCover" v-show="weatherCover">
      好像出了一点问题，搜索试一下(｢･ω･)｢
    </div>
    <a-form-item label="城市">
      <a-tag>{{ weather?.city }}</a-tag>
    </a-form-item>
    <a-form-item label="天气">
      <a-tag>{{ weather?.data?.type }} 偏{{ weather?.data?.fengxiang }} {{ weather?.data?.fengli }}</a-tag>
    </a-form-item>
    <a-form-item label="温度">
      <a-tag>{{ weather?.data?.low }} - {{ weather?.data?.high }}</a-tag>
    </a-form-item>
    <a-form-item label="空气质量">
      <a-tag>{{ weather?.air?.aqi_name }}</a-tag>
    </a-form-item>
    <a-form-item label="提示">
      <a-tag>{{ weather?.tip }}</a-tag>
    </a-form-item>
    <a-form-item label="夜间天气">
      <a-tag>{{ weather?.data?.night?.type }} {{ weather?.data?.night?.fengxiang }} {{ weather?.data?.night?.fengli }}</a-tag>
    </a-form-item>
  </a-form>
  <a-row justify="space-between" :wrap="false">
    <a-auto-complete placeholder="输入国内城市" v-model="city" :data="cityAutoCompleteData" @search="handleSearch" :filter-option="false">
    </a-auto-complete>
      <a-space class="btns">
        <a-button @click="getWeather" type="primary">查找</a-button>
        <a-button @click="clean">清空</a-button>
      </a-space>
  </a-row>
</a-card>
</template>

<script>
import axios from "axios";
import {onActivated, onMounted, ref} from "vue";
import {cityStore} from "@/stores/city.js";

export default {
  name: "Weather",
  setup() {
    const city = ref('')
    const weather = ref({})
    const error = ref(null)
    const weatherCover = ref(false)

    let cityAutoCompleteData = ref([])
    const hotCityMap = cityStore().hotCityMap
    const handleSearch = (value) => {
      if (value) {
        value = value.trim().toLowerCase()
        let filteredCities = [];
        for (const cityObj of hotCityMap) {
          if (cityObj.city.includes(value) || cityObj.initial.includes(value) || cityObj.relativeWords.includes(value)) {
            filteredCities.push(cityObj.city)
          }
        }
        cityAutoCompleteData.value = filteredCities
      }else {
        cityAutoCompleteData.value = []
      }
    }
    const clean = () => {
      city.value = ''
      getWeather()
    }
    const getWeather = () => {
      let url = `https://api.vvhan.com/api/weather`;
      if (city.value !== '') {
        url += `?city=${city.value}`;
      }
      axios.get(url)
          .then(res => {
            const {data, city, air, tip} = { ...res }
            weather.value = {
              data,
              city,
              air,
              tip
            }
            weatherCover.value = res.success === false;
            error.value = null;
          })
          .catch(e => {
            error.value = e.response ? e.response.data.message : 'Network error';
          });

    }
    onMounted(() => {
      getWeather()
    })
    return {
      weatherCover,
      weather,
      city,
      error,
      cityAutoCompleteData,
      getWeather,
      clean,
      handleSearch
    }
  }
}
</script>

<style scoped>
h4{
  margin-top: 4px;
}
.btns{
  margin-left: 8px;
}
.weatherForm{
  position: relative;
  margin-bottom: 10px;
}
.weatherCover{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: var(--color-fill-2);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed rgb(var(--primary-6));
}
</style>
