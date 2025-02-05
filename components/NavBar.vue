<template>
    <header>
        <div class="header-wrapper">
                <div class="logo">Simba</div>
            <div class="right">
                <div class="navigation">
                    <NuxtLink to="/" >Main</NuxtLink>
                    <NuxtLink to="/blogs">Blogs</NuxtLink>
                    <NuxtLink to="/signup">Sign Up</NuxtLink>
                    <NuxtLink to="/signin">Sign In</NuxtLink>
                    <NuxtLink v-if="loggedIn" to="/profile">Profile</NuxtLink>
                </div>
                     <Icon @click="toggleTheme" :name="currentTheme === 'light' ? 'carbon:moon' : 'carbon:sun'" :style="{ color: 'var(--text-color)', fontSize: '20px', cursor: 'pointer' }"/>
                <Icon v-if="loggedIn" @click="handleLogout" name="carbon:logout" :style="{ color: 'var(--text-color)', fontSize: '18px', cursor: 'pointer' }"/>
            </div>
        </div>
    </header>
</template>

<script setup>
const { currentTheme, toggleTheme } = useTheme()
const { loggedIn, clear } = useUserSession()

function handleLogout() {
    clear()
    navigateTo('/')
}

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
</style>