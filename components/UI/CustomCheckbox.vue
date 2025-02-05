<template>
    <div class="custom-checkbox" :class="labelPositionClass">
        <input v-model="model" type="checkbox" :id="id" :name="name"  class="checkbox-input" />
        <label :for="id" class="checkbox-label">{{ label }}</label>
    </div>
</template>

<script setup>
const props = defineProps({
    label: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    boxlPosition: {
        type: String,
        default: 'right',
        validator: (value) => ['left', 'right', 'top', 'bottom'].includes(value)
    }
})

const model = defineModel()

const labelPositionClass = computed(() => {
    return `label-${props.boxlPosition}`
})
</script>

<style scoped>
.custom-checkbox {
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 10px;
}

.checkbox-input {
    width: 18px;
    height: 18px;
    border-radius: 50px;
    cursor: pointer;
    accent-color: var( --bg-secondary);
}

.checkbox-label {
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    color: var(--text-color);
    user-select: none;
}

.label-left {
    flex-direction: row-reverse;
}

.label-right {
    flex-direction: row;
}

.label-top {
    flex-direction: column;
}

.label-bottom {
    flex-direction: column-reverse;
}

.custom-checkbox input,
.custom-checkbox label {
    display: inline-block;
    vertical-align: middle;
}
</style>