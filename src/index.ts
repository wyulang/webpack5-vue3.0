  
import { createApp } from "vue";
import box from "./app.vue";
import { router } from './router';

createApp(box).use(router).mount('#app');
