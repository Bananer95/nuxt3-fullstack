<template>
  <div class="profile-wrapper">
    <UIProfileModal v-model="isOpenModal" :title="modalTitle" @close="isOpenModal = false" @accept="handleAcceptChanges" />
    <div class="card-wrapper">
      <h2>Profile</h2>
      <div class="user-data">
        <div class="user-data-change">
          <p class="label">Name</p>
          <UICustomInput v-model="user.name" type="text" disabled />
          <Icon
            name="carbon:paint-brush-alt"
            class="brushIcon"
            @click="handleOpenModal('Name')"
          />
        </div>
        <div class="user-data-change">
          <p class="label">Username</p>
          <UICustomInput v-model="user.username" type="text" disabled />
          <Icon
            name="carbon:paint-brush-alt"
            class="brushIcon"
            @click="handleOpenModal('Username')"
          />
        </div>
        <div class="user-data-change">
          <p class="label">Email</p>
          <UICustomInput v-model="user.email" type="text" disabled />
        </div>
        <div class="user-data-change">
          <p class="label">Theme</p>
          <UICustomInput v-model="user.theme" type="text" disabled />
          <Icon
            name="carbon:paint-brush-alt"
            class="brushIcon"
            @click="handleOpenModal('Theme')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
const { user } = useUserSession();

useSeoMeta({
  title: `Simba - ${user.value?.name}`,
  ogTitle: `Simba - ${user.value?.name}`,
  description: 'This is my test project.',
  ogDescription: 'This is my test project.',
})

const isOpenModal = ref(false)
const modalTitle = ref(null)

const handleOpenModal = (val) => {
  modalTitle.value = val
  isOpenModal.value = true
}

const setChanges = async (title, value) => {
  try {
    const res = await $fetch('/api/user/update', {
      method: 'POST',
      body: {
        title:title.toLowerCase(),
        value,
        id:user.value.id
      },
    })
    if (res.statusCode === 200) {
     location.reload()
    }
  } catch (error) {
    console.log(error)
  } finally {
    isOpenModal.value = false
  }
}

const handleAcceptChanges = async (name, value) => {
  await setChanges(name,value)
  isOpenModal.value = false
}
</script>

<style lang="scss" scoped>
.card-wrapper {
  @include cardWrapper;
}
.profile-wrapper {
  max-width: 1220px;
  margin: 120px auto 0;
}

.user-data {
  margin-top: 20px;
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(2, minmax(300px, 1fr));
  text-align: center;
}

.label {
  font-size: 18px;
  font-weight: 700;
}

.brushIcon {
  @include icons(14px)
}

@media (max-width:768px) {
  .user-data {
    grid-template-columns:minmax(200px, 1fr);
    gap: 45px;
  }

  .card-wrapper {
    width: 90vw;
  }
  
}
</style>