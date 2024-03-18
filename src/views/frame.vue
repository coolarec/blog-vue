<template>
  <Transition>
    <welcome v-if="show" class="zhezhao" @childMethod="change" />
  </Transition>
  <Transition>
    <layout v-if="!show">
      <Suspense>
      <router-view />
    </Suspense>
    </layout>
  </Transition>
</template>
<script setup>
import { ref } from 'vue';
import Welcome from '../components/welcome.vue';
import Index from '../views/index.vue';
import layout from '../components/layout.vue';
import { useRoute } from 'vue-router';
const route =useRoute();
var show = ref(route.path === '/');

function change() {
  show.value = false;
}
</script>
<style>
.zhezhao {
  position: fixed;
  width: 100%;
}

.v-enter-active {
  transition: opacity 1s ease-in;
}

.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from {
  opacity: 0;
}

.v-leave-to {
  opacity: 0;
}
</style>