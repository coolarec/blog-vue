<template>
    <a-form ref="formRef" name="custom-validation" :model="formState" :rules="rules">
        <a-form-item has-feedback label="账户" name="username">
            <a-input v-model:value="formState.username" autocomplete="off" />
        </a-form-item>
        <a-form-item has-feedback label="邮箱" name="email">
            <a-input v-model:value="formState.email" autocomplete="off" />
        </a-form-item>
        <a-form-item has-feedback label="密码" name="pass">
            <a-input v-model:value="formState.password" type="password" autocomplete="off" />
        </a-form-item>
        <a-form-item has-feedback label="确认" name="checkPass">
            <a-input v-model:value="formState.checkPass" type="password" autocomplete="off" />
        </a-form-item>
    </a-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import type { FormInstance } from 'ant-design-vue';
import { getCurrentInstance } from "vue";
let csrfToken='';
const csrfCookie = document.cookie
  .split('; ')
  .find(row => row.startsWith('csrftoken='));

if (csrfCookie) {
  csrfToken = csrfCookie.split('=')[1];
} else {
  console.error('CSRF token not found in cookies');
}
const context = getCurrentInstance()?.appContext.config.globalProperties;
const base = context?.$base;
interface FormState {
    username: string,
    password: string;
    email: string,
    checkPass: string;
}
const formRef = ref<FormInstance>();
const formState = reactive<FormState>({
    username: '',
    password: '',
    email: '',
    checkPass: '',
});

const validatePass = async (_rule: Rule, value: string) => {
    if (value === '') {
        return Promise.reject('请输入密码');
    } else {
        if (formState.checkPass !== '') {
            if (formRef.value)
                formRef.value.validateFields('checkPass');
        }
        return Promise.resolve();
    }
};
const validatePass2 = async (_rule: Rule, value: string) => {
    if (value === '') {
        return Promise.reject('请再次输入密码');
    } else if (value !== formState.password) {
        return Promise.reject("两次密码不匹配");
    } else {
        return Promise.resolve();
    }
};

const rules: Record<string, Rule[]> = {
    username: [{ required: true }],
    pass: [{ required: true, validator: validatePass, trigger: 'change' }],
    checkPass: [{ required: true, validator: validatePass2, trigger: 'change' }],
};
const submit = () => {
    fetch(base + '/api/user/', {
        method: 'POST',
        credentials: 'include',
        headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken

      },
        body: JSON.stringify(formState),
    }).then(response => {
        if (response.ok) {
            console.log("yes!")
        }
    }).catch(error=>{
        console.error(error)
    })
}
defineExpose({
    submit,
});
</script>
  
  