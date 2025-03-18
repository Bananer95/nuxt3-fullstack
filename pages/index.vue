<template>
    <div class="main-page-wrapper">
        <MPBarBlock />
        <MPMovingLine />
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'default',
})

useSeoMeta({
    title: 'Simba',
    ogTitle: 'Simba',
    description: 'This is my test project.',
    ogDescription: 'This is my test project.',
})
</script>

<style lang="scss" scoped>
.main-page-wrapper {
    max-width: 1440px;
    margin: 100px auto;
    @include flex-column;
    width: 100%;
    gap: 40px;
}
</style>