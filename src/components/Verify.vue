<template>

  <vueRecaptcha
      :sitekey="v2Sitekey"
      size="normal"
      theme="light"
      hl="zh-cn"
      @verify="recaptchaVerified"
      @expire="recaptchaExpired"
      @fail="recaptchaFailed"
      ref="vueRecaptcha">
  </vueRecaptcha>

</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<script>
import vueRecaptcha from 'vue3-recaptcha2';
export default {
  components: {
    vueRecaptcha
  },
  setup() {
    // 帶入你的 siteKey
    const v2Sitekey = '6Lep_3gpAAAAAJUI-3xwPyGbBOa--XkESGKdavn0';

    // 回傳一組 token，並把 token 傳給後端驗證
    const recaptchaVerified = (res) => {
      console.log(res)
    }

    const recaptchaExpired = () => {
      // 過期後執行動作
    }

    const recaptchaFailed = () => {
      // 失敗執行動作
    }

    return {
      v2Sitekey, recaptchaVerified, recaptchaExpired, recaptchaFailed
    }
  }
}
</script>
