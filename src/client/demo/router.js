import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: require('./index.vue').default
  },
  {
    path: '/about',
    component: require('./demo.vue').default
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router