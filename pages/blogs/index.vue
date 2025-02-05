<template>
  <div class="wrapper">
    <h1>Blogs</h1>
    <UISmallPostCard v-for="post in posts" :key="post.id" :item="post" />
  </div>
</template>

<script setup>
const { data: posts } = useFetch('/api/post');
</script>

<style lang="scss" scoped>
.wrapper {
  @include cardWrapper;
  max-width: 1440px;
  margin: 100px auto;
}
</style>