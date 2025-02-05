<template>
    <footer class="footer-wrapper">
        <div class="content">
        <div class="left">
            <div class="logo">Simba</div>
            <div class="text">Simba 2025. All rights reserved.</div>
        </div>
        <div class="right">
            <div class="links"> Links
                    <NuxtLink to="/" >Main</NuxtLink>
                    <NuxtLink to="/blogs" >Blogs</NuxtLink>
                    <NuxtLink to="/signup">Sign Up</NuxtLink>
                    <NuxtLink to="/signin">Sign In</NuxtLink>
            </div>
        </div>
        </div>
    </footer>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.logo {
    @include Logo;
}

.footer-wrapper {
    margin-top: auto;
    @include mainGradient(225deg, 85%);
}

.content {
    @include content-border;
    @include flex-row-center;
    justify-content: space-between;
    padding: 15px 30px;
}

.text {
    color: var(--text-color);
    font-size: 10px;
    font-family: "Anton", sans-serif;
}

.links {
    @include flex-column;
    gap: 15px;
    color: var(--text-color);
    font-weight: 600;
    a {
        color: var(--text-color);
        font-weight: 600;
        font-size: 12px;
        font-family: "Ubunty", sans-serif;
    }
}

</style>