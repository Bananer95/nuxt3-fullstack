<template>
  <div>
    <h1>ADMIN</h1>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "admin",
  layout: "admin",
});

useSeoMeta({
  title: `Simba - Admin`,
  ogTitle: `Simba - Admin`,
  description: 'This is my test project.',
  ogDescription: 'This is my test project.',
})
</script>

<style lang="scss" scoped>
</style>