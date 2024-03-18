<template>
    <a-tabs v-model:activeKey="activeKey" tabPosition="left" centered style="height: 100vh;">
        <a-tab-pane key="1" tab="文章管理" class="tab">
                <Post />
        </a-tab-pane>
        <a-tab-pane key="2" tab="用户管理" force-render class="tab">
            <a-tabs v-model:activeKey="activeNKey" tabPosition="left">
                <a-tab-pane :key="user.id" :tab="user.username" style="height: 100vh;" v-for="user in userInfo">
                    <User :id="user.id" :email="user.email" :username="user.username" password="" :userType="user.is_superuser" class="tab"/>
                </a-tab-pane>
            </a-tabs>
        </a-tab-pane>
        <a-tab-pane key="3" tab="退出登录" force-render class="quit">
            <a-button @click="back" style="margin-bottom: 40px;">回到首页</a-button>
            <a-button @click="clearCookies">退出登录</a-button>
        </a-tab-pane>
    </a-tabs>
</template>
  
<script setup lang="ts">
import { reactive, ref } from 'vue';
import User from '../components/user.vue'; // PascalCase
import Post from '../components/post.vue'; // PascalCase
import { getCurrentInstance } from "vue";
const context = getCurrentInstance()?.appContext.config.globalProperties;
const base = context?.$base;

const url = '/api/user/?format=json';
const activeKey = ref('1');
const activeNKey = ref(1);
const userInfo = reactive<any>({}); // 使用空对象初始化 reactive

// function getCookie(name: string) {
//     const cookieValue = document.cookie
//         .split('; ')
//         .find(row => row.startsWith(`${name}=`))
//         ?.split('=')[1];
//     return cookieValue ? decodeURIComponent(cookieValue) : null;
// }
// const csrfToken = getCookie('csrftoken');

const back = () => { window.location.replace('/'); };

function clearCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
    window.location.replace('/')
}



const getUser = async () => {
    try {
        const response = await fetch(base + url, {
            method: 'GET',
            credentials: 'include',

        });
        if (response.ok) {
            const data = await response.json();
            Object.assign(userInfo, data);
        } else {
            console.error('Failed to fetch user data');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

getUser()

</script >
  
<style scoped>
.tab {
    padding: 0 !important;
}

.quit {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>
  