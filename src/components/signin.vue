<template>
  <a-form :model="formState" name="login" class="login-form">
    <a-form-item label="账号" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
      <a-input v-model:value="formState.username">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item label="密码" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
      <a-input-password v-model:value="formState.password">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input-password>
    </a-form-item>

  </a-form>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { getCurrentInstance } from "vue";
import { message } from 'ant-design-vue';
const context = getCurrentInstance()?.appContext.config.globalProperties;
const base = context?.$base;
let csrfToken = '';
const csrfCookie = document.cookie
  .split('; ')
  .find(row => row.startsWith('csrftoken='));

if (csrfCookie) {
  csrfToken = csrfCookie.split('=')[1];
} else {
  console.error('CSRF token not found in cookies');
}
interface FormState {
  username: string;
  password: string;
  remember: boolean;
}
const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});

const submit = async () => {
  try {
    const response = await fetch(base + '/user/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken

      },
      body: JSON.stringify({
        username: formState.username,
        password: formState.password,
      }),
    });
    if (!response.ok) {
      message.error('用户名或密码错误')

    } else
      message.success("登陆成功")
  } catch (error) {
    message.error("网络错误")
  }
}

defineExpose({
  submit,
});
</script>
<style scoped>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}

#components-form-demo-normal-login .login-form-forgot {
  float: right;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
  