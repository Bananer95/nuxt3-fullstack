<template>
  <div class="blogs-wrapper">
    <div class="header">
        <h2>Blogs</h2>
        <button class="adminBtn" @click="navigateTo('/admin/blogs/new')"> Add New </button>
    </div>
    <div class="content">
      <UISmallPostCard v-for="post in posts" :key="post.id" :item="post" isAdmin />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: "admin",
});
const { data: posts } = useFetch('/api/post');

useSeoMeta({
  title: `Admin - Blogs`,
  ogTitle: `Admin - Blogs`,
  description: 'This is my test project.',
  ogDescription: 'This is my test project.',
})

</script>

<style lang="scss" scoped>
.blogs-wrapper {
  @include flex-column;
}

.header {
    @include flex-row-center;
    gap: 20px;
}
.content {
  @include adminContentBlock;
}

.adminBtn {
    @include adminBtn;
}
</style>