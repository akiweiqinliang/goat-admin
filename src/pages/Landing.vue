<template>
  <a-row justify="space-between" align="center" class="topHeader">
    <a-space>
      <a-avatar class="logo" :size="42">
        <img src="../assets/goat.png" alt="goat"/>
      </a-avatar>
      <h3>goat admin</h3>
    </a-space>
    <a-space>
      <router-link :to="{name: 'vanGogh'}">
        <p class="headerText">version1</p>
      </router-link>
      <a-button class="loginBtn" @click="redirectLogin" v-show="!loginFlag">Sign in</a-button>
      <a-button class="loginBtn" @click="redirectHome" v-show="loginFlag">Dashboard</a-button>
    </a-space>
  </a-row>
  <Simulation />
  <a-row class="endBox" justify="space-between" align="center">
        <span>
        Copyright ©️2024 梁炜勤 粤ICP备2024233910号
      </span>
    <a-link href="https://github.com/akiweiqinliang" :hoverable="false">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M6.51734 17.1132C6.91177 17.6905 8.10883 18.9228 9.74168 19.2333M9.86428 22C8.83582 21.8306 2 19.6057 2 12.0926C2 5.06329 8.0019 2 12.0008 2C15.9996 2 22 5.06329 22 12.0926C22 19.6057 15.1642 21.8306 14.1357 22C14.1357 22 13.9267 18.5826 14.0487 17.9969C14.1706 17.4113 13.7552 16.4688 13.7552 16.4688C14.7262 16.1055 16.2043 15.5847 16.7001 14.1874C17.0848 13.1032 17.3268 11.5288 16.2508 10.0489C16.2508 10.0489 16.5318 7.65809 15.9996 7.56548C15.4675 7.47287 13.8998 8.51192 13.8998 8.51192C13.4432 8.38248 12.4243 8.13476 12.0018 8.17939C11.5792 8.13476 10.5568 8.38248 10.1002 8.51192C10.1002 8.51192 8.53249 7.47287 8.00036 7.56548C7.46823 7.65809 7.74917 10.0489 7.74917 10.0489C6.67316 11.5288 6.91516 13.1032 7.2999 14.1874C7.79575 15.5847 9.27384 16.1055 10.2448 16.4688C10.2448 16.4688 9.82944 17.4113 9.95135 17.9969C10.0733 18.5826 9.86428 22 9.86428 22Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </a-link>
  </a-row>
</template>

<script>
import {useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import Simulation from "@cp/Simulation.vue";

export default {
  name: "Landing2",
  components: {Simulation},
  setup() {
    const router = useRouter()
    const loginFlag = computed(() => {
      const token = localStorage.getItem('token')
      const tokenExpirationDate = localStorage.getItem('tokenExpirationDate');
      // 如果存在token和tokenExpirationDate
      if (token && tokenExpirationDate) {
        // 获取当前时间
        const currentTime = new Date().getTime();
        if (currentTime <= Date.parse(tokenExpirationDate)) {
          // 如果token未过期
          return true
        } else {
          // 如果token已过期
          return false
        }
      }
      return false
    })
    const redirectLogin = () => {
      router.push({name: 'login'})
    }
    const redirectHome = () => {
      router.push({name: 'home'})
    }

    return{
      redirectLogin,
      redirectHome,
      loginFlag,
    }
  }
}
</script>

<style scoped lang="scss">
.topHeader{
  a{
    text-decoration: none;
    color: white;
  }
  z-index: 99;
  backdrop-filter: blur(4px);
  height: 64px;
  padding: 0 20px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.08);
  position: fixed;
  width: 100vw;
  top: 0;
  color: white;
.logo{
  background: transparent;
  padding: 4px;
}
.loginBtn{
  width: 100px;
  height: 38px;
  //border: 2px solid black;
  border-radius: 8px;
  background: #19141e;
  color: white;
  font-weight: bold;
  &:hover{
    background: #1b1d2a;
  }
}
}
.endBox{
  color: white;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  position: absolute;
  //position: sticky;
  z-index: 99;
  bottom: 0;
  margin-bottom: 10px;
  svg{
    fill: rgba(255, 255, 255, 1);
  }
}
.headerText{
  font-weight: bold;
  margin-right: 8px;
}
</style>
