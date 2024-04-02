<template>
  <a-row justify="space-between" align="center" class="topTitle">
    <a-space>
      <slot name="title" />
    </a-space>
    <a-button @click="resetForm">重置</a-button>
  </a-row>
  <a-form :model="form" :style="{ width: '100%' }" auto-label-width @submit="handleSubmit">
    <a-form-item field="title" label="标题">
      <a-input v-model="form.title" placeholder="please enter title..." allow-clear/>
    </a-form-item>
    <a-form-item field="description" label="简介">
      <a-textarea v-model="form.description" placeholder="please enter description..."/>
    </a-form-item>
    <a-form-item field="tag" label="标签">
      <a-select v-model="currentTag" :style="{width:'320px'}" placeholder="Please select ...">
        <a-option v-for="item of tagList" :value="item" :label="item.value" />
      </a-select>
    </a-form-item>
    <a-form-item field="detail" label="内容" tooltip="网站内容可以直接使用富文本编辑器内的超链接">
    </a-form-item>
    <ckeditor :editor="editor" v-model="form.detail" :config="editorConfig" @ready="initExtraPlugins"></ckeditor>
    <a-row justify="end" class="footer">
      <a-space>
        <a-popconfirm content="确定删除全部内容并返回?" @ok="back">
          <a-button>{{ $t('back') }}</a-button>
        </a-popconfirm>
        <a-button html-type="submit" :disabled="submitting">{{ $t(action) }}</a-button>
      </a-space>
    </a-row>
  </a-form>
</template>

<script>
import {onBeforeRouteLeave, useRoute, useRouter} from "vue-router";
import {inject, onActivated, onBeforeUnmount, onMounted, reactive, ref} from "vue";
import ClassicEditor from "ckeditor5-custom-akiweiqinliang";
import {Message} from "@arco-design/web-vue";
import MyUploadAdapter from "@/utils/MyUploadAdapter.js";

export default {
  name: "NoteForm",
  props: {
    action: {
      required: true,
      type: String,
      default: "add", // add edit
    }
  },
  setup(props) {
    onBeforeRouteLeave((to, from, next) => {
      const answer = window.confirm('您确定要离开当前页面吗？未保存的数据将会丢失。');
      if (answer) {
        next();
      } else {
        next(false); // 取消导航
      }
    });
    const api = inject('api')
    const route = useRoute()
    const router = useRouter()
    let tagList = ref([])
    const editor = ClassicEditor
    const editorConfig = {
      toolbar: {
        items: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList','|', 'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor', '|', 'outdent', 'indent', '|', 'imageUpload', 'blockQuote', 'insertTable', 'mediaEmbed', 'undo', 'redo'],
      },
    };
    const form = reactive({
      title: '',
      description: '',
      detail: '',
    });
    let currentTag = ref({
      value: "前端学习",
      tagId: 1
    })
    let submitting = ref(false);
    async function getTagList() {
      const result = await api.tagService.getLearnNoteTagList();
      tagList.value = result.data.records;
    }
    const getForm = async () => {
      const routeId = route.params.id;
      const result = await api.noteService.findById(routeId);
      const { title, tagId, tag, description, tagType, detail, id } = result.data;
      form.description = description;
      form.title = title;
      form.detail = detail;
      currentTag.value = {
        value: tag,
        tagId,
      }
    }
    const handleSubmit = async (data) => {
      let note = JSON.parse(JSON.stringify(data.values))
      note.tag = currentTag.value.value;
      note.tagId = currentTag.value.tagId;
      for (const key in form) {
        if (form[key] === undefined || form[key] === null || form[key] === '') {
          Message.info(`${key}为空`);
          return
        }
      }
      submitting.value = true;
      let result;
      let msg = "新增笔记成功！"
      if (props.action === 'add') {
        result = await api.noteService.createNote(note);
      }else if (props.action === 'edit') {
        note.id = +route.params.id;
        result = await api.noteService.updateNote(note.id, note)
        msg = "修改笔记成功！"
      }
      if (result.code === 0) {
        Message.success({
          content: msg,
          duration: 5000,
          closable: true,
        })

      }else {
        Message.error({
          content: result.message,
          duration: 5000,
          closable: true
        })
      }
      setTimeout(() => {
        submitting.value = false;
      }, 3000)
      console.log(result)
    };
    const back = () => {
      router.back()
    }
    const resetForm = () => {
      form.description = form.detail = form.title = ''
    }
    function initExtraPlugins(editor) {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader);
      };
    }
    function confirmLeave(event) {
      event.preventDefault();
      event.returnValue = ''; // 设置一个空字符串会触发浏览器默认的确认消息
    }
    onMounted(() => {
      getTagList()
      if (props.action !== "add") {
        getForm()
      }
      window.addEventListener('beforeunload', confirmLeave);
    })
    onBeforeUnmount(() => {
      window.removeEventListener('beforeunload', confirmLeave);
    })
    onActivated(() => {
      if (props.action === "add") {
        resetForm()
      }else if (props.action === "edit") {
        getForm()
      }
    })
    return {
      form,
      currentTag,
      tagList,
      resetForm,
      handleSubmit,
      initExtraPlugins,
      editor,
      editorConfig,
      submitting,
      back,
    };
  },
}
</script>

<style scoped lang="scss">
.topTitle{
  margin-bottom: 20px;
}
.footer{
  margin-top: 20px;
}
</style>
