<template>
  <a-row :gutter="10" class="a">
    <a-col :span="9" :xs="24" :sm="24" :md="9">
      <SaladGenerator class="cardBorderRadius"/>
      <Weather class="cardBorderRadius"/>
    </a-col>
    <a-col :span="9" :xs="24" :sm="24" :md="9">
      <Horoscope class="cardBorderRadius"/>
      <Joke class="cardBorderRadius" />
    </a-col>
    <a-col :span="6" :xs="24" :sm="24" :md="6">
      <MoyuCalendar class="cardBorderRadius"/>
      <WbHot class="cardBorderRadius"/>
    </a-col>
  </a-row>




</template>

<script>
import SaladGenerator from "@cp/fun/SaladGenerator.vue";
import MoyuCalendar from "@cp/fun/MoyuCalendar.vue";
import Horoscope from "@cp/fun/Horoscope.vue";
import WbHot from "@cp/fun/WbHot.vue";
import Weather from "@cp/fun/Weather.vue";
import Joke from "@cp/fun/Joke.vue";

export default {
  name: "Fun",
  components: { Weather, WbHot, Horoscope, MoyuCalendar, SaladGenerator, Joke}
}
</script>

<style scoped lang="scss">
.cardBorderRadius{
  border-radius: 8px;
  margin-bottom: 8px;
}
</style>
