<template>
  <div class="user-management-container">
    <a-row type="flex" justify="center">
      <a-col :span="12">
        <a-card title="用户管理">
          <a-form :model="form" @submit="handleSubmit" :layout="formLayout">
            <a-form-item label="用户名">
              <a-input v-model:value="form.username" />
            </a-form-item>
            <a-form-item label="邮箱">
              <a-input v-model:value="form.email" />
            </a-form-item>
            <a-form-item label="修改密码">
              <a-input v-model:value="form.password" type="password" />
            </a-form-item>
            <a-form-item label="修改用户类型">
              <a-select v-model:value="form.is_superuser" :options="userTypeOptions" />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit">提交</a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { getCurrentInstance } from "vue";
const context = getCurrentInstance()?.appContext.config.globalProperties;
const base = context?.$base;

const props = defineProps({
  id:{
    type:Number,
    required:true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email:{
    type:String,
  },
  userType: {
    type: String,
    required: true,
  },
});
const form = reactive({
  id:props.id,
  username: props.username,
  password: props.password,
  email:props.email,
  is_superuser: props.userType,
});
let csrfToken='';
const csrfCookie = document.cookie
  .split('; ')
  .find(row => row.startsWith('csrftoken='));

if (csrfCookie) {
  csrfToken = csrfCookie.split('=')[1];
} else {
  console.error('CSRF token not found in cookies');
}

const formLayout = 'vertical';

const userTypeOptions = [
  { label: '普通用户', value: false },
  { label: '管理员', value: true },
];

const handleSubmit = () => {
  fetch(base + '/api/user/'+form.id+'/', {
        method: 'PUT',
        credentials: 'include',
        headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      },
        body: JSON.stringify(form),
    }).then(response => {
        if (response.ok) {
            console.log("yes!")
        }
    }).catch(error=>{
        console.error(error)
    })
};
</script>

<style scoped>
.user-management-container {
  margin: 20px auto;
  max-width: 600px;
  top: 50%;
  transform: translateY(50%);
}
</style>
