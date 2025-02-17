import { createRouter, createWebHistory } from 'vue-router';
import CalendarPage from '@/components/CalendarPage.vue';  // 假设这是显示任务的页面
import Calendar from '@/components/Calendar.vue';

const routes = [
  {
    path: '/',
    name: 'Calendar',
    component: Calendar,
  },
  {
    path: '/tasks/:date',
    name: 'CalendarPage',
    component: CalendarPage,
    props: true,  // 允许通过 URL 参数传递数据
  },
];

const router = createRouter({
    history: createWebHistory('/'),  // 使用 '/' 而不是 process.env.BASE_URL
    routes,
  });
  

export default router;
