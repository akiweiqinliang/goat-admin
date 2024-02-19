<script setup>
import {useRoute} from "vue-router";
import {ref} from "vue";
import Login from "@pages/Login.vue";
import Register from "@pages/Register.vue";
const route = useRoute()
const isLoginRoute = ref(route.name === "login");
const isRegisterRoute = ref(route.name === "register");
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
</style>
