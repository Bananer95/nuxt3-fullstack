<template>
  <div class="wrapper">
    <h1>Blogs</h1>
    <UISmallPostCard v-for="post in posts" :key="post.id" :item="post" />
  </div>
</template>

<script setup>
const { data: posts } = useFetch('/api/post');

useSeoMeta({
  title: 'Simba - Blogs',
  ogTitle: 'Simba - Blogs',
  description: 'This is my test project.',
  ogDescription: 'This is my test project.',
})
</script>

<style lang="scss" scoped>
.wrapper {
  @include cardWrapper;
  max-width: 1440px;
  margin: 100px auto;
}

@media (max-width:1480px) {
  .wrapper {
    width: 90vw;
  } 
}
</style>