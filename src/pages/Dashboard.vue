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
          {{ $t('totoTxt')}}
          <span style="color: var(--color-text-2)">{{ user }}</span>
        </h1>
      </a-col>
      <a-col :span="12" :sm="24" :md="14" :lg="12" :xs="24">
        <a-row align="center" justify="end" class="topRightBox" :wrap="false">
          <WeatherCard class="weatherCard" />
          <a-button type="primary" shape="round" @click="visible = true" class="topBtn">{{ $t('add') }} +</a-button>
        </a-row>
      </a-col>


    </a-row>
    <a-row :gutter="20" class="mbStyle">
      <a-col :span="12" :xs="24" :sm="12">
        <a-row>
          <a-col :xs="0" :sm="24">
            <h3 style="color: var(--color-text-1)">
<!--              notes-->
            </h3>
          </a-col>
        </a-row>
        <a-card :title="$t('notes')" class="mobileStyle">
          <a-row justify="space-between" align="center" class="numberCardBox">
            <CountNumberBox :number="notesNumber" :rate="(notesNumber - 10) / 10"/>
            <a-button class="detailBtn" shape="round" @click="routerPush('notes')">️💫 {{$t('checkDetail')}}<icon-arrow-right style="margin-left: 8px" /></a-button>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="12" :xs="24" :sm="12">
        <a-row>
          <a-col :xs="0" :sm="24">
            <h3 style="color: var(--color-text-1)">
<!--              recipes-->
            </h3>
          </a-col>
        </a-row>
        <a-card :title="$t('cookbook')" class="mobileStyle">
          <a-row justify="space-between" align="center"  class="numberCardBox">
            <CountNumberBox :number="recipesNumber" :rate="(recipesNumber - 10) / 10"/>
            <a-button class="detailBtn" shape="round" @click="routerPush('cookbook')">✨ {{$t('checkDetail')}}<icon-arrow-right style="margin-left: 8px" /></a-button>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="20">
      <a-col :span="16" :xs="0" :sm="0" :md="16">
        <a-card :title="$t('learnProgress')">
          <a-progress :percent="notesNumber / 100" :animation="true" size="large" :color="{
        '0%': 'rgb(var(--primary-6))',
        '100%': 'rgb(var(--success-6))',
      }">
            <template v-slot:text="scope" >
              {{$t('progress')}} {{scope.percent * 100}}%
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
            <a-link @click="visible = true">{{ $t('add')}}</a-link>
            <a-divider :direction="'vertical'"/>
            <a-link @click="showDeleteBtn = !showDeleteBtn">{{ !showDeleteBtn ? $t('edit') : $t('done') }}</a-link>
          </template>
          <a-list size="small">
            <a-list-item v-for="(todo, index) in todoList" :key="index">
              <a-list-item-meta
                  :title="todo.title"
                  @click="viewDetail(todo)"
                  class="textStyle"
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
            <a-card :title="$t('learnProgress')" class="progressCard">
              <a-progress :percent="notesNumber / 100" :animation="true" size="large" :color="{
        '0%': 'rgb(var(--primary-6))',
        '100%': 'rgb(var(--success-6))',
      }">
                <template v-slot:text="scope" >
                   {{$t('progress') }} {{ scope.percent * 100}}%
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
        width="100%"
        height="80%"
        :visible="visible"
        placement="bottom"
        @cancel="handleCancel"
        unmountOnClose
        :footer="false"
        @close="handleCancel"
    >
      <template #title v-if="!onlyRead">
        {{$t('add')}}{{ $t('todo') }}
      </template>
      <template #title v-else>
        {{ $t('todo') }}
      </template>
      <a-form layout="vertical" :model="newTodo">
        <a-form-item :label="$t('title')">
          <a-input v-model="newTodo.title" placeholder="Please enter something" />
        </a-form-item>
        <a-form-item :label="$t('detail')">
          <a-textarea v-model.trim="newTodo.detail" placeholder="Please enter something" allow-clear/>
        </a-form-item>
      </a-form>
      <a-row justify="end" v-show="!onlyRead">
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
import {inject, onActivated, onMounted, ref} from "vue";
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
    const onlyRead = ref(false);
    const newTodo = ref({
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
    const handleOk = () => {
      visible.value = false;
      addTodo()
    };
    const handleCancel = () => {
      visible.value = false;
      newTodo.value.title = newTodo.value.detail = '';
      onlyRead.value = false;
    }
    const addTodo = () => {
      api.todoService.createTodo(newTodo.value).then(() => {
        getTodos()
        newTodo.value.title = newTodo.value.detail = ''
      })
    }
    const deleteTodo = (id) => {
      api.todoService.deleteTodo(id).then(() => {
        getTodos()
      })
    }
    const getTodos = async () => {
      const res = await api.todoService.findAll();
      todoList.value = res.data;
    }
    onMounted(() => {
      getNumbers()
      getTodos()
    })
    onActivated(() => {
      getNumbers()
      getTodos()
    })
    const viewDetail = (todo) => {
      newTodo.value.title = todo.title;
      newTodo.value.detail = todo.detail;
      visible.value = true;
      onlyRead.value = true;
    }
    return {
      showDeleteBtn,
      todoList,
      newTodo,
      deleteTodo,
      visible,
      onlyRead,
      handleOk,
      handleCancel,
      notesNumber,
      recipesNumber,
      routerPush,
      viewDetail
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
.mbStyle{
  margin-bottom: 20px;
}
.dashboard{
  .weatherCard{
    margin-right: 20px;
  }
  .mobileStyle{
    width: 100%;
  }
  .textStyle{
    word-break: break-word;
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
    .top{
      h1{
        font-size: 14px;
      }
    }
    .weatherCard{
      font-size: 12px;
    }
    .topBtn{
      font-size: 13px;
      height: 28px;
      padding: 0 12px;
    }
  }
  .mobileStyle{
    margin-top: 8px;
  }
 .todoListCard{
   margin-top: 8px;
 }
  .mbStyle{
    margin-bottom: 0;
  }
}

</style>
