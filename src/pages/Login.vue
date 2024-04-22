<template>
    <a-row class="loginPage" align="center" justify="center">
<!--      <Verify />-->
      <a-col class="infoBox" :xs="20" :sm="18" :md="16" :lg="13" :xl="10">
        <span>
          <img src=".././assets/imgs/auth/text-login.png" alt=" Login Your Account " style="width: 100%;">
        </span>
        <a-input class="inputStyle" v-model="username" size="large" placeholder="Please enter user name" allow-clear />
        <a-input-password
            class="inputStyle"
            v-model="password"
            v-model:visibility="visibility"
            placeholder="Please enter password"
            :defaultVisibility="false"
            allow-clear
            size="large"
        />
        <a-button @click="login" shape="round" type="primary" long class="inputStyle" size="large">Sign in</a-button>
      </a-col>
    </a-row>
</template>

<script>
import { useRouter } from 'vue-router';
import { adminStore } from "@/stores/admin.js";
import Verify from "@cp/Verify.vue";
import {onMounted} from "vue";

export default {
  name: "Login",
  components: {Verify},
  data() {
    return {
      username: '',
      password: '',
      visibility: true,
    }
  },
  setup() {
    onMounted(() => {
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpirationDate')
      localStorage.removeItem('admin')
    })
    const router = useRouter()
    const goHome = () => {
      router.push({
        name: 'home'
      })
    }
    return{
      goHome
    }
  },
  methods: {
    async login() {
      if (!this.username || !this.password) {
        return
      }
      let result = await this.$api.loginService.login(this.username, this.password);
      if (result.code === 0) {
        localStorage.setItem('tokenExpirationDate', result.data.tokenExpirationDate)
        localStorage.setItem('token', result.data.token)
        localStorage.setItem('admin', this.username)
        this.goHome()
      }
    },
  }
}
</script>

<style scoped lang="scss">
.loginPage{
  background-image: url("https://cdn.qiniuyun.akiweiqinliang.fun/login/bg.jpg");
  height: 100vh;
  background-size: cover;
  .infoBox{
    height: 400px;
    background: rgba(var(--primary-6), 0.14);
    border-radius: 30px;
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 40px;
    span{
      color: var(--color-text-1);
      font-size: 16px;
      font-weight: 500;
      display: flex;
      justify-content: center;
      img{
        width: 100%;
        max-width: 300px;
      }
    }
  }
}
.inputStyle{
  width: 100%;
  margin: 20px 0 0;
  border-radius: 30px;
}
</style>
