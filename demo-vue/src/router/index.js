/*
 * @Description:
 * @Version: 1.0
 * @Autor: Li Cheng
 * @Date: 2024-06-25 14:15:23
 * @LastEditors: Li Cheng
 * @LastEditTime: 2024-06-25 16:26:35
 */
import { createWebHistory, createRouter } from 'vue-router';

import List from '@/views/list.vue';
import Hello from '@/views/Welcome.vue';
// import Life from '@/views/life.vue';

const routes = [
  { path: '/list', component: List },
  { path: '/', component: Hello },
  {
    path: '/user/:id',
    name: 'user',
    meta: {
      title: '用户详情'
    },
    component: () => import('@/views/user.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
