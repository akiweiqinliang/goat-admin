<template>
  <a-layout-content class="createNote">
    <NoteForm action="add">
      <template #title>新增笔记</template>
    </NoteForm>
  </a-layout-content>
</template>

<script>
import NoteForm from "@cp/NoteForm.vue";

export default {
  name: "CreateNote",
  components: {NoteForm},
}
</script>

<style scoped lang="scss">
.createNote{
  padding: 20px;
}
</style>
