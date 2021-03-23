

import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: require('./page/index.vue').default,
    name: 'home'
  }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes
});