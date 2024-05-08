<template>
  <a-layout-content>
    <a-row>
      <a-col :span="24" :xs="24" :sm="24">
        <a-typography-paragraph>
          <a-layout class="editLayout">
            <a-layout-header class="header">
              <a-row justify="space-between" align="center">
                <a-space>
                  {{ $t('updateCookbook') }} 🥗
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
                      @success="onSuccess"
                      :on-before-upload="beforeUpload"
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
                    <a-button @click="back">{{ $t('back') }}</a-button>
                    <a-button html-type="submit" :disabled="file?.url?.includes('blob') ? true : submitCookbook">{{ $t('edit') }}</a-button>
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
import {inject, onActivated, onBeforeUnmount, onMounted, reactive, ref} from 'vue';
import ClassicEditor from "ckeditor5-custom-akiweiqinliang";
import MyUploadAdapter from "@/utils/MyUploadAdapter";
import {IconEdit, IconPlus} from '@arco-design/web-vue/es/icon';
import {Message} from "@arco-design/web-vue";
import CookbookPreviewPage from "@cp/CookbookPreviewPage.vue";
import {onBeforeRouteLeave, useRoute, useRouter} from 'vue-router';
import axios from "axios";
import request from '@/api/axios'
export default {
  name: "UpdateCookbook",
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
    const router = useRouter()
    const route = useRoute()
    const api = inject('api');
    let tagList = ref([])
    const form = ref({
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
    const temp = ref(null)
    const categoryOptions = [
      { label: '中餐', value: 0 },
      { label: '西餐', value: 1 },
    ]

    // 上传图片
    const file = ref({
      url: null
    });
    let submitCookbook = ref(false);
    const uploadAction = (option) => {
      const {onProgress, onError, onSuccess, fileItem, name} = option;
      const xhr = new XMLHttpRequest();
      if (xhr.upload) {
        xhr.upload.onprogress = function (event) {
          let percent;
          if (event.total > 0) {
            // 0 ~ 1
            percent = event.loaded / event.total;
          }
          onProgress(percent, event);
        };
      }
      xhr.onerror = function error(e) {
        onError(e);
      };
      xhr.onload = function onload() {
        if (xhr.status < 200 || xhr.status >= 300) {
          return onError(xhr.responseText);
        }
        onSuccess(xhr.response);
      };
      let formData = new FormData();
      console.log(option)
      formData.append('file', fileItem.file);
      formData.append('name', fileItem.name);
      const genericErrorText = `Couldn't upload file: ${fileItem.file}.`;
      xhr.open('post', uploadUrl.value, true);
      xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`)
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.response);
        console.log(response)
        file.value.url = response.data
          if (!response || response.error) {
            Message.error(response && response.error ? response.error.message : genericErrorText)
          }
      });
      xhr.send(formData);

    }
    // 格式大小的限制
    const beforeUpload = (file) => {
      let isJPG = false,
          fileType = file.type.split('/')[0];
      if(file.type === "image/jpeg" || file.type === "image/png") {
        isJPG = true;
      } else {
        isJPG = false;
      }
      const isLt5M = file.size / 1024 / 1024 / 1024 / 1024 / 1024;

      if (fileType !== 'image' || isLt5M > 5) {
        Message.error("请上传5M以内的图片文件!");
        return false
      }
      return true;
    };

    const onChange = (_, currentFile) => {
      file.value = { ...currentFile };
    };
    const onProgress = (currentFile) => {
      file.value = currentFile;
    };
    const onSuccess = (fileItem) => {
      file.value.url = fileItem.response.data
    }

    const getDetail = async () => {
      const id = route.params.id;
      const res = await api.cookbookService.getCookBookById(id);
      form.value = { ...res.data }
      form.value.tagObj = {
        tagId: res.data.tagId,
        value: res.data.tag,
      }
      file.value.url = res.data.imgUrl;
      temp.value = {...res.data};
    }
    function resetForm () {
      form.value = { ...temp.value }
      form.value.tagObj = {
        tagId: temp.value.tagId,
        value: temp.value.tag,
      }
      file.value.url = temp.value.imgUrl;
    }

    const handleSubmit = (data) => {
      let updateObj = JSON.parse(JSON.stringify(data.values))
      updateObj.imgUrl = file.value.url
      updateObj.tagId = data.values.tagObj.tagId;
      updateObj.tag = data.values.tagObj.value;
      delete updateObj.tagObj;
      delete updateObj.updateTime;
      delete updateObj.updater;
      delete updateObj.createTime;
      for (const key in updateObj) {
        if (!updateObj[key] && updateObj[key] !== 0) {
          Message.info(`${key}为空`);
          return
        }
      }
      updateCookbook(updateObj);
    };
    const updateCookbook = async (cookbook) => {
      console.log(cookbook)
      if (file.value.url.includes('blob')){
        Message.info("图片还在上传，请稍后再试")
        return
      }
      submitCookbook.value = true;
      const result = await api.cookbookService.updateCookbook(cookbook.id, cookbook);
      if (result.code === 0) {
        Message.success({
          content: '修改成功！',
          duration: 5000,
          closable: true,
        })
        setTimeout(() => {
          submitCookbook.value = false;
        }, 3000)
      }
    };
    const getTagList = async () => {
      const result = await api.tagService.getCookbookTagList();
      tagList.value = result.data.records;
    }
    function confirmLeave(event) {
      event.preventDefault();
      event.returnValue = ''; // 设置一个空字符串会触发浏览器默认的确认消息
    }
    const back = (event) => {
      event.preventDefault();
      router.back()
    }
    onMounted(() => {
      getTagList()
      getDetail()
      window.addEventListener('beforeunload', confirmLeave);
    })
    onActivated(() => {
      getDetail()
    })
    onBeforeUnmount(() => {
      window.removeEventListener('beforeunload', confirmLeave);
    })
    const uploadUrl = ref(axios.defaults.baseURL+'/upload/cookbook');
    // const uploadUrl = ref(axios.defaults.baseURL+'/upload/test');
    const uploadHeaders = { Authorization : `Bearer ${localStorage.getItem('token')}`}
    return {
      form,
      file,
      onChange,
      onProgress,
      onSuccess,
      handleSubmit,
      resetForm,
      back,
      getDetail,
      categoryOptions,
      tagList,
      submitCookbook,
      uploadUrl,
      uploadHeaders,
      uploadAction,
      beforeUpload
    };
  },
  data() {
    return {
      size: 0.5,
      editor: ClassicEditor,
      editorConfig: {
        toolbar: {
          items: ['heading', '|','imageUpload', 'bold', 'italic', 'link', 'bulletedList', 'numberedList','|', 'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor', '|', 'outdent', 'indent', '|', 'blockQuote', 'insertTable', 'mediaEmbed', 'undo', 'redo'],
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
