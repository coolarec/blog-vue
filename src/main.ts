import { createApp } from "vue";
import Antd from "ant-design-vue";
import App from "./App.vue";
import "ant-design-vue/dist/reset.css";
import router from './router/index';
import vuetyped from "vue3typed";
import VMdEditor from './plugins/md';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

VMdPreview.use(githubTheme, { 
  Hljs: hljs,
});
const app = createApp(App);
// app.config.globalProperties.$base = 'http://127.0.0.1:8000';
app.config.globalProperties.$base = 'http://note.coolarec.link';

app
.use(VMdEditor)
.use(VMdPreview)
.use(Antd)
.use(vuetyped)
.use(router)
app.mount("#app");
