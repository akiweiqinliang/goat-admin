<template>
  <a-result status="404" subtitle="Whoops, that page is gone.">
    <template #extra>
      <a-space>
        <router-link to="/">
          <a-button type="primary">Back</a-button>
        </router-link>
      </a-space>
    </template>
  </a-result>
</template>

<script>
export default {
  name: "404"
}
</script>

<style scoped>

</style>
