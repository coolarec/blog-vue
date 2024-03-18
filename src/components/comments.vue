<template>
    <div class="comment" style="margin-top: 20px; padding: 20px;">
        <a-comment>
            <template #content>
                <a-form :model="info" layout="inline" style="justify-content: center;">
                    <a-form-item label="昵称" name="author"
                        :rules="[{ required: true, message: 'Please input your username!' }]">
                        <a-input v-model:value="info.author" />
                    </a-form-item>
                    <a-form-item label="邮箱" name="email">
                        <a-input v-model:value="info.mail" />
                    </a-form-item>
                </a-form>
                <br>
                <a-form :model="info">
                    <a-form-item>
                        <a-textarea :rows="3" v-model:value="info.content" :rules="[{ require: true }]" />
                    </a-form-item>
                    <a-form-item>
                        <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
                            Add Comment
                        </a-button>
                    </a-form-item>
                </a-form>
            </template>
        </a-comment>
        <a-comment v-for="comment in props.comments">
            <!-- <template #actions>
                <span key="comment-basic-like">
                    <a-tooltip title="Like">
                        <template v-if="action === 'liked'">
                            <LikeFilled @click="like" />
                        </template>
                        <template v-else>
                            <LikeOutlined @click="like" />
                        </template>
                    </a-tooltip>
                    <span style="padding-left: 8px; cursor: auto">
                        {{ likes }}
                    </span>
                </span>
            </template> -->
            <template #author><a>{{ comment.author }}</a></template>
            <template #avatar>
                <UserOutlined style="font-size: 25px;border-radius: 25px;border: 2px solid black; padding: 2px;" />
            </template>
            <template #content>
                <p>{{ comment.content }}</p>
            </template>
            <!-- <template #datetime>
                 <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
                    <span>{{ dayjs().fromNow() }}</span>
                </a-tooltip> 
            </template> -->
        </a-comment>
    </div>
</template>
<style>
.comment {
    width: 80%;
    border-radius: 10px;
    margin: 0 10%;
}
</style>
<script lang="ts" setup>
import dayjs from 'dayjs';
import { reactive } from 'vue'
// import { LikeFilled, LikeOutlined, UserOutlined } from '@ant-design/icons-vue';
import { UserOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getCurrentInstance } from "vue";
import { message } from 'ant-design-vue';
const context = getCurrentInstance()?.appContext.config.globalProperties;
const base = context?.$base;
dayjs.extend(relativeTime);
interface MyComment {
    id: number;
    post: number;
    author: string;
    email: string;
    content: string;
    created_at: string;
}

// 定义组件的 props
const props = defineProps({
    comments: {
        type: Array as () => MyComment[],
        required: true
    },
    post: {
        type: Number,
        required: true
    }
});

interface FormState {
    post: number, // 修改为小写的 number
    author: string;
    mail: string;
    content: string
};

const info = reactive<FormState>({
    post: props.post,
    author: '',
    mail: '',
    content: ''
});
// const likes = ref<number>(5);
// const action = ref<string>();
// const like = () => {
//     likes.value += 1;
// };
const submitting = ref<boolean>(false);
let csrfToken=''
const csrfCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='));
if (csrfCookie) {
    csrfToken = csrfCookie.split('=')[1];
} else {
    console.error('CSRF token not found in cookies');
}
const url = base + '/api/comment/?format=json&post_id=' + props.post + '/'
const handleSubmit = () => {
    fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify(info)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                message.success('发布成功！');
                info.content = '',
                info.author = '',
                info.mail = '',
                location.reload()
            }
        })
        .catch(error => {
            console.error(error)
        });
};

</script>