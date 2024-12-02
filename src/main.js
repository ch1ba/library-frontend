import { createApp } from 'vue'
import { autoAnimatePlugin } from "@formkit/auto-animate/vue"
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue'
import Profile from './pages/Profile.vue'
import Oplata from './components/Oplata.vue'
import BookDetail from './components/BookDetail.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import store from './store';


const app = createApp(App);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true } 
    },
    {
        path: '/oplata',
        name: 'Oplata',
        component: Oplata,
        meta: { requiresAuth: true } 
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true } 
    },
    {
        path: '/book/:id', 
        name: 'BookDetail',
        component: BookDetail,
        meta: { requiresAuth: true } 
    },
    {
        path: '/register', 
        component: Register,
        meta: { requiresGuest: true }    
    },
    { 
        path: '/login', 
        component: Login,
        meta: { requiresGuest: true } 
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('jwt')
    
    if (to.meta.requiresAuth && !isAuthenticated) {
      next('/login') // Редирект на логин если нет токена
    } else if (to.meta.requiresGuest && isAuthenticated) {
      next('/') // Редирект на основную страницу если авторизован
    } else {
      next() // Продолжаем навигацию
    }
})

app.use(autoAnimatePlugin);
app.use(router)
app.use(store)

app.mount('#app')
