<template>
    <div class="column">
        <a href="/">
            <img src="https://thirdqq.qlogo.cn/g?b=qq&nk=3187170085&s=100" width="150px" style="border-radius: 30px;">
        </a>
        <div>
            <a-tag>CoolArec</a-tag>
            <a-tag><a href="https://github.com/vueComponent/ant-design">行动力</a></a-tag>
            <a-tag>悲观</a-tag>
        </div>
        <vuetyped :strings="[
            '酒入豪肠，七分酿成了月光',
            '余下的三分啸成剑气',
            '绣口一吐，就半个盛唐',
            '从开元到天宝，从洛阳到咸阳',
            '冠盖满途车骑的嚣闹',
            '不及千年后你的一首',
            '水晶绝句轻叩我额头',
            '',
            '',
            ''
        ]" :loop="true" :smart-backspace="true" :typeSpeed="150">
            <div class="typing" />
        </vuetyped>
        <div style="width: 70%; margin: 0 auto;">
            <div>
                <a href="https://www.travellings.cn/go.html">
                    <a-button size="large" block>
                        <SendOutlined />十年之约
                    </a-button>
                </a>
            </div>
            <div>
                <a href="https://talk.coolarec.link/">
                    <a-button size="large" block>
                        <IdcardOutlined />关于我
                    </a-button>
                </a>
            </div>
            <div>
                <a href="/links">
                    <a-button size="large" block>
                        <SmileOutlined />友人帐
                    </a-button>
                </a>
            </div>
        </div>
        <LockOutlined style="color: black; font-size: 40px;" v-if="!islogin" @click="modal2Visible = true" />
        <a-modal v-model:open="modal2Visible" width="500px" title="探索未知的世界！" centered @ok="subbmit" okText="登录">
            <template #footer>
                <span v-if="!isRegister">还没有注册？转到 </span>
                <span v-else>返回 </span>

                <a-button key="back" @click="change">{{ (!isRegister ? "注册" : "登录") }}</a-button>
                <a-button key="submit" type="primary" @click="subbmit">提交</a-button>
            </template>
            <signin ref="signinRef" v-if="!isRegister" />
            <signup ref="signinRef" v-if="isRegister" />
        </a-modal>
        <a href="/admin">
            <UnlockOutlined style="color: black; font-size: 40px;" v-if="islogin" />
        </a>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import signin from './signin.vue';
import signup from './signup.vue';
import { IdcardOutlined, SendOutlined, SmileOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons-vue';
const islogin = ref(isLoggedIn())
const isRegister = ref(false)
const modal2Visible = ref<boolean>(false);
const signinRef = ref<any>(null);
const change = () => {
    isRegister.value = !isRegister.value;
}
const subbmit = () => {
    signinRef.value && signinRef.value.submit();
    setTimeout(() => {
        islogin.value = isLoggedIn()
        if (islogin.value) {
            window.location.replace('/admin');
        }
    }, 2000)
    modal2Visible.value = false;
}

function isLoggedIn() {
    const cookies = Object.fromEntries(document.cookie.split('; ').map(cookie => cookie.split('=')));
    const username = cookies['username'];
    return username !== undefined;
}

</script>
<style>
.column {
    margin-top: 200px;
}

.typing {
    height: 28.75px;
    color: black;
    text-align: center;
    align-items: center;
    justify-content: center;
    height: 30px;
}

.typed-element {
    margin-top: -50px;
    margin-bottom: 30px;
    justify-content: center;
}

.typed-cursor {
    height: 30px;
    color: black;
}
</style>