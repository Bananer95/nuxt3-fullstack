<template>
  <header>
    <div class="header-wrapper">
      <div class="logo">Simba</div>
      <div class="right">
        <div v-if="isDesctopMenu" class="navigation">
          <NuxtLink v-for="(page, index) in Pages" :key="index" :to="page.path">
            {{ page.title }}
          </NuxtLink>
          <NuxtLink v-if="loggedIn" to="/profile">Profile</NuxtLink>
        </div>
        <Icon
          v-else
          name="carbon:chart-bullet"
          class="burgerMenuIcon"
          @click="isBurgerMenuOpen = !isBurgerMenuOpen"
        />
        <Icon
          @click="toggleTheme"
          :name="currentTheme === 'light' ? 'carbon:moon' : 'carbon:sun'"
          class="themeIcons"
        />
        <Icon
          v-if="loggedIn"
          @click="handleLogout"
          name="carbon:logout"
          class="logoutIcon"
        />
      </div>
      <Teleport to="body">
        <div v-if="isBurgerMenuOpen" class="burgerMenu">
        <Icon
          name="carbon:close"
          class="closeIcon"
          @click="isBurgerMenuOpen = !isBurgerMenuOpen"
        />
          <NuxtLink v-for="(page, index) in Pages" :key="index" :to="page.path" @click="isBurgerMenuOpen = false">
            {{ page.title }}
          </NuxtLink>
          <NuxtLink v-if="loggedIn" to="/profile" @click="isBurgerMenuOpen = false">Profile</NuxtLink>
        </div>
      </Teleport>
    </div>
  </header>
</template>

<script setup>
const { currentTheme, toggleTheme } = useTheme();
const { loggedIn, clear } = useUserSession();

function handleLogout() {
  clear();
  navigateTo("/");
}

const isDesctopMenu = ref(true);
const isBurgerMenuOpen = ref(false);

const Pages = [
  { title: "Main", path: "/" },
  { title: "Blogs", path: "/blogs" },
  { title: "Sign Up", path: "/signup" },
  { title: "Sign In", path: "/signin" },
];

onMounted(() => {
  window?.innerWidth < 768
    ? (isDesctopMenu.value = false)
    : (isDesctopMenu.value = true);
});
</script>

<style lang="scss" scoped>
header {
  @include mainGradient(45deg, 85%);
  padding: 15px 40px;
}

.header-wrapper {
  @include flex-row-center;
  @include content-border;
  justify-content: space-between;
}

.right {
  @include flex-row-center;
  gap: 25px;
  user-select: none;
}

.logo {
  @include Logo;
}

.navigation {
  @include flex-row-center;
  gap: 25px;
  a {
    color: var(--text-color);
    font-weight: 600;
    font-size: 16px;
    font-family: "Ubunty", sans-serif;
  }
}

.themeIcons {
  @include icons(20px);
}

.logoutIcon {
  @include icons(18px);
}

.burgerMenuIcon {
  @include icons(20px);
}
.closeIcon {
    @include icons(45px);
    position: absolute;
    top: 30px;
    right: 30px;
}

.burgerMenu {
    @include flex-column;
    align-items: center;
    padding-top: 150px;
    position: fixed;
    gap: 24px;
    width: 100vw;
    height: 100vh;
    @include mainGradient(35deg, 78%);
    z-index: 5;
    a {
        color: var(--text-color);
        padding: 10px;
        font-weight: 800;
        text-transform: uppercase;
    }
}
</style>