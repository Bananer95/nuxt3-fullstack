<template>
  <div class="app-wrapper">
    <AdminNavigationBar />
    <div class="main-content">
      <slot class="slot" />
    </div>
  </div>
</template>

<script setup>
const { user } = useUserSession();
</script>

<style lang="scss" scoped>
.app-wrapper {
    display: flex;
    flex-direction: row;
    position: relative;
}

.main-content {
  padding: 20px;
  width: auto;
  flex: 1 0 0 ;
  height: 100vh;
  overflow: scroll;
}
</style>