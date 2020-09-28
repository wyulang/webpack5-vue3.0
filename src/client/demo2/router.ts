
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: require('./page/index.vue').default,
        name: 'home'
    },
    {
        path: '/about',
        component: require('./page/demo.vue').default,
        name: 'about'
    },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes
});