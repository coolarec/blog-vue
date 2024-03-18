<template>
    <div>
        <a-input placeholder="支持搜索标题和内容" v-model:value="searchQuery" @input="handleSearch" />
        <div v-if="loading" class="loading">等待中...</div>
        <div v-if="(searchResult.length > 0) && !loading" class="search-result">
            <h3>搜索结果</h3>
            <div @click="jump('/page/'+res.id)" v-for="res in searchResult" style="cursor: pointer;">
            <a-card :title="res.title" style="width: 90% ;margin:5px 5%;" size="small">
                <template #extra><a href="#">more</a></template>
                <p>作者： {{res.authorname}}</p>
            </a-card>
            <br>
            </div>
        </div>
        <div v-else-if="!loading" class="no-result">
            无结果
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { getCurrentInstance } from "vue";
const context = getCurrentInstance()?.appContext.config.globalProperties;
const base = context?.$base;

interface SearchResult {
    id: number;
    title: string;
    authorname: string
}
const jump=(url:string)=>{
    window.location.replace(url)
}
const searchQuery = ref('');
const searchResult = ref<SearchResult[]>([]);
const loading = ref(false);
const fetchSearchResult = async () => {
    loading.value = true;
    try {
        const response = await fetch(`${base}/api/post/?format=json&search=${searchQuery.value}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const searchResults: SearchResult[] = data.results.map((result: any) => ({
            id: result.id,
            title: result.title,
            authorname: result.authorname
        }));
        searchResult.value = searchResults;
    } catch (error) {
        console.error('Error fetching search result:', error);
    } finally {
        loading.value = false;
    }
};

const handleSearch = () => {
    fetchSearchResult();
};
</script>
  
<style scoped>
.loading {
    margin-top: 20px;
}

.search-result {
    margin-top: 20px;
}

.no-result {
    margin-top: 20px;
    color: red;
}
</style>
