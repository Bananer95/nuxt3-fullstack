<template>
  <div class="nav-wrapper" :class="{ compressed: isCompressed }">
    <h3 @click="navigateTo('/')" class="title">
      {{ isCompressed ? "S" : showTitle ? "SIMBA" : "S" }}
    </h3>
    <div class="links">
      <div class="item" @click="navigateTo('/admin/blogs')">
        <Icon name="carbon:ibm-watson-knowledge-catalog" />
        {{ showTitle ? "Blogs" : "" }}
      </div>
    </div>
    <div class="footer">
      <Icon
        :name="!isCompressed ? 'carbon:arrow-left' : 'carbon:arrow-right'"
        :style="{
          fontSize: '24px',
          cursor: 'pointer',
        }"
        @click="isCompressed = !isCompressed"
      />
    </div>
  </div>
</template>

<script setup>
const isCompressed = ref(false);
const showTitle = ref(!isCompressed.value);

watch(isCompressed, (newVal) => {
  if (!newVal) {
    setTimeout(() => {
      showTitle.value = true;
    }, 500);
  } else {
    showTitle.value = false;
  }
});
</script>

<style lang="scss" scoped>
.nav-wrapper {
  padding: 10px 15px;
  background: rgb(180, 180, 180);
  height: 100vh;
  width: 16%;
  border-radius: 0 16px 16px 0;
  transition: width 1s ease-in-out;
  overflow: hidden;
}

.compressed {
  width: 5%;
}
.item {
  @include flex-row-center;
  gap: 20px;
  user-select: none;
  cursor: pointer;
  span {
    font-size: 24px;
  }
  &:hover {
    color: #694d4d;
  }
}

.title {
  @include Title;
  color: $light-text-color;
  cursor: pointer;
  user-select: none;
  height: 50px;
  width: min-content;
  margin: 0 auto 20px;
}

.footer {
  position: fixed;
  bottom: 20px;
}
</style>