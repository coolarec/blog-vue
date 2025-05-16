<template>
    <a-carousel autoplay dotsClass="dot">
        <div>
            <img class="indexImg" src="https://coolarec-1256561073.cos.ap-nanjing.myqcloud.com/imgblog%2F20250126233941348.jpg" alt="">
        </div>
        <div>
            <img class="indexImg" src="https://coolarec-1256561073.cos.ap-nanjing.myqcloud.com/imgblog%2F20250218111749781.png" alt="">
        </div>
        <div>
            <img class="indexImg" src="https://coolarec-1256561073.cos.ap-nanjing.myqcloud.com/imgblog%2F20250220163536537.jpg  " alt="">
        </div>
        <div>
            <img class="indexImg" src="https://coolarec-1256561073.cos.ap-nanjing.myqcloud.com/imgblog%2F20250125203720809.jpg" alt="">
        </div>
    </a-carousel>
    <motto />
    <a-divider orientation="left">I AM I</a-divider>
    <a-space style="justify-content:center;width: 100%;" :wrap="true">
        <a-tooltip v-if="pre">
            <template #title>上一页</template>
            <DoubleLeftOutlined style="font-size: 20px;user-select: none;" @click="jump(-1)" />
        </a-tooltip>
        <a-tooltip v-else>
            <template #title>没有上一页了哦</template>
            <CloseOutlined style="font-size: 20px;user-select: none;" />
        </a-tooltip>
        <a-tooltip>
            <template #title>向左移动</template>
            <SwapLeftOutlined @click="scollRight" class="randl" />
        </a-tooltip>
        <a-tooltip>
            <template #title>向右移动</template>
            <SwapRightOutlined @click="scollLeft" class="randl" />
        </a-tooltip>
        <a-tooltip v-if="next">
            <template #title>下一页</template>
            <DoubleRightOutlined style="font-size: 20px;user-select: none;" @click="jump(1)" />
        </a-tooltip>
        <a-tooltip v-else>
            <template #title>没有下一页了哦</template>
            <CloseOutlined style="font-size: 20px;user-select: none;" />
        </a-tooltip>
    </a-space>
    <div class="articles" ref="t">
        <singleArticle :article="article" v-for="article in articlesData.articles"></singleArticle>
    </div>
</template>
<style scoped>
:deep(.slick-slide) {
    text-align: center;
    height: 300px;
    margin-bottom: 20px;
    line-height: 160px;
    overflow: hidden;
}

:deep(.slick-slide h3) {
    color: #fff;
}

.indexImg {
    height: 300px;
    width: 100%;
    object-fit: cover;
}

.articles {
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    padding-bottom: 50px;
}

.randl {
    font-size: 50px;
    user-select: none;
}
</style>
<script setup lang="ts">
import motto from "../components/motto.vue";
import { useRoute } from 'vue-router';
import { ref, reactive } from 'vue'
import singleArticle from "../components/singleArticle.vue";
import { SwapLeftOutlined, CloseOutlined, SwapRightOutlined, DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons-vue'
import { getCurrentInstance } from "vue";
interface Article {
    id: number;
    title: string;
    summary: string;
}
const next = ref(false)
const pre = ref(false)
const context = getCurrentInstance()?.appContext.config.globalProperties;
const base = context?.$base;
const route = useRoute();
const indexPage = ref(route.params.id);
const jump = (a: number) => {
    window.location.replace((parseInt(indexPage.value[0]) + a).toString())
}
if (!indexPage.value) indexPage.value = '1';
function scollLeft() {
    document.querySelector('.articles')?.scrollBy({
        left: 800,
        behavior: "smooth",
    })
}
function scollRight() {
    document.querySelector('.articles')?.scrollBy({
        left: -800,
        behavior: "smooth",
    })
}
const articlesData = reactive({
    articles: [] as Article[]
});

try {
    const response = await fetch(base + '/api/posts/?format=json&page=' + (indexPage.value ? indexPage.value : '1'));
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    if (responseData.next) next.value = true
    if (responseData.previous) pre.value = true
    if (responseData.results && Array.isArray(responseData.results)) {
        responseData.results.forEach((article: Article) => {
            return articlesData.articles.push(article);
        });
    } else {
        throw new Error('Invalid JSON format: results field is missing or not an array');
    }
} catch (error) {
    console.log('There was a problem with the fetch request:', error);
}
</script>