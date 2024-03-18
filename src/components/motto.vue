<template>
    <div class="bounce">
        <span class="letter">我</span>
        <span class="letter">喜</span>
        <span class="letter">欢</span>
        <span class="letter black">天</span>
        <span class="letter black">空</span>
        <span class="letter">的</span>
        <span class="letter">颜</span>
        <span class="letter">色</span>
        <span class="letter black">风</span>
        <span class="letter">的</span>
        <span class="letter">味</span>
        <span class="letter">道</span>
        <span class="letter black">大</span>
        <span class="letter black">海</span>
        <span class="letter">的</span>
        <span class="letter">深</span>
        <span class="letter">度</span>
        <span class="letter">和</span>
        <span class="letter black">你</span>
        <span class="letter">的</span>
        <span class="letter">声</span>
        <span class="letter">音</span>
    </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
.black{
    font-size: 1.2rem!important;
}
.bounce {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    color: black;
    font: normal bold 6rem "Product Sans", sans-serif;
    white-space: nowrap;
}
.letter {
    animation: bounce 1.05s cubic-bezier(0.05, 0, 0.2, 1) infinite alternate;
    display: inline-block;
    transform: translate3d(0, 0, 0);
    margin-top: 0.5em;
    text-shadow: rgba(255, 255, 255, 0.4) 0 0 0.05em;
    font: normal 500 1rem 'Varela Round', sans-serif;
}

.letter:nth-child(1) {
    animation-delay: 0s;
}

.letter:nth-child(2) {
    animation-delay: 0.05s;
}

.letter:nth-child(3) {
    animation-delay: 0.1s;
}

.letter:nth-child(4) {
    animation-delay: 0.15s;
}

.letter:nth-child(5) {
    animation-delay: 0.2s;
}

.letter:nth-child(6) {
    animation-delay: 0.25s;
}

.letter:nth-child(7) {
    animation-delay: 0.3s;
}

.letter:nth-child(8) {
    animation-delay: 0.35s;
}

.letter:nth-child(9) {
    animation-delay: 0.4s;
}

.letter:nth-child(10) {
    animation-delay: 0.45s;
}

.letter:nth-child(11) {
    animation-delay: 0.5s;
}

.letter:nth-child(12) {
    animation-delay: 0.55s;
}

.letter:nth-child(13) {
    animation-delay: 0.6s;
}

.letter:nth-child(14) {
    animation-delay: 0.65s;
}

.letter:nth-child(15) {
    animation-delay: 0.7s;
}

.letter:nth-child(16) {
    animation-delay: 0.75s;
}

.letter:nth-child(17) {
    animation-delay: 0.8s;
}

.letter:nth-child(18) {
    animation-delay: 0.85s;
}

.letter:nth-child(19) {
    animation-delay: 0.9s;
}

.letter:nth-child(20) {
    animation-delay: 0.95s;
}

.letter:nth-child(21) {
    animation-delay: 1s;
}

.letter:nth-child(22) {
    animation-delay: 1.05s;
}



@keyframes bounce {
    0% {
        transform: translate3d(0, 0, 0);
        text-shadow: rgba(255, 255, 255, 0.4) 0 0 0.05em;
    }

    100% {
        transform: translate3d(0, -0.4em, 0);
        text-shadow: rgba(255, 255, 255, 0.4) 0 1em 0.35em;
    }
}</style>