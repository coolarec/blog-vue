<template>
    <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
            <li v-for="(crumb, index) in breadcrumbs" :key="index">
                <router-link :to="crumb.to">{{ crumb.text }}</router-link>
            </li>
        </ul>
    </nav>
</template>
  
<script>
export default {
    computed: {
        breadcrumbs() {
            const routes = this.$route.matched;
            const breadcrumbs = routes.map(route => {
                let text = route.meta.breadcrumb;
                if (text.includes("{{ id }}")) {
                    text = text.replace("{{ id }}", this.$route.params.id);
                }
                return {
                    text: text,
                    to: route.path
                };
            });
            return breadcrumbs;
        }
    }
};
</script>
  
<style scoped>
.breadcrumb {
    background-color: #f5f5f5;
    padding: 0;
}

a {
    color: gray;
}

.breadcrumb ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.breadcrumb ul li {
    display: inline;
}

.breadcrumb ul li+li::before {
    content: '/';
    margin: 0 5px;
}
</style>