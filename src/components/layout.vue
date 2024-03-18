<template>
    <a-layout class="layout">
        <a-layout-sider :style="siderStyle" width="250px">
            <column class="column"></column>
        </a-layout-sider>
        <a-layout>
            <a-layout-header :style="headerStyle">
                <breadcrumb />
                <SearchOutlined class="search" @click="openit"/>
                <a-drawer title="搜索栏" placement="right"  v-model:open="open" >
                    <search/>
                </a-drawer>
            </a-layout-header>
            <a-layout-content :style="contentStyle">
                <slot>
                </slot>
            </a-layout-content>
            <a-layout-footer :style="footerStyle">powered by vue3&django</a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<style>
.layout {
    height: 100%;
    background-color: #5f5f5f;
    text-align: unset;
}

.pageheader {
    height: 64px;
    margin-left: -20px;
    padding: 3px;
}

.search {
    position: fixed;
    font-size: 30px;
    top: 18px;
    right: 30px
}

.column {
    margin-top: 110px;
}
</style>
<script lang="ts" setup>
import breadcrumb from './breadcrumb.vue'
import column from './column.vue';
import search from './search.vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import type { CSSProperties } from 'vue';
import {ref} from 'vue'
const open=ref(false)
const openit=()=>{
    open.value=true
}
const headerStyle: CSSProperties = {
    height: '64',
    backgroundColor: '#F5F5F5',
};

const contentStyle: CSSProperties = {
    minHeight: 120,
};

const siderStyle: CSSProperties = {
    textAlign: 'center',
    lineHeight: '100px',
    color: '#fff',
    backgroundColor: '#F5F5F5',
};

const footerStyle: CSSProperties = {
    textAlign: 'center',
    color: 'darkgrey',
    height: '40px',
    padding: '10px'
};
</script>

