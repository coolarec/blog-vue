<template>
    <div style="overflow-y:scroll; height: 100%;" class="content" id="content">
        <a-typography-title style="text-align: center;margin: 100px;">{{ article.post.title }}</a-typography-title>
        <a-divider orientation="left">{{ article.post.created_at.substring(0, 10) }} - written by {{ article.post.authorname
        }}</a-divider>
        <div>
            <div class="page">
                <v-md-preview :text="article.post.content"></v-md-preview>
                <a-back-top :visibilityHeight="400" :target=back />
            </div>
            <comments :comments="article.post.comments" :post="article.post.id" />
        </div>
    </div>
</template>
<style>
.page {
    background-color: white;
    width: 100%;
    border-radius: 10px;
    padding-top: 20px;
}

.content {
    padding: 0 15%;
}

.content::-webkit-scrollbar {
    display: none;
}
</style>
<script setup>
import comments from '../components/comments.vue';
import { reactive, ref } from 'vue';

import { useRoute } from 'vue-router';
import { getCurrentInstance } from "vue";
const back=() => document.getElementById('content')
const context = getCurrentInstance()?.appContext.config.globalProperties;
const base = context?.$base;
const route = useRoute();
const article = reactive({
    "post": {}
})
const indexPage = route.params.id;
const url = base + '/api/post/' + indexPage + '/?format=json'
try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const postdata = await response.json();
    article.post = postdata
} catch (error) {
    console.log('There was a problem with the fetch request:', error);
}
</script>