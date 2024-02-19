<template>
  <a-card>
    <div class="g-bg">
      <div class="g-polygon g-polygon-1 moving1"></div>
      <div class="g-polygon g-polygon-2 moving2"></div>
      <div class="g-polygon g-polygon-3 moving3"></div>
<!--    </div>-->
<!--    <div class="g-bg">-->
      <div class="g-polygon g-polygon-2 moving3"></div>
      <div class="g-polygon g-polygon-3 moving1"></div>
      <div class="g-polygon g-polygon-1 moving2"></div>
    </div>
  </a-card>
</template>

<script>
export default {
  name: "BlurBackgroundColor"
}
</script>

<style scoped>
.g-bg{
  display: flex;
  position: relative;
  justify-content: space-between;
  flex-wrap: wrap;
  overflow: hidden;
}
.g-polygon {
  position: relative;
  opacity: .5;
}
.g-polygon-1 {
  height: 300px;
  width: 20%;
  background: #8386b4;
  clip-path: polygon(0 10%, 30% 0, 100% 40%, 70% 100%, 20% 90%);
}

.g-polygon-2 {
  height: 150px;
  width: 10%;
  background: #4b8ef3;
  clip-path: polygon(10% 0, 100% 70%, 100% 100%, 20% 90%);
}

.g-polygon-3 {
  height: 220px;
  width: 40%;
  background: rgb(127, 46, 248);
  clip-path: polygon(80% 0, 100% 70%, 100% 100%, 20% 90%);
}
.g-bg::before {
  content: "";
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  backdrop-filter: blur(150px);
  z-index: 1;

}
.moving1 {
  animation: move1 10s infinite ;
}
.moving2 {
  animation: move1 12s infinite ;
}
.moving3 {
  animation: move1 15s infinite ;
}
@keyframes move1 {
  0% { transform: translate3d(+100px, +20px, 0); }
  20%{ transform: translate3d(+40px, -40px, 0); }
  60% { transform: translate3d(-40px, +40px, 0); }
  80% { transform: translate3d(+20px, -20px, 0); }
  100% { transform: translate3d(+100px, +20px, 0); }
}
</style>
