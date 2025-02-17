<template>
  <div class="new-blog-wrapper">
    <div class="header">
      <h2>New Blog</h2>
      <button class="adminBtn" @click="handleRemoveFields">Сlear fields</button>
      <button class="adminBtn" @click="saveBlog">Save</button>
    </div>
    <div class="content">
      <div class="item">
        <h5>Image</h5>
        <input type="file" @change="uploadImage" class="file-input" />
        <img v-if="imageUrl" :src="imageUrl" class="preview-img" />
      </div>
      <div class="item">
        <h5>Title</h5>
        <AdminTextEditor v-model="_form.title" />
      </div>
      <div class="item">
        <h5>Content</h5>
        <AdminTextEditor v-model="_form.text" />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: "admin",
});

useSeoMeta({
  title: `Admin - New Blog`,
  ogTitle: `Admin - New Blog`,
  description: 'This is my test project.',
  ogDescription: 'This is my test project.',
})

const { user } = useUserSession();

const _form = reactive({
  title: "",
  text: "",
  image: null,
});

const imageUrl = ref("");

const uploadImage = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    imageUrl.value = e.target.result;
  };
  reader.readAsDataURL(file);
  _form.image = file;
};

const handleRemoveFields = () => {
  for (const key of Object.keys(_form)) {
    _form[key] = key === "image" ? null : "";
  }
  imageUrl.value = "";
};

const validForm = () => {
    if (!_form.title) {
    return false;
  }
    if (!_form.text) {
    return false;
  }
    if (!_form.image) {
    return false;
  }
  return true;
};

const saveBlog = async () => {
    if (!validForm()) {
    return;
    }
  const data = new FormData();
  data.append("title", _form.title);
  data.append("content", _form.text);
  data.append("id", user.value.id);
  data.append("image", _form.image);
  try {
      if (!user.value.isAdmin) {
      return;
    }
    const res = await $fetch("/api/post", {
      method: "POST",
      body: data

    });
    if (res) {
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
.new-blog-wrapper {
  height: 100%;
}

.header {
  @include flex-row-center;
  gap: 15px;
}

.adminBtn {
  @include adminBtn;
}

.content {
  @include flex-column;
  gap: 25px;
}

.item {
  @include flex-column;
  gap: 10px;
}

.preview-img {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.content {
  @include adminContentBlock;
}
</style>