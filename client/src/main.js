import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './router';  // 导入路由

const app = createApp(App);

// 使用路由
app.use(router);

app.mount('#app');  // 挂载 Vue 应用