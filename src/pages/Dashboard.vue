<template>
<!--  {{events}}-->
  <div
      :style="{
      boxSizing: 'border-box',
      width: '100%',
      backgroundColor: 'var(--color-fill-2)',
    }"
  >
    <a-row :gutter="20">
      <a-col :span="16">
        <a-row :gutter="20" :style="{ marginBottom: '20px' }">
          <a-col :span="8">
            <a-card title="Study Card" :bordered="false" :style="{ width: '100%' }">
              <template #extra>
                <a-link @click="studyShake = !studyShake">{{ !studyShake ? 'Edit' : 'Done' }}</a-link>
                |
                <a-link>Add</a-link>
              </template>
                <draggable
                    class="list-group"
                    :list="studyList"
                    group="people"
                    @change="log"
                    itemKey="name"
                >
                  <template #item="{ element, index }">
                    <a-card :style="{ marginBottom: '8px' }" class="itemCard" :class="studyShake ? 'shake' : ''">
                      <icon-close-circle-fill v-show="studyShake" class="deleteBtn" size="18" @click="removeItem('study', element.id)"/>
                      <a-row justify="space-between">
                        <span>
                      <a-avatar
                          :style="{ marginRight: '8px', backgroundColor: 'rgb(var(--arcoblue-6))' }"
                          :size="28"
                      >
                        {{ element.name.slice(0,1) }}
                      </a-avatar>
                      <a-typography-text>{{ element.name }}</a-typography-text>
                      </span>
                        <a-link>More</a-link>
                      </a-row>
                    </a-card>
                  </template>
                </draggable>
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card title="Work Card" :bordered="false" :style="{ width: '100%' }">
              <template #extra>
                <a-link>Edit</a-link>
              </template>
              <draggable
                  class="list-group"
                  :list="workList"
                  group="people"
                  @change="log"
                  itemKey="name"
              >
                <template #item="{ element, index }">
                  <a-card :style="{ marginBottom: '8px' }" class="itemCard" :class="studyShake ? 'shake' : ''">
                    <icon-close-circle-fill v-show="studyShake" class="deleteBtn" size="18" @click="removeItem('study', element.id)"/>
                    <a-row justify="space-between">
                        <span>
                      <a-avatar
                          :style="{ marginRight: '8px', backgroundColor: 'rgb(var(--arcoblue-8))' }"
                          :size="28"
                      >
                        {{ element.name.slice(0,1) }}
                      </a-avatar>
                      <a-typography-text>{{ element.name }}</a-typography-text>
                      </span>
                      <a-link>More</a-link>
                    </a-row>
                  </a-card>
                </template>
              </draggable>
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card title="Todo Card" :bordered="false" :style="{ width: '100%' }">
              <template #extra>
                <a-link @click="todoShake = !todoShake">{{ !todoShake ? 'Edit' : 'Done' }}</a-link>
                |
                <a-link>Add</a-link>
              </template>
              <draggable
                  class="list-group"
                  :list="todoList"
                  group="people"
                  @change="log"
                  itemKey="name"
              >
                <template #item="{ element, index }">
                  <a-card :style="{ marginBottom: '8px' }" class="itemCard" :class="todoShake ? 'shake' : ''">
                    <icon-close-circle-fill v-show="todoShake" class="deleteBtn" size="18" @click="removeItem('study', element.id)"/>
                    <a-row justify="space-between">
                        <span>
                      <a-avatar
                          :style="{ marginRight: '8px', backgroundColor: 'rgb(var(--arcoblue-7))' }"
                          :size="28"
                      >
                        {{ element.name.slice(0,1) }}
                      </a-avatar>
                      <a-typography-text>{{ element.name }}</a-typography-text>
                      </span>
                      <a-link>More</a-link>
                    </a-row>
                  </a-card>
                </template>
              </draggable>
            </a-card>
          </a-col>
        </a-row>
        <a-row :gutter="20" :style="{ marginBottom: '20px' }">
          <a-col :span="16">
            <a-card title="Cooking Card" :bordered="false" :style="{ width: '100%' }">
              <template #extra>
                <a-link>Edit</a-link>
              </template>
              <draggable
                  class="list-group"
                  :list="cookingList"
                  group="people"
                  @change="log"
                  itemKey="name"
              >
                <template #item="{ element, index }">
                  <a-card :style="{ marginBottom: '8px' }" class="itemCard" :class="studyShake ? 'shake' : ''">
                    <icon-close-circle-fill v-show="studyShake" class="deleteBtn" size="18" @click="removeItem('study', element.id)"/>
                    <a-row justify="space-between">
                        <span>
                      <a-avatar
                          :style="{ marginRight: '8px', backgroundColor: 'rgb(var(--orange-5))' }"
                          :size="28"
                      >
                        {{ element.name.slice(0,1) }}
                      </a-avatar>
                      <a-typography-text>{{ element.name }}</a-typography-text>
                      </span>
                      <a-link>More</a-link>
                    </a-row>
                  </a-card>
                </template>
              </draggable>
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card title="Delivery Card" :bordered="false" :style="{ width: '100%' }">
              <template #extra>
                <a-link>Edit</a-link>
              </template>
              <draggable
                  class="list-group"
                  :list="deliveryList"
                  group="people"
                  @change="log"
                  itemKey="name"
              >
                <template #item="{ element, index }">
                  <a-card :style="{ marginBottom: '8px' }" class="itemCard" :class="studyShake ? 'shake' : ''">
                    <icon-close-circle-fill v-show="studyShake" class="deleteBtn" size="18" @click="removeItem('study', element.id)"/>
                    <a-row justify="space-between">
                        <span>
                      <a-avatar
                          :style="{ marginRight: '8px', backgroundColor: 'rgb(var(--red-6)' }"
                          :size="28"
                      >
                        {{ element.name.slice(0,1) }}
                      </a-avatar>
                      <a-typography-text>{{ element.name }}</a-typography-text>
                      </span>
                      <a-link>More</a-link>
                    </a-row>
                  </a-card>
                </template>
              </draggable>
            </a-card>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="8">
        <a-card title="Finish Card" :bordered="false" :style="{ width: '100%' }">
          <template #extra>
            <a-link>Edit</a-link>
          </template>
          <draggable
              class="list-group"
              :list="finishList"
              group="people"
              @change="log"
              itemKey="name"
          >
            <template #item="{ element, index }">
              <a-card :style="{ marginBottom: '8px' }" class="itemCard" :class="studyShake ? 'shake' : ''">
                <icon-close-circle-fill v-show="studyShake" class="deleteBtn" size="18" @click="removeItem('study', element.id)"/>
                <a-row justify="space-between">
                        <span>
                      <a-avatar
                          :style="{ marginRight: '8px', backgroundColor: 'rgb(var(--green-8))' }"
                          :size="28"
                      >
                        {{ element.name.slice(0,1) }}
                      </a-avatar>
                      <a-typography-text>{{ element.name }}</a-typography-text>
                      </span>
                  <a-link>More</a-link>
                </a-row>
              </a-card>
            </template>
          </draggable>
        </a-card>
      </a-col>
    </a-row>


  </div>
</template>

<script>
import DragBox from "../components/DragBox.vue";
import {IconCloseCircleFill,} from '@arco-design/web-vue/es/icon';
import draggable from "vuedraggable";
import {scheduleStore} from "@/stores/schedule.js";

export default {
  name: "Dashboard",
  components: {DragBox, draggable, IconCloseCircleFill},
  data() {
    return {
      todoShake: false,
      studyShake: false,
      studyList: [
        {
          id:1111111,
          name: 'ts'
        },
        {
          id:11111211,
          name: 'vue3'
        },
      ],
      finishList: [
        { name: "Juanhahahahha", id: 5 },
      ],
      workList: [
        { name: "John", id: 1 },
        { name: "Joao", id: 2 },
        { name: "Jean", id: 3 },
        { name: "Gerard", id: 4 }
      ],
      todoList: [
        { name: "Juan", id: 5 },
        { name: "Edgard", id: 6 },
        { name: "Johnson", id: 7 }
      ],
      cookingList: [
        { name: "Juanhahahahha", id: 5 },
        { name: "Edgard", id: 6 },
        { name: "Johnson", id: 7 }
      ],
      deliveryList: [
        { name: "Juanhahahahha", id: 5 },
      ]
    }
  },
  computed: {
    events() {
      return scheduleStore().getEvents()
    }
  },
  methods: {
    removeItem(type, deleteId) {
      switch (type) {
        case 'study':
          this.studyList = this.studyList.filter(el => el.id !== deleteId)
          break
        case 'work':
          this.workList = this.workList.filter(el => el.id !== deleteId)
          break
      }
    },
    log: function(evt) {
      // window.console.log(evt);
    }
  }
}
</script>

<style scoped lang="scss">
.itemCard{
  position: relative;
  .deleteBtn{
    position: absolute;
    left: -8px;
    top: -8px;
    cursor: pointer;
  }
  .deleteBtn:hover{
    color: #646cff;
  }
}

.shake {
  animation: shake 800ms infinite ;
}
@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(+1px, 1px, 0); }
  30%, 70% { transform: translate3d(-1px, 1px, 0); }
  40%, 60% { transform: translate3d(+1px, 0, 0); }
  50% { transform: translate3d(-1px, 0, 0); }
}
</style>
