<template>
    <div class="wrapper">
        <div class="marquee-container">
            <div class="marquee-content" ref="marquee">
                <div class="marquee-text">
                    <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia, quis1</span>
                    <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia, quis2</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const marquee = ref(null);

onMounted(() => {
    const el = marquee.value;
    if (el) {
        const textWidth = el.scrollWidth / 2;
        el.style.setProperty("--animation-duration", `${textWidth / 100}s`);
    }
});
</script>

<style scoped>
.wrapper {
    position: static;
}

.marquee-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
}

.marquee-content {
    display: flex;
    width: max-content;
}

.marquee-text {
    display: flex;
    white-space: nowrap;
    animation: marquee var(--animation-duration, 10s) linear infinite;
}

.marquee-text span {
    font-size: 44px;
    font-weight: 800;
    text-transform: uppercase;
    color: var(--text-color);
    padding-right: 2rem;
}

@keyframes marquee {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-50%);
    }
}
</style>