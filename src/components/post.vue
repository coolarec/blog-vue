<template>
    <a-tabs v-model:activeKey="postKey" tabPosition="left" style="height: 100vh;" size="small">

        <a-tab-pane key="first" tab="开始写作" class="tab" style="padding: 20px 100px;">
            <a-input v-model:value="newpost.title" :bordered="false" size="large" />
            <br>
            <a-alert :message="'欢迎您！' + username" type="info" close-text="关闭" />
            <br>
            <v-md-editor v-model="newpost.content" height="650px"></v-md-editor>

            <a-float-button shape="square" @click="submit(newpost)" type="primary" :style="{
                right: '94px',
            }">
                <template #icon>
                    <CheckOutlined />
                </template>
            </a-float-button>
        </a-tab-pane>
        <a-tab-pane :key="post.id" :tab="post.title" class="tab" v-for="post in data.posts" style="padding: 20px 100px;">
            <a-input v-model:value="post.title" :bordered="false" size="large" /><br>
            <a-alert :message="'本文由'+post.authorname+'完成。'+'欢迎您！' + username" type="info" close-text="关闭" />
            <br>
            <v-md-editor v-model="post.content" height="650px"></v-md-editor>
            <a-popover>
                <template #content>
                    <p>删除文章</p>
                </template>
                <a-float-button type="default" shape="square" @click="del(post.id)" :style="{
                    right: '94px',
                }">
                    <template #icon>
                        <CloseOutlined />
                    </template>
                </a-float-button>
            </a-popover>
            <a-popover>
                <template #content>
                    <p>发布文章</p>
                </template>
                <a-float-button shape="square" @click="submit(post)" type="primary" :style="{
                    right: '154px',
                }">
                    <template #icon>
                        <CheckOutlined />
                    </template>
                </a-float-button>
            </a-popover>
        </a-tab-pane>
    </a-tabs>
</template>
<style scoped>
p {
    margin: 0;
}
</style>
<script setup>
import { reactive, ref } from 'vue'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { getCurrentInstance } from "vue";
const context = getCurrentInstance()?.appContext.config.globalProperties;
const base = context?.$base;
const data = reactive({ posts: [] })
const newpost = reactive(
    {
        title: '请在此输入标题',
        content: ''
    }
)
function getCookie(name) {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith(`${name}=`))
        ?.split('=')[1];
    return cookieValue ? decodeURIComponent(cookieValue) : null;
}
const csrfToken = getCookie('csrftoken');
const username = getCookie('username');

const getContent = () => {
    fetch(base + '/api/post/?page_size=10000&format=json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(jsondata => {
            data.posts = jsondata.results
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
getContent()
const postKey = ref('first')
const submit = (post) => {
    let puturl = base + '/api/post/'
    let mymethod = 'PUT'
    if (postKey.value !== 'first') {
        puturl += postKey.value + '/';
    } else {
        mymethod = 'POST'
    }
    fetch(puturl, {
        method: mymethod,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify(post)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            message.success('发布成功！');
            getContent();
            newpost.content = '',
                newpost.title = '请在此输入标题';
        })
        .catch(error => {
            message.error('权限不足！')
        });

}
const del = (id) => {
    fetch(base + '/api/post/' + id+'/', {
        method: "DELETE",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
    }).then(response => {
        if (response.ok) {
            message.success("删除成功");
        }
        else {
            message.error("权限不足");
        }
    }).catch(error => {
        console.error(error)
    })
}
</script>