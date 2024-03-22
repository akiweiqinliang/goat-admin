<template>
  <div
      class="dashboard"
      :style="{
      boxSizing: 'border-box',
      width: '100%',
    }"
  >
    <a-row justify="space-between" align="center" class="top" :gutter="20">
      <a-col :span="12" :sm="24" :md="10" :lg="12" :xs="24">
        <h1 style="color: var(--color-text-1)">
          Any new inspiration or todo today? <span style="color: var(--color-text-2)">{{ user }}</span>
        </h1>
      </a-col>
      <a-col :span="12" :sm="24" :md="14" :lg="12" :xs="24">
        <a-row align="center" justify="end" class="topRightBox" :wrap="false">
          <WeatherCard class="weatherCard" />
          <a-button type="primary" shape="round" @click="handleClick">new record +</a-button>
        </a-row>
      </a-col>


    </a-row>
    <a-row :gutter="20" class="mbStyle">
      <a-col :span="12" :xs="24" :sm="12">
        <a-row>
          <h3 style="color: var(--color-text-1)">
            notes
          </h3>
        </a-row>
        <a-card :title="$t('notes')" :style="{ width: '100%' }">
          <a-row justify="space-between" align="center" class="numberCardBox">
            <CountNumberBox :number="notesNumber" :rate="(notesNumber - 10) / 10"/>
            <a-button class="detailBtn" shape="round" @click="routerPush('notes')">️💫 查看详情<icon-arrow-right style="margin-left: 8px" /></a-button>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="12" :xs="24" :sm="12">
        <a-row>
          <h3 style="color: var(--color-text-1)">
            recipes
          </h3>
        </a-row>
        <a-card title="菜谱" :style="{ width: '100%' }">
          <a-row justify="space-between" align="center"  class="numberCardBox">
            <CountNumberBox :number="recipesNumber" :rate="(recipesNumber - 10) / 10"/>
            <a-button class="detailBtn" shape="round" @click="routerPush('cookbook')">✨ 查看详情<icon-arrow-right style="margin-left: 8px" /></a-button>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="20">
      <a-col :span="16" :xs="0" :sm="0" :md="16">
        <a-card title="学习进度">
          <a-progress :percent="notesNumber / 100" :animation="true" size="large" :color="{
        '0%': 'rgb(var(--primary-6))',
        '100%': 'rgb(var(--success-6))',
      }">
            <template v-slot:text="scope" >
              进度 {{scope.percent * 100}}%
            </template>
          </a-progress>
        </a-card>
        <a-row style="margin-top: 20px;">
          <a-col :span="24">
            <a-card>
              <TimeLineBox />
            </a-card>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="8" :xs="24" :sm="24" :md="8">
        <a-card :title="$t('todo')" class="todoListCard">
          <template #extra>
            <a-link @click="showDeleteBtn = !showDeleteBtn">{{ !showDeleteBtn ? 'Edit' : 'Done' }}</a-link>
          </template>
          <a-list size="small">
            <a-list-item v-for="(todo, index) in todoList" :key="index">
              <a-list-item-meta
                  :title="todo.title"
              >
                <template #avatar>
                  <a-avatar shape="circle"
                            :style="{ marginRight: '8px', backgroundColor: 'rgb(var(--arcoblue-8))' }"
                            :size="28">
                    {{ todo.title.slice(0,1) }}
                  </a-avatar>
                </template>
              </a-list-item-meta>
              <template #actions>
                <icon-delete v-show="showDeleteBtn" @click="deleteTodo(todo.id)"/>
              </template>
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
      <a-col :span="0" :xs="24" :sm="24" :md="0">
            <a-card title="学习进度" class="progressCard">
              <a-progress :percent="notesNumber / 100" :animation="true" size="large" :color="{
        '0%': 'rgb(var(--primary-6))',
        '100%': 'rgb(var(--success-6))',
      }">
                <template v-slot:text="scope" >
                  进度 {{scope.percent * 100}}%
                </template>
              </a-progress>
            </a-card>

        <a-row style="margin-top: 20px;">
          <a-col :span="24">
            <a-card>
              <TimeLineBox />
            </a-card>
          </a-col>
        </a-row>
      </a-col>
    </a-row>

    <a-drawer
        :width="340"
        height="80%"
        :visible="visible"
        placement="bottom"
        @cancel="handleCancel"
        unmountOnClose
        :footer="false"
    >
      <template #title>
        {{$t('add')}}{{ $t('todo') }}
      </template>
      <a-form layout="vertical">
        <a-form-item label="标题">
          <a-input v-model="newTodo.title" />
        </a-form-item>
        <a-form-item label="内容">
          <a-textarea v-model.trim="newTodo.detail" placeholder="Please enter something" allow-clear/>
        </a-form-item>
      </a-form>
      <a-row justify="end">
        <a-space>
          <a-button @click="handleCancel">{{ $t('cancel') }}</a-button>
          <a-button type="primary" @click="handleOk">{{ $t('add') }}</a-button>
        </a-space>
      </a-row>
    </a-drawer>
  </div>
</template>

<script>
import DragBox from "../components/DragBox.vue";
import {IconArrowRise, IconArrowRight, IconCloseCircleFill, IconDelete} from '@arco-design/web-vue/es/icon';
import draggable from "vuedraggable";
import {scheduleStore} from "@/stores/schedule.js";
import TimeLineBox from "@cp/TimeLineBox.vue";
import CountNumberBox from "@cp/CountNumberBox.vue";
import {inject, onMounted, ref} from "vue";
import WeatherCard from "@cp/WeatherCard.vue";
import {useRouter} from "vue-router";

export default {
  name: "Dashboard",
  components: {
    WeatherCard,
    CountNumberBox, TimeLineBox, DragBox, draggable, IconCloseCircleFill, IconArrowRight, IconArrowRise, IconDelete},
  setup() {
    const api = inject('api');
    const router = useRouter()
    const notesNumber = ref(0)
    const recipesNumber = ref(0)
    const newTodo = ref({
      id: '',
      title: '',
      detail: '',
    });
    const showDeleteBtn = ref(false);
    const todoList = ref([
      {
        id: 1,
        title: 'learning docker',
        detail: ''
      },
      {
        id: 2,
        title: 'create docker image',
        detail: ''
      },
      {
        id: 3,
        title: '拿快递',
        detail: ''
      },
      {
        id: 4,
        title: 'deploy by using docker',
        detail: ''
      },
      {
        id: 5,
        title: 'nestjs',
        detail: ''
      },
    ])
    const visible = ref(false);
    const routerPush = (name) => {
      router.push({ name: name });
    }
    const getNumbers = async () => {
      const requests = [1, 2, 3, 4].map(tagId => api.noteService.getListByTagId(null, null, tagId));
      const responses = await Promise.all(requests);
      notesNumber.value = responses.reduce((total, response) => total + response.data.total, 0);
      const recipesReq = await api.cookbookService.getAllCookbook(null, null)
      recipesNumber.value = recipesReq.data.total
    }

    const handleClick = () => {
      visible.value = true;
    };
    const handleOk = () => {
      visible.value = false;
      newTodo.value.id = Math.random().toString();
      todoList.value.push(newTodo.value);
      setTimeout(()=> {
        newTodo.value.title = newTodo.value.detail = newTodo.value.id = ''
      }, 1000)
    };
    const handleCancel = () => {
      visible.value = false;
      setTimeout(()=> {
        newTodo.value.title = newTodo.value.detail = newTodo.value.id = ''
      }, 1000)
    }
    const addTodo = () => {}
    const deleteTodo = (id) => {
      todoList.value = todoList.value.filter(item => item.id !== id);
    }
    onMounted(() => {
      getNumbers()
    })
    return {
      showDeleteBtn,
      todoList,
      newTodo,
      deleteTodo,
      addTodo,
      visible,
      handleClick,
      handleOk,
      handleCancel,
      notesNumber,
      recipesNumber,
      routerPush
    }
  },
  data() {
    return {}
  },
  computed: {
    user() {
      return localStorage.getItem('admin')
    },
    events() {
      return scheduleStore().getEvents()
    }
  },
}
</script>

<style scoped lang="scss">

//.shake {
//  animation: shake 800ms infinite ;
//}
//@keyframes shake {
//  10%, 90% { transform: translate3d(-1px, 0, 0); }
//  20%, 80% { transform: translate3d(+1px, 1px, 0); }
//  30%, 70% { transform: translate3d(-1px, 1px, 0); }
//  40%, 60% { transform: translate3d(+1px, 0, 0); }
//  50% { transform: translate3d(-1px, 0, 0); }
//}
.mbStyle{
  margin-bottom: 20px;
}
.dashboard{
  .weatherCard{
    margin-right: 20px;
  }
}
@media screen and (max-width: 1200px){
  .dashboard{
    .top{
      h1{
        font-size: 24px;
      }
    }
  }
}
@media screen and (max-width: 992px){
  .dashboard{
    .top{
      h1{
        font-size: 20px;
      }
    }

  }
}
@media screen and (max-width: 768px){
  .weatherCard{
    width: 100%;
    line-height: 24px;
    justify-content: space-between;
  }
  .detailBtn{
    margin-top: 10px;
    width: 100%;
  }
  .topRightBox{
    width: 100%;
    justify-content: space-between;
  }
  .numberCardBox{
    justify-content: center;
  }
  .progressCard{
    margin-top: 16px;
  }
}
@media screen and (max-width: 576px){
  .dashboard{
    h3{
      margin: 10px 0;
    }
  }
 .todoListCard{
   margin-top: 16px;
 }
  .mbStyle{
    margin-bottom: 0;
  }
}

</style>
