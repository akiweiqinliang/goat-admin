<template>
  <section>
    <div id="smoke">
      <canvas ref="canvas"></canvas>
    </div>
    <div class="textBox">
      <h1>God makes people lonely in a variety of ways so that we can go to
        <span>ourselves</span>
        .</h1>
      <div class="centerText" @click="toHome">
        <p>Take A Tour of Goat Admin</p>
      </div>
    </div>
  </section>
</template>

<script>
import {onMounted, ref} from "vue";
import WebGlFluid from 'webgl-fluid'
import {useRouter} from "vue-router";
export default {
  name: "Simulation",
  setup() {
    const canvas = ref();
    onMounted( () => {
      WebGlFluid(canvas.value, {
        AUTO: false,
        SIM_RESOLUTION: 128,
        DYE_RESOLUTION: 512, // 品质 1024 high 512 mid 256 low 128 very low
        CAPTURE_RESOLUTION: 512,
        DENSITY_DISSIPATION: 4,
        VELOCITY_DISSIPATION: 3,
        PRESSURE: 0.3,
        PRESSURE_ITERATIONS: 20,
        CURL: 0, // velocity
        SPLAT_RADIUS: 0.25,
        SPLAT_FORCE: 6000,
        SHADING: false,
        COLORFUL: true,
        COLOR_UPDATE_SPEED: 10,
        PAUSED: false,
        BACK_COLOR: { r: 15, g: 6, b: 22,},
        // BACK_COLOR: { r: 15, g: 6, b: 22,},
        // BACK_COLOR: { r: 255, g: 255, b: 255,},
        TRANSPARENT: false,
        BLOOM: true,
        BLOOM_ITERATIONS: 8,
        BLOOM_RESOLUTION: 256,
        BLOOM_INTENSITY: 0.4,
        BLOOM_THRESHOLD: 1,
        BLOOM_SOFT_KNEE: 0.7,
        SUNRAYS: true,
        SUNRAYS_RESOLUTION: 196,
        SUNRAYS_WEIGHT: 1.0,
        // SPLAT_COUNT: false
      })
    })
    const router = useRouter()
    const toHome = () => {
      router.push({name: 'home'})
    }
    return {
      canvas,
      toHome
    }
  }
}
</script>

<style scoped lang="scss">
* {
  user-select: none;
}

section{
  height: 100vh;
}

canvas {
  width: 100vw;
  height: 100vh;
}


#smoke{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  /* background-color: #023C40; */
}
.textBox{
  position: relative;
  z-index: 2;
  color: white;
  padding-top: 15%;
  padding-left: 20%;
  padding-right: 20%;
  display: flex;
  flex-direction: column;
  /* position: absolute; */
  pointer-events: none;
  h1{
    font-size: 58px;
    font-weight: 700;
    span{
      background-clip: text;
      color: transparent;
      background-image: linear-gradient(to right, #fdc392, white);
    }
  }
}
.centerText{
  margin: 0 auto;
  //border: 1px solid white;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.3);
  display: inline-block;
  padding: 0 16px 0 16px;
  pointer-events: painted;
  cursor: pointer;
  transition: all .3s;
}
.centerText:hover{
  background: rgba(255, 255, 255, 0.5);
  padding: 0 24px 0 24px;
  transition: all .3s;
}
@media screen and (max-width: 576px) {
  .textBox {
    padding-top: 30%;
    padding-right: 10%;
    padding-left: 10%;
    h1{
    font-size: 36px;
  }
  }
}
</style>
