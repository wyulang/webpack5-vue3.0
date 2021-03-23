  
/*
 * @description: 开发模式，vue需要完整入口文件
 * @Author: Gouxinyu
 * @Date: 2020-11-09 00:56:37
 */
import { createApp } from "vue";
import box from "./app.vue";
import { router } from './router';

createApp(box).use(router).mount('#app');