<template>
  <a-flex justify="center" align="center" style="height: 100%;" class="welcome">
    <a-space align="center" size="middle" :wrap="true">
      <img class="welcomeImg" src="https://coolarec-1256561073.cos.ap-nanjing.myqcloud.com/imgblog/20250516192855091.png?imageSlim">
      <div class="welcome-right">
        <a-typography-title>感情迟钝的精灵，</a-typography-title>
        <a-typography-title>读到了爱她的人用一生写尽的情书</a-typography-title>
      </div>
    </a-space>
  </a-flex>
  <DownOutlined class="welcomeNext" @click="changeP" />
</template>

<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue';
import { SmileOutlined } from '@ant-design/icons-vue';
import { notification } from 'ant-design-vue';
import { h } from 'vue';
const emit = defineEmits();
const changeP = () => {
  emit('childMethod');
  openNotification();
};

const openNotification = () => {
  notification.open({
    duration:4,
    message: '你好，亲爱的朋友',
    description:
      'We are what we repeatedly do. Excellence, then, is not an act, but a habit. 每天反复做的事情造就了我们，然后你会发现，优秀不是一种行为，而是一种习惯。',
    icon: () => h(SmileOutlined, { style: 'color: #108ee9' }),
  });
};
</script>
    
<style scoped>
.welcome {
  background-color: #DBDBDC;
}

.welcome-right {
  width: 400px;
  font-size: 25px;
}


.welcomeImg {
  height: 500px;
  width: 350px;
  object-fit: cover;
  border-radius: 10px;
}

.welcomeNext {
  transform: translateX(50%);
  position: fixed;
  right: 50%;
  font-size: 60px;
  bottom: 20px;
}
</style>  