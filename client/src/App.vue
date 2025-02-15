<template>
  <div id="app">
    <!-- 引入并使用 Calendar 组件 -->
    <HelloWorld />
  </div>
</template>

<script>
// 引入 Calendar 组件
import Calendar from './components/Calendar.vue';
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    Calendar, // 注册 Calendar 组件
    HelloWorld,
  },
};
</script>

<style>
/* 全局样式 */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}
</style>

