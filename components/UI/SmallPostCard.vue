<template>
    <div class="card-wrapper">
        <img :src="$props.item.imgUrl" alt="post main image" class="img" @click="goToBlog(item.id)">
        <div class="content">
            <h3 v-html="$props.item.title"  @click="goToBlog(item.id)"></h3>
            <div v-html="$props.item.content" class="text"></div>
        </div>
    </div>
</template>

<script setup>
const $props = defineProps({
    item: {
        type: Object,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    }
})

const goToBlog = (itemId) => {
    const path = $props.isAdmin ? `/admin/blogs/${itemId}` : `/blogs/${itemId}`;
    navigateTo(path);
};

</script>

<style lang="scss" scoped>
.card-wrapper {
    padding: 10px;
    @include flex-row-center;
    align-items: flex-start;
    gap: 35px;
}

.img {
    max-width: 40%;
    height: auto;
    border-radius: 16px;
    cursor: pointer;
}

h3 {
    cursor: pointer;
}

.content{
    @include flex-column;
    gap: 20px;
}

.text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3; 
  -webkit-box-orient: vertical;
}

</style>