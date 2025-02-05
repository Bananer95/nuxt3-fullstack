<template>
    <button v-bind="$attrs" @click="$emit('click')">
        <slot/>
    </button>
</template>

<script setup>
</script>

<style lang="scss" scoped>
button {
    border: 1px solid var(--text-color);
    border-radius: 6px;
    padding: 7px 14px;
    font-size: 14px;
    font-weight: normal;
    color: var(--text-color);
    background: transparent;
    cursor: pointer;
}

</style>