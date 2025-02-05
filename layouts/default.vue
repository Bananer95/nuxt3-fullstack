<template>
  <div class="app-wrapper">
    <NavBar />
    <div class="bg-wrapper" :class="userTheme">
      <slot class="slot" />
    </div>
    <Footer />
  </div>
</template>

<script setup>
const { user } = useUserSession();

const userTheme = computed(() => {
  const themes = {
    Fire: "fire-bg-dark",
    Water: "water-bg-dark",
    Earth: "earth-bg-dark",
    Air: "air-bg-dark",
    Light: "light-bg-dark",
    Shadow: "shadow-bg-dark",
    Ice: "ice-bg-dark",
    Metal: "metal-bg-dark",
    Spirit: "spirit-bg-dark",
  };

  return themes[user.value?.theme] || "default-theme";
});
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include flex-column;
  background: var(--bg-primary);
  min-height: 100vh;
}

.bg-wrapper {
  @include flex-column;
  min-height: calc(100vh - 197px);
}

.water-bg-dark {
  @include backgroundTheme("water-dark");
}
.fire-bg-dark {
  @include backgroundTheme("fire-dark");
}
.earth-bg-dark {
  @include backgroundTheme("earth");
}
.air-bg-dark {
  @include backgroundTheme("air");
}
.light-bg-dark {
  @include backgroundTheme("light");
}
.shadow-bg-dark {
  @include backgroundTheme("shadow");
}
.ice-bg-dark {
  @include backgroundTheme("ice");
}
.metal-bg-dark {
  @include backgroundTheme("metal");
}
.spirit-bg-dark {
  @include backgroundTheme("spirit");
}
</style>