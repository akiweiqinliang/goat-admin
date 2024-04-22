<template>
<a-card class="saladCard">
  <a-row justify="space-between" align="center">
    <h4>饭团配菜生成器 🥗</h4>
    <a-space>
      <a-button @click="generate" type="primary">生成</a-button>
      <a-button @click="clean">清空</a-button>
    </a-space>
  </a-row>
  <a-row>
    <a-checkbox v-model="noVegetable">不要蔬菜</a-checkbox>
  </a-row>
    <a-row class="contentBox">
      <div class="showTxt" v-show="cleanFlag">(๑ơ ₃ ơ)♥ 🍙</div>
      <a-space>
        <span v-show="!noVegetable">{{ generatedStuff.vegetable }}</span>
        <span>{{ generatedStuff.meat }}</span>
        <span>{{ generatedStuff.sideDish }}</span>
        <span>{{ generatedStuff.stapleFood }}</span>
      </a-space>
    </a-row>
</a-card>
</template>

<script>
import {reactive, ref} from "vue";

export default {
  name: "SaladGenerator",
  setup() {
    const generatedStuff = ref({
      vegetable: '',
      sideDish: '',
      meat: '',
      stapleFood: ''
    })
    const noVegetable = ref(false)
    const cleanFlag = ref(true)

    const vegetableList = ref(['黄瓜片', '黄瓜条', '番茄片', '胡萝卜丝', '球生菜', '酸萝卜条', '青椒片'])
    const sideDishList = ref(['芝士片', '肉松', '煎蛋', '蛋饼丝', '辣条'])
    const meatList = ref(['带皮藤椒鸡腿肉', '去皮奥尔良鸡胸肉排', '厚蛋烧', '烤肠', '火腿片', '牛柳', '蟹柳', '蒸鸡蛋'])
    const stapleFoodList = ref(['米饭', '土豆片'])
    function getRandomObjectFromList(list) {
      const randomIndex = Math.floor(Math.random() * list.length)
      return list[randomIndex]
    }
    function generate() {
      const result = {
        vegetable: noVegetable.value ? '' : getRandomObjectFromList(vegetableList.value),
        sideDish: getRandomObjectFromList(sideDishList.value),
        meat: getRandomObjectFromList(meatList.value),
        stapleFood: getRandomObjectFromList(stapleFoodList.value)
      }
      generatedStuff.value = { ...result }
      cleanFlag.value = false
    }
    function clean() {
      generatedStuff.value = {
        vegetable: '',
        sideDish: '',
        meat: '',
        stapleFood: ''
      }
      cleanFlag.value = true
    }
    return {
      generatedStuff,
      noVegetable,
      generate,
      clean,
      cleanFlag
    }
  }
}
</script>

<style scoped lang="scss">
h4{
  margin-top: 4px;
}
.saladCard{
  .contentBox{
    width: 100%;
    height: 60px;
    border: 1px dashed rgb(var(--primary-6));
    border-radius: 8px;
    margin-top: 20px;
    padding: 10px 8px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    span{
      font-weight: bold;
    }
    .showTxt{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: var(--color-fill-2);
      color: var(--color-text-3);
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      font-size: 12px;
    }
  }
}
</style>
