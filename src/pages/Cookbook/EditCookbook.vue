<template>
  <a-layout-content>
    <a-row>
      <a-col :span="24" :xs="0" :sm="24">
        <a-split class="splitStyle"
                 v-model:size="size"
                 min="80px"
        >
          <template #first>
            <a-typography-paragraph>
              <a-layout class="editLayout">
                <a-layout-header class="header">
                  <a-row justify="space-between" align="center">
                    <a-space>
                      {{ $t('editCookbook') }} 🥗
                    </a-space>
                    <a-button @click="resetForm">重置</a-button>
                  </a-row>
                </a-layout-header>
                <a-layout-content>
                  <a-form :model="form" :style="{ width: '100%' }" auto-label-width @submit="handleSubmit">
                    <a-form-item field="title" label="标题">
                      <a-input v-model="form.title" placeholder="please enter title..."/>
                    </a-form-item>
                    <a-form-item field="description" label="简介">
                      <a-input v-model="form.description" placeholder="please enter description..."/>
                    </a-form-item>
                    <a-form-item field="tagObj" label="标签">
                      <a-select v-model="form.tagObj" :style="{width:'320px'}" placeholder="Please select ...">
                        <a-option v-for="item of tagList" :value="item" :label="item.value" />
                      </a-select>
                    </a-form-item>
                    <a-form-item field="category" label="类型">
                      <a-radio-group v-model="form.category" :options="categoryOptions" />
                    </a-form-item>
                    <a-form-item field="imgUrl" label="封面">
                      <a-upload
                          :headers="uploadHeaders"
                          :action="uploadUrl"
                          :fileList="file ? [file] : []"
                          :show-file-list="false"
                          @change="onChange"
                          @progress="onProgress"
                          :response-url-key="fileItem => fileItem.response.data"
                      >
                        <template #upload-button>
                          <div
                              :class="`arco-upload-list-item${
            file && file.status === 'error' ? ' arco-upload-list-item-error' : ''
          }`"
                          >
                            <div
                                class="arco-upload-list-picture custom-upload-avatar"
                                v-if="file && file.url"
                            >
                              <img :src="file.url" />
                              <div class="arco-upload-list-picture-mask">
                                <IconEdit />
                              </div>
                              <a-progress
                                  v-if="file.status === 'uploading' && file.percent < 100"
                                  :percent="file.percent"
                                  type="circle"
                                  size="mini"
                                  :style="{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translateX(-50%) translateY(-50%)',
              }"
                              />
                            </div>
                            <div class="arco-upload-picture-card" v-else>
                              <div class="arco-upload-picture-card-text">
                                <IconPlus />
                                <div style="margin-top: 10px;font-size: 12px;">上传封面图</div>
                              </div>
                            </div>
                          </div>
                        </template>
                      </a-upload>
                    </a-form-item>
                    <a-form-item field="cookingWay" label="做法">
                    </a-form-item>
                    <ckeditor :editor="editor" v-model="form.cookingWay" :config="editorConfig" @ready="initExtraPlugins"></ckeditor>
                    <a-row justify="end" class="footer">
                      <a-space>
                        <a-popconfirm content="确定删除全部内容并返回首页?" @ok="backHome">
                          <a-tooltip :content="$t('backHome')">
                            <a-button>{{ $t('cancel') }}</a-button>
                          </a-tooltip>
                        </a-popconfirm>
                        <a-button html-type="submit" :disabled="submitCookbook">{{ $t('add') }}</a-button>
                      </a-space>
                    </a-row>
                  </a-form>
                </a-layout-content>
              </a-layout>
            </a-typography-paragraph>
          </template>
          <template #second>
            <a-typography-paragraph>
              <a-layout class="editLayout">
                <a-layout-header class="header">
                  <a-space>
                    预览效果 👀
                  </a-space>
                </a-layout-header>
                <a-layout-content>
                  <CookbookPreviewPage :cookbook="form" />
                </a-layout-content>
              </a-layout>
            </a-typography-paragraph>
          </template>
        </a-split>
      </a-col>
      <a-col :span="24" :xs="24" :sm="0">

            <a-typography-paragraph>
              <a-layout class="editLayout">
                <a-layout-header class="header">
                  <a-row justify="space-between" align="center">
                    <a-space>
                      {{ $t('editCookbook') }} 🥗
                    </a-space>
                    <a-button @click="resetForm">重置</a-button>
                  </a-row>
                </a-layout-header>
                <a-layout-content>
                  <a-form :model="form" :style="{ width: '100%' }" auto-label-width @submit="handleSubmit">
                    <a-form-item field="title" label="标题">
                      <a-input v-model="form.title" placeholder="please enter title..."/>
                    </a-form-item>
                    <a-form-item field="description" label="简介">
                      <a-input v-model="form.description" placeholder="please enter description..."/>
                    </a-form-item>
                    <a-form-item field="tagObj" label="标签">
                      <a-select v-model="form.tagObj" :style="{width:'320px'}" placeholder="Please select ...">
                        <a-option v-for="item of tagList" :value="item" :label="item.value" />
                      </a-select>
                    </a-form-item>
                    <a-form-item field="category" label="类型">
                      <a-radio-group v-model="form.category" :options="categoryOptions" />
                    </a-form-item>
                    <a-form-item field="imgUrl" label="封面">
                      <a-upload
                          :headers="uploadHeaders"
                          :action="uploadUrl"
                          :fileList="file ? [file] : []"
                          :show-file-list="false"
                          @change="onChange"
                          @progress="onProgress"
                          :response-url-key="fileItem => fileItem.response.data"
                      >
                        <template #upload-button>
                          <div
                              :class="`arco-upload-list-item${
            file && file.status === 'error' ? ' arco-upload-list-item-error' : ''
          }`"
                          >
                            <div
                                class="arco-upload-list-picture custom-upload-avatar"
                                v-if="file && file.url"
                            >
                              <img :src="file.url" />
                              <div class="arco-upload-list-picture-mask">
                                <IconEdit />
                              </div>
                              <a-progress
                                  v-if="file.status === 'uploading' && file.percent < 100"
                                  :percent="file.percent"
                                  type="circle"
                                  size="mini"
                                  :style="{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translateX(-50%) translateY(-50%)',
              }"
                              />
                            </div>
                            <div class="arco-upload-picture-card" v-else>
                              <div class="arco-upload-picture-card-text">
                                <IconPlus />
                                <div style="margin-top: 10px;font-size: 12px;">上传封面图</div>
                              </div>
                            </div>
                          </div>
                        </template>
                      </a-upload>
                    </a-form-item>
                    <a-form-item field="cookingWay" label="做法">
                    </a-form-item>
                    <ckeditor :editor="editor" v-model="form.cookingWay" :config="editorConfig" @ready="initExtraPlugins"></ckeditor>
                    <a-row justify="end" class="footer">
                      <a-space>
                        <a-popconfirm content="确定删除全部内容并返回首页?" @ok="backHome">
<!--                          <a-tooltip :content="$t('backHome')">-->
                            <a-button>{{ $t('cancel') }}</a-button>
<!--                          </a-tooltip>-->
                        </a-popconfirm>
                        <a-button html-type="submit" :disabled="submitCookbook">{{ $t('add') }}</a-button>
                      </a-space>
                    </a-row>
                  </a-form>
                </a-layout-content>
              </a-layout>
            </a-typography-paragraph>
      </a-col>
    </a-row>


  </a-layout-content>


</template>

<script>
import router from "@/router/index.js";
import {inject, onBeforeUnmount, onMounted, reactive, ref} from 'vue';
import ClassicEditor from "ckeditor5-custom-akiweiqinliang";
import MyUploadAdapter from "@/utils/MyUploadAdapter";
import {IconEdit, IconPlus} from '@arco-design/web-vue/es/icon';
import {Message} from "@arco-design/web-vue";
import CookbookPreviewPage from "@cp/CookbookPreviewPage.vue";
import {onBeforeRouteLeave} from 'vue-router';
import axios from "axios";

export default {
  name: "EditCookbook",
  components: {CookbookPreviewPage, IconPlus, IconEdit, },
  setup() {
    onBeforeRouteLeave((to, from, next) => {
      const answer = window.confirm('您确定要离开当前页面吗？未保存的数据将会丢失。');
      if (answer) {
        next();
      } else {
        next(false); // 取消导航
      }
    });
    const api = inject('api');
    let tagList = ref([])
    const form = reactive({
      title: '',
      tagObj: {
        tagId: 1,
        value: '懒人快手'
      },
      tag: null,
      tagId: null,
      category: 0,
      imgUrl: '',
      cookingWay: '<p>详细做法...</p>',
      createTime: new Date().toLocaleDateString(),
      description: '',
    });
    const categoryOptions = [
      { label: '中餐', value: 0 },
      { label: '西餐', value: 1 },
    ]
    // 上传图片
    const file = ref();
    let submitCookbook = ref(false);
    const onChange = (_, currentFile) => {
      file.value = {
        ...currentFile,
        // url: URL.createObjectURL(currentFile.file),
      };
    };
    const onProgress = (currentFile) => {
      file.value = currentFile;
    };
    function resetForm () {
      form.title = '';
      form.category = 0;
      form.cookingWay = '<p>详细做法...</p>';
      form.imgUrl = null;
      form.description = '';
      if (file.value?.url) {
        file.value.url = null;
      }
    };
    const addCookbook = async (cookbook) => {
      submitCookbook.value = true;
      const result = await api.cookbookService.createCookBook(cookbook);
      if (result.code === 0) {
        Message.success({
          content: '新增菜谱成功！',
          duration: 5000,
          closable: true,
        })
        setTimeout(() => {
          submitCookbook.value = false;
        }, 3000)
      }
      console.log(result)
    };
    const handleSubmit = (data) => {
      console.log(data)
      form.imgUrl = file?.value?.url;
      form.tagId = data.values.tagObj.tagId;
      form.tag = data.values.tagObj.value;
      console.log('aaa')
      for (const formKey in form) {
        if (form[formKey] === undefined || form[formKey] === null) {
          Message.info(`${formKey}为空`);
          return
        }
      }
      const { category, cookingWay, imgUrl, tag, tagId, title, description } = {...form}
      const cookbook = { category, cookingWay, imgUrl, tag, tagId, title, description };
      addCookbook(cookbook);
    };
    const getTagList = async () => {
      const result = await api.tagService.getCookbookTagList();
      tagList.value = result.data.records;
    }
    function confirmLeave(event) {
      event.preventDefault();
      event.returnValue = ''; // 设置一个空字符串会触发浏览器默认的确认消息
    }
    onMounted(() => {
      getTagList()
      window.addEventListener('beforeunload', confirmLeave);
    })
    onBeforeUnmount(() => {
      window.removeEventListener('beforeunload', confirmLeave);
    })
    const uploadUrl = ref(axios.defaults.baseURL+'/cookbooks/upload');
    const uploadHeaders = { Authorization : `Bearer ${localStorage.getItem('token')}`}
    const customRequest = (option) => {
      // const {
      //   action, // 后台上传文件接口
      //   name, // 上传文件对应后台字段名
      //   headers, // 请求头信息 {}
      //   data, // {} 给后台除了文件之外的其他数据
      //   fileItem, // 上传文件元素
      //   onProgress,
      //   onError,
      //   onSuccess,
      // } = option;
      console.log(option)
      // const xhr = new XMLHttpRequest();
      // if (xhr.upload) {
      //   xhr.upload.onprogress = function (event) {
      //     let percent;
      //     if (event.total > 0) {
      //       // 0 ~ 1
      //       percent = event.loaded / event.total;
      //     }
      //     onProgress(percent, event);
      //   };
      // }
      // xhr.onerror = function error(e) {
      //   onError(e);
      // };
      // xhr.onload = function onload() {
      //   if (xhr.status < 200 || xhr.status >= 300) {
      //     return onError(xhr.responseText);
      //   }
      //   onSuccess(xhr.response);
      // };

      const formData = new FormData();
      // formData里的数据 一定是名-值对集合
      formData.append(name, fileItem.file);
      // 将data参数中的数据 添加 到formData
      for (let prop in data) {
        formData.append(prop, data[prop]);
      }

      xhr.open('post', action);
      // 设置请求头--一定放在open方法之后
      for (let h in headers) {
        // 添加token头
        xhr.setRequestHeader(h, headers[h]);
      }
      xhr.send(formData);

      return {
        abort() {
          xhr.abort();
        },
      };
    };
    return {
      form,
      file,
      onChange,
      onProgress,
      handleSubmit,
      resetForm,
      categoryOptions,
      tagList,
      submitCookbook,
      uploadUrl,
      uploadHeaders,
      customRequest
    };
  },
  data() {
    return {
      // uploadUrl: 'http://localhost:3000/cookbooks/upload',
      size: 0.5,
      editor: ClassicEditor,
      editorConfig: {
        toolbar: {
          items: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList','|', 'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor', '|', 'outdent', 'indent', '|', 'imageUpload', 'blockQuote', 'insertTable', 'mediaEmbed', 'undo', 'redo'],
        },
      },
    };
  },
  methods: {
    initExtraPlugins(editor) {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader);
      };
    },
    backHome() {
      router.push({ name: 'home' })
    },
  }
}
</script>

<style scoped lang="scss">
.editLayout{
  padding: 0 10%;
  .header{
    margin: 40px 0;
  }
  .footer{
    margin: 40px 0;
  }
}

.splitStyle{
  height: 100vh;
  width: 100%;
  min-width: 500px;
  border: 1px solid var(--color-border);
}
@media screen and (max-width: 576px){
  .editLayout{
    padding: 12px;
    .header{
      margin: 0;
    }
    .footer{
      margin: 20px 0;
    }
  }
}
</style>
