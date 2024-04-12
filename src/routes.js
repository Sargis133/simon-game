import home from './pages/home.vue'
import {createRouter, createWebHistory} from "vue-router";

const router  =createRouter({
            routes: [
                {
                    path: '/',
                    name: 'home',
                    component: home,
                },
            ],
            history: createWebHistory()
        })
export default router