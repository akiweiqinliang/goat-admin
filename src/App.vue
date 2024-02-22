<script setup>
import {useRoute} from "vue-router";
import Login from "@pages/Login.vue";
import Register from "@pages/Register.vue";
const route = useRoute()
const isLoginRoute = ref(route.name === "login");
const isRegisterRoute = ref(route.name === "register");
import { ref } from 'vue';

</script>

<template>
    <!-- 登录 -->
    <Login v-if="isLoginRoute" />

    <!-- 注册 -->
    <Register v-else-if="isRegisterRoute" />
    <RouterView />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.example-step-extra-class{
  background: lightblue;
}
/*.layout-demo .arco-layout-footer, .layout-demo .arco-layout-content {*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  justify-content: center;*/
/*  color: red;*/
/*  font-size: 16px;*/
/*  font-stretch: condensed;*/
/*  !* text-align: center; *!*/
/*}*/
</style>
