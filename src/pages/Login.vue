<template>
    <a-row class="loginPage" align="center" justify="center">
<!--      <Verify />-->
      <a-col :span="10" class="infoBox">
        <span>
        login your account
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
        <a-button @click="login" type="primary" long class="inputStyle" size="large">Login</a-button>
      </a-col>
    </a-row>
</template>

<script>
import { useRouter } from 'vue-router';
import { adminStore } from "@/stores/admin.js";
import Verify from "@cp/Verify.vue";

export default {
  name: "Login",
  components: {Verify},
  data() {
    return {
      username: 'aki',
      password: '123',
      visibility: true,
    }
  },
  setup() {
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
      let result = await this.$api.loginService.login(this.username, this.password)
      console.log(result)
      if (result) {
        localStorage.setItem('token', 'token time')
        localStorage.setItem('admin', this.username)
        const info = await this.$api.userService.getAdminInfo(this.username);
        adminStore().setInfo(info.data);
        this.goHome()
      }
    },
  }
}
</script>

<style scoped lang="scss">
.loginPage{
  background-image: url("../assets/imgs/auth/goat.jpg");
  height: 100vh;
  background-size: cover;
  .infoBox{
    height: 400px;
    background: rgba(var(--primary-6), 0.14);
    border-radius: 0px;
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 40px;
  }
}
.inputStyle{
  width: 100%;
  margin: 20px 0 0;
}
</style>
