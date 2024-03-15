<template>
  <a-card class="detailPage" :bordered="false">
        <div class="mainContent">
          <div class="left">
            <CookbookPreviewPage :cookbook="cookbook" />
          </div>
          <div class="right">
            <div class="relative">
              <a-row justify="space-between" class="topText">
                <div>
                  {{ $t('relatedCookbook') }}
                </div>
                <div class="changeRecipesBtn" @click="changeRecipes">
                  <icon-sync :style="{fontSize:'18px', marginRight: '8px'}" :spin="changeRecipesSpin"/>{{ $t('changeIt') }}
                </div>
                </a-row>
              <a-list>
                <a-list-item v-for="item in relatedRecipes" :key="`related-recipes-${item.id}`" @click="toDetail(item.id)" class="recipeItem">
                  <a-list-item-meta
                      :title="item.title"
                      :description="item.description"
                  >
                    <template #avatar>
                      <a-avatar shape="square">
                        <img
                            alt="avatar"
                            :src="item.imgUrl"
                        />
                      </a-avatar>
                    </template>
                  </a-list-item-meta>
                </a-list-item>
              </a-list>
            </div>
          </div>
        </div>
  </a-card>
</template>

<script>
import CookbookPreviewPage from "@cp/CookbookPreviewPage.vue";
import {useRouter, useRoute} from "vue-router";
import {inject, onMounted, reactive, ref, toRefs, watch} from "vue";
import { IconSync } from "@arco-design/web-vue/es/icon/index";
import { cookbookStore } from "@/stores/cookbook.js";
import dayjs from "dayjs";
export default {
  name: "Detail",
  components: {CookbookPreviewPage, IconSync},
  setup() {
    const api = inject("api")
    const router = useRouter()
    const route = useRoute()
    let id = useRoute().params.id;
    let state = reactive({
      cookbook: {},
      changeRecipesSpin: false,
      tagCookbooks: [],
      relatedRecipes: [],
    })
    const getDetail = async (id) => {
      const result = await api.cookbookService.getCookBookById(id);
      state.cookbook = result.data;
      await getCookbooksByTagId(state.cookbook.tagId, id);
    }
    const getCookbooksByTagId = async (tagId, routeId) => {
      const result = await api.cookbookService.getCookbookByParams({
        tagId,
      })
      let list = result.data.records;
      // 获取当前展示的同类并滤掉当前展示的内容
      list = list.filter(item => item.tagId === tagId && item.id !== routeId);
      list.forEach(item => item.updateTime = dayjs(item.updateTime).format('YYYY-MM-DD'));
      state.tagCookbooks = list;
      // 打乱
      let array = list;
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      state.relatedRecipes = array.slice(0, 4);
    }
    function changeRecipes() {
      let array = state.tagCookbooks;
      // 打乱
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      state.changeRecipesSpin = true;
      setTimeout(() => {
        state.changeRecipesSpin = false;
        state.relatedRecipes = array.slice(0, 4);
      }, 2000)
    }
    const toDetail = (id) => {
      router.push({ name: 'cookbookDetail', params: { id : id }, replace: true})
    }
    onMounted(() => {
      watch(route, (to, from) => {
        getDetail(to.params.id)
      });
      getDetail(id)
    })
    return{
      router,
      route,
      toDetail,
      changeRecipes,
      ...toRefs(state)
    }
  },
}
</script>

<style scoped lang="scss">
.detailPage{
  padding: 24px;
  .mainContent{
    display: flex;
    .left{
      margin-right: 10px;
      width: calc(70% - 10px);
    }
    .right{
      margin-left: 30px;
      width: calc(30% - 30px);
      .recipeItem{
        cursor: pointer;
        :hover{
          text-decoration: underline;
        }
      }
      .relative{
        .topText{
          margin-bottom: 20px;
          .changeRecipesBtn{
            display: flex;
            align-items: center;
            cursor: pointer;
          }
        }
      }
      .mainImage{
        margin: 0 20px;
        width: calc(80% - 20px);
        overflow: hidden;
        aspect-ratio: 1 / 1;
        img{
          width: 100%;
        }
      }
    }
  }

}
</style>
