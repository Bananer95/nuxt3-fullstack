<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>{{ title }}</h3>
        <Icon
          name="carbon:close"
          class="closeIcon"
          @click="closeModal"
        />
      </div>
      <div class="modal-body">
        <component
          :is="currentComponent"
          v-model="variableValue"
          :placeholder="$props.title"
          :options="usersThemes"
          id="userDataChange"
          name="userDataChange"
          label="Select Theme"
        />
      </div>
      <div class="modal-footer">
        <UIBtn @click="handleAcceptChanges">Accept</UIBtn>
      </div>
    </div>
  </div>
</template>

<script setup>
import CustomInput from "./CustomInput.vue";
import CustomSelect from "./CustomSelect.vue";

const { user } = useUserSession();

const isOpen = defineModel()

const $props = defineProps({
  title: String,
});
const variableValue = ref(null);

const { data: usersThemes } = await useFetch("/api/themes", {
  server: false,
});

const currentComponent = computed(() => {
  return $props.title === "Name" || $props.title === "Username"
    ? CustomInput
    : CustomSelect;
});

const emit = defineEmits(["close", "accept"]);

const handleAcceptChanges = () => {
    if (variableValue.value) {
        emit("accept",$props.title, variableValue.value);
        variableValue.value = null;
    }
};

const closeModal = () => {
  variableValue.value = null;
  emit("close");
};
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

h3 {
  color: var(--text-color);
}

.modal-content {
  background: var(--bg-primary);
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.modal-footer {
  text-align: right;
  margin-top: 10px;
}

.closeIcon {
  @include icons(18px)
}
</style>
