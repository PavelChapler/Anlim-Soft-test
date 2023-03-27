import {createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router";
import Main from "./components/Main.vue";
import Functionality from "./components/Functionality.vue";

const routes: Array<RouteRecordRaw> = [
    { path: '/', component: Main },
    { path: '/functionality', component: Functionality }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router