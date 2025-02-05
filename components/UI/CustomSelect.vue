<template>
  <div class="custom-select">
    <label :for="id">{{ label }}</label>
    <select
      v-model="model"
      :id="id"
      :name="name"
      class="select-element"
      @change="updateValue"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>

const props = defineProps({
  options: { 
    type: [Array , null],
    required: true,
  },
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
    required: true
  }
})

const model = defineModel()
</script>

<style scoped>
.custom-select {
  display: flex;
  flex-direction: column;
}

.select-element {
  padding: 2px 2px 2px 5px;
  border: 1px solid var(--text-color);
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  color: var(--text-color);
}

.select-element:focus {
  outline: none;
  border-color: var(--text-color);
}

label {
  font-size: 14px;
  margin-bottom: 7px;
  font-weight: bold;
  color: var(--text-color);
}

option {
  background: var(--bg-primary);
}
</style>