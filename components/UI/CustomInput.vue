<template>
    <input v-bind="$props" v-model="model"/>
</template>

<script setup>
const model = defineModel()
</script>

<style lang="scss" scoped>
input {
    font-size: 14px;
    color: var(--text-color);
    &::placeholder {
        color: gray;
    }
    caret-color: var(--text-color);
}
</style>