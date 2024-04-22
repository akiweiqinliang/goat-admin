<template>
<a-card>
  <h4>摸鱼日历 🐟</h4>
  <a-image src="https://api.vvhan.com/api/moyu" width="100%" :show-loader="true"/>
<!--  <img src="https://api.vvhan.com/api/moyu" alt="摸鱼人日历" />-->
</a-card>
</template>

<script>
export default {
  name: "MoyuCalendar",
}
</script>

<style scoped>
h4{
  margin-top: 4px;
}
img{
  width: 100%;
}
</style>
