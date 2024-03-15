<template>
  <a-layout-content class="updateNote">
    <NoteForm action="edit">
      <template #title>修改笔记</template>
    </NoteForm>
  </a-layout-content>
</template>

<script>
import NoteForm from "@cp/NoteForm.vue";

export default {
  name: "UpdateNote",
  components: {NoteForm},
}
</script>

<style scoped lang="scss">
.updateNote{
  padding: 20px;
}
</style>
