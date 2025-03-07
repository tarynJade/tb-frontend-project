import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CatsView from '@/views/CatsView.vue'
import CatView from '@/views/CatView.vue'
import LoginView from '@/views/LoginView.vue'
import RandomCatView from '@/views/RandomCatView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/cats',
        name: 'cats-view',
        component: CatsView
    },
    {   path: '/cat/:breed',
        name: 'cat', 
        component: CatView
    },
    {
        path:'/choose-for-me',
        name: 'random-cat',
        component: RandomCatView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router