<template>
    <div class="container" ref="container">
        <canvas ref="canvas"></canvas>
        <div class="content">
            <div class="card">
                <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, maiores!</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero perferendis sit quae. Maxime,
                    sapiente mollitia!</p>
            </div>
            <div class="card">
                <h2>Lorem ipsum dolor sit amet consectetur adipisicing.</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil quaerat, omnis laborum, quae dolores
                    saepe libero fugit atque voluptas animi, culpa a!</p>
            </div>
        </div>
    </div>
</template>

<script setup>
const canvas = ref(null)
const container = ref(null)

let bars = [];
let barCount;
let barWidth;
let barPosisiotn;
const colors = [
    // '#B0B0B0',
    // '#A1A1A1', 
    // '#999999', 
    '#8A8A8A',
    '#808080',
    '#777777',
    '#6E6E6E',
    '#666666',
    '#5D5D5D',
    // '#545454', 
    // '#4B4B4B', 
    // '#424242', 
];
let maxHeight = 200;
let minHeight = 50;

onMounted(() => {
    canvas.value.width = container.value.offsetWidth
    canvas.value.height = container.value.offsetHeight

    const c = canvas.value.getContext('2d')

    function Bar(x, width, color, defaultHeight) {
        this.position = {
            x: x, y: canvas.value.height
        }
        this.width = width
        this.height = 50
        this.maxMinHeight = defaultHeight

        this.draw = function () {
            c.fillStyle = color;
            c.fillRect(this.position.x, canvas.value?.height - this.height, this.width, this.height)
        }

        this.update = function () {

            const distanceBetweenBarAndMouse = {
                x: ((this.position.x + this.width / 2) - mouse.x),
                y: (this.position.y - this.height - mouse.y)
            }

            if (distanceBetweenBarAndMouse.x > -this.width / 2 && distanceBetweenBarAndMouse.x < this.width / 2) {
                this.height += ((this.position.y - this.height) - mouse.y) * 0.12;
            } else {
                if (this.height <= this.maxMinHeight) {
                    this.height = this.maxMinHeight
                } else {
                    this.height = this.height - 1;
                }
            }

            this.draw()
        }
    }

    const mouse = {
        x: null,
        y: null
    }

    window.addEventListener('mousemove', function (e) {
        mouse.x = e.clientX
        mouse.y = e.clientY
    })

    window.addEventListener("resize", function (e) {
        canvas.value.width = container.value.offsetWidth
        canvas.value.height = container.value.offsetHeight

        createBars();
    });


    function createBars() {
        bars = []
        barCount = 22;
        barWidth = canvas.value.width / barCount
        barPosisiotn = 0

        for (let i = 0; i < barCount; i++) {
            let t = i / (barCount - 1);
            let defaultHeight = maxHeight + (minHeight - maxHeight) * Math.sin(t * Math.PI);
            bars.push(new Bar(barPosisiotn, barWidth, colors[Math.floor(Math.random() * colors.length)], defaultHeight));
            barPosisiotn += barWidth;
        }

    }
    const gradient = c.createLinearGradient(120, 506, canvas.value.width, canvas.value.height);
    gradient.addColorStop(0, "rgb(209, 209, 209)");
    gradient.addColorStop(1, "rgb(116, 116, 116)");

    function animation() {
        window.requestAnimationFrame(animation)
        c.fillStyle = gradient;
        c.fillRect(0, 0, canvas.value?.width, canvas.value?.height);

        bars.forEach(function (bar) {
            bar.update();
        });
    }


    createBars()
    animation()
})
</script>

<style lang="scss" scoped>
canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.container {
    position: relative;
    width: 70vw;
    height: 70vh;
    overflow: hidden;
    margin: 5vh auto;
    border-radius: 18px;
    padding: 20px;
}

.content {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    gap: 20px;
    flex-direction: column;
}

.card {
    font-family: "Anton", sans-serif;
    color: var(--text-color);
    text-align: center;
}
</style>