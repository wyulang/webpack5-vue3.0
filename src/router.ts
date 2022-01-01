

import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "introduce" */ './page/index.vue'),
    name: 'home'
  }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes
});