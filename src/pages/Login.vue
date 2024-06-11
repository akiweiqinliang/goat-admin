<template>
    <a-row class="loginPage" align="center" justify="center">
              <a-col class="infoBox" :xs="24" :sm="24" :md="20" :lg="20" :xl="14">
                <div class="goatAdmin">
                    <router-link to="/">
                  <a-space>
                    <a-avatar :style="{backgroundColor: 'white'}">
                        <img src="../assets/goat.png" alt="goat"/>
                    </a-avatar>
                  </a-space>
                    </router-link>
                </div>
                <div class="leftBox">
                  <span class="welcomeText">Welcome Back</span>
                  <p>Log in your account bellow. 💐</p>
                  <a-input class="inputStyle" v-model="username" size="large" placeholder="User" allow-clear />
                  <a-input-password
                      class="inputStyle"
                      v-model="password"
                      v-model:visibility="visibility"
                      placeholder="Password"
                      :defaultVisibility="false"
                      allow-clear
                      size="large"
                  />
                  <a-button @click="login" id="btnStyle" long class="inputStyle" size="large">Sign In</a-button>
                </div>
                <div class="loginImg"></div>
        </a-col>
    </a-row>
</template>

<script>
import { useRouter } from 'vue-router';
import {onMounted} from "vue";
import {Message} from "@arco-design/web-vue";

export default {
  name: "Login",
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
        Message.info('请输入账号信息')
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
  //background-image: url("https://cdn.qiniuyun.akiweiqinliang.fun/login/bg.jpg");
  height: 100vh;
  background: #e0dddc;
  //background-size: cover;

  .infoBox{
    height: 600px;
    max-width: 1000px;
    //background: rgba(var(--primary-6), 0.14);
    background: var(--color-bg-1);
    border-radius: 0px;
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: -10px 34px 30px 10px rgba(var(--primary-6), 0.44);
    position: relative;
    //flex-direction: column;
    .goatAdmin{
      position: absolute;
      top: 16px;
      left: 16px;
    }
    .leftBox{
      width: 50%;
      padding: 0 40px;
      box-sizing: border-box;
      text-align: center;
      p{
        margin-bottom: 40px;
        color: var(--color-text-2);
      }
    }
    .welcomeText{
      font-size: 32px;
    }
    .loginImg{
      background-image: url("https://cdn.qiniuyun.akiweiqinliang.fun/login/bg.jpg");
      background-size: cover;
      background-position: center;
      height: 100%;
      width: 50%;
    }
    //max-width: 00px;
    span{
      color: var(--color-text-1);
      font-size: 16px;
      //font-weight: 500;
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
  border-radius: 8px;
  max-width: 400px;
  margin: auto;
  margin-bottom: 20px;
}
#btnStyle{
  margin-top: 40px;
  background-color: black;
  color: white;
  font-weight: 500;
  height: 40px;
}
@media (hover: hover) {
  #btnStyle:hover{
    color: white;
    background: rgb(var(--primary-8));
  }
}
@media screen and (max-width: 768px){
  .loginPage .infoBox{
    flex-direction: column-reverse;
    height: 100%;
  }
  .loginPage .infoBox .loginImg{
    height: 30%;
    width: 100%;
  }
  .loginPage .infoBox .leftBox{
    flex-grow: 1;
    width: 100%;
    position: relative;
  }
  .loginPage .infoBox .leftBox::before{
    content: '';
    position: absolute;
    background: white;
    width: 32px;
    height: 32px;
    top: -16px;
    right: 32px;
    transform: rotate(45deg);
  }
  .loginPage .infoBox .welcomeText{
    margin-top: 30px;
  }

}
</style>
