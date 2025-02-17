<template>
  <div class="blog-wrapper">
    <img :src="post?.imgUrl" alt="post main image" class="img" />
    <div class="title" v-html="post?.title"></div>
    <div class="content" v-html="post?.content"></div>
  </div>
</template>

<script setup>
const $route = useRoute();
const { data: post } = await useFetch(`/api/post/${$route.params.id}`);

const cleanTitle = post.value?.title.replace(/<\/?[^>]+(>|$)/g, "");

useSeoMeta({
  title: `Simba - ${cleanTitle}`,
  ogTitle: `Simba - ${cleanTitle}`,
  description: 'This is my test project.',
  ogDescription: 'This is my test project.',
})
</script>

<style lang="scss" scoped>
.blog-wrapper {
  @include flex-column;
  @include cardWrapper;
  max-width: 1440px;
  margin: 50px auto 60px;
  gap: 20px;
  align-items: center;
}

.img {
  max-width: 80%;
  height: auto;
  border-radius: 16px;
}

@media (max-width: 1480px) {
  .blog-wrapper {
    width: 90vw;
  }
  
}
</style>