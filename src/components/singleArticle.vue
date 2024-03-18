<template>
    <Transition>
        <router-link :to="'/page/' + props.article.id">
            <a-card hoverable style="width: 350px" class="singleArticle">
                <template #cover>
                    <img :width="350"
                    :height="196.88"
                    :src="imgurl"
                    class="articleimg"
                        />
                </template>
                <a-card-meta :title="props.article.title" :description="props.article.title">
                </a-card-meta>
            </a-card>
        </router-link>
    </Transition>
</template>
<script lang="ts" setup>
interface Article {
    id: number;
    title: string;
    summary: string;
}
const props = defineProps<{
    article: Article;
}>();
const imgurl="https://www.coolarec.link/1/index.php?api=acg&type=raw&cnt="+props.article.id;

</script>
<style >
.singleArticle {
    margin-top: 10px;
    margin-right: 20px;
    margin-left: 20px;
    flex-shrink: 0;
    overflow: hidden;
}
.articleimg{
    filter: blur(1px);
    transition: transform 0.3s ease, filter 0.3s ease;
}
.articleimg:hover{
    transform: scale(1.1);
    filter: blur(0);
}
</style>